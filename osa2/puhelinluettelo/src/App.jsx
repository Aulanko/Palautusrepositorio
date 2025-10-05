import { useState,useEffect } from 'react'
import axios from 'axios'
import palvelin from './services/puhuPalvelinta'
import './App.css'



const Search = ({search,handleSearch}) =>{
  return(
    <h4>Search bar: <input value={search} onChange={handleSearch}></input></h4>
  )
}

const Personform = ({handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}) =>{
  return(
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
  )
}

const FilteredPersons = ({filteredPersons}) =>{
  return(
    <>
    {filteredPersons.map((person,index)=>(
        <h3 key={index}>{person.name} {person.number}</h3>
      ))}

    </>
  )
}

function App() {
  const [persons, setPersons] = useState([
    //{ name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

 useEffect(()=>{
  palvelin.getAll().then(response=>{
      setPersons(response.data)
    })
 },[])
  
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



    palvelin.create({name: newName, number:newNumber, id:(persons.length+1).toString()}).then(response=>{
      setPersons([...persons,response.data])

    })

    //setPersons([...persons, {name:newName, number:newNumber}])
   
  }

  return (
    <>
      <h1>Phonebook</h1>
      <Search search={search} handleSearch={handleSearch}/>
      

      <h3>Add new</h3>
      <Personform
      handleSubmit={handleSubmit}
      newName={newName}
      newNumber={newNumber}
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>

      <FilteredPersons filteredPersons={filteredPersons}/>

      
    </>
  )
}

export default App
