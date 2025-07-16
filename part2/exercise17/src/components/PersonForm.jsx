const PersonForm= ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
    return(
        <form onSubmit={addPerson}>
        <div className="name">
          name: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div className="number">
          number: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm