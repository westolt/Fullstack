import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    const duplicateName = persons.find(person => person.name === newName)
    const duplicateNumber = persons.find(person => person.number === newNumber)

    if (!newName || !newNumber) {
      return alert(`Please fill in all the fields`)
    }else if (duplicateName && !duplicateNumber) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updatedPerson = { ...duplicateName, number: newNumber }
        personService
        .update(duplicateName.id, updatedPerson)
        .then((returnedPerson) => {
          setMessage(
            `${newName} number changed`
          )
          setType('add')
          setTimeout(() => {
            setMessage(null)
            setType(null)
          }, 5000)
          setPersons(persons.map(person => person.id !== duplicateName.id ? person :
            returnedPerson))
            setNewName('')
            setNewNumber('')
        })
        .catch(error => {
          setMessage(
          `Information of ${newName} has already been removed from server`
        )
        setType('delete')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
          setPersons(persons.filter(person => person.id !== duplicateName.id))
        })
      }
    }else if (duplicateNumber){
      setMessage(
          `${newNumber} is already added to phonebook`
        )
        setType('delete')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
    }else{
      personService
      .create(personObject)
      .then(returnedPerson => {
        setMessage(
          `Added ${newName}`
        )
        setType('add')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePersonOf = id => {
    const person = persons.find(person => person.id === id)
    
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then(() => {
        setMessage(
          `Removed ${person.name}`
        )
        setType('delete')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
        setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      setMessage(
          `Information of ${person.name} has already been removed from server`
        )
        setType('delete')
        setTimeout(() => {
          setMessage(null)
          setType(null)
        }, 5000)
      setPersons(persons.filter(person => person.id !== id))
    })
    }
  }

  const personsToShow = newFilter
    ? persons.filter(person =>
      person.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    : persons

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div className='titles'>
      <h2>Phonebook</h2>
      <Notification message={message} type={type} />
      <Filter value={newFilter} onChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons
      persons={personsToShow}
      removePerson={removePersonOf}
      />
    </div>
  )

}

export default App