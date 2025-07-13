import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1)
    }

    const duplicateName = persons.find(person => person.name === newName)
    const duplicateNumber = persons.find(person => person.number === newNumber)

    if (!newName || !newNumber) {
      return alert(`Please fill in all the fields`)
    }else if (duplicateName) {
      return alert(`${newName} is already added to phonebook`)
    }else if (duplicateNumber){
      return alert(`${newNumber} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
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
      <Persons persons={personsToShow}/>
    </div>
  )

}

export default App