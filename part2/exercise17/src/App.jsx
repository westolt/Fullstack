import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

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
    }else if (duplicateName) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const updatedPerson = { ...duplicateName, number: newNumber }
        personService
        .update(duplicateName.id, updatedPerson)
        .then((returnedPerson) => {
          setPersons(persons.map(person => person.id !== duplicateName.id ? person :
            returnedPerson))
            setNewName('')
            setNewNumber('')
        })
        .catch(error => {
          alert(`${newName} has already removed`)
          setPersons(persons.filter(person => person.id !== duplicateName.id))
        })
      }
    }else if (duplicateNumber){
      return alert(`${newNumber} is already added to phonebook`)
    }else{
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const removePersonOf = id => {
    const person = persons.find(person => person.id == id)
    
    if (window.confirm(`Delete ${person.name} ?`)){
      personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      alert(`${person.name} has already been removed`)
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
    <div>
      <h2>Phonebook</h2>
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