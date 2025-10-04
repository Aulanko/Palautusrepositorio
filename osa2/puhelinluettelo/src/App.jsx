import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  
  const handleNameChange = (e) =>{
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) =>{
    setNewNumber(e.target.value)
  }

  const handleSearch = (e) =>{
    setSearch(e.target.value)
  }
  const filteredPersons = persons.filter(person=>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleSubmit = (e) =>{
    e.preventDefault()
    if(persons.some(person => person.name==newName)){
      alert(`${newName} is aldready in the phonebook`)
      return
    }

    setPersons([...persons, {name:newName, number:newNumber}])
   
  }

  return (
    <>
      <h1>Phonebook</h1>
      <h4>Search bar: <input value={search} onChange={handleSearch}></input></h4>

      <h3>Add new</h3>
      <form onSubmit={handleSubmit}>

        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {filteredPersons.map((person,index)=>(
        <h3 key={index}>{person.name} {person.number}</h3>
      ))}
    </>
  )
}

export default App
