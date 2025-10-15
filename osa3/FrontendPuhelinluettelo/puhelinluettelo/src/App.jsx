import { useState,useEffect } from 'react'
import axios from 'axios'
import palvelin from './services/puhuPalvelinta'
import './App.css'
import { Search, Personform, FilteredPersons,Notification } from './components'





function App() {
  const [persons, setPersons] = useState([
    //{ name: 'Arto Hellas' }
  ]) 
  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

 useEffect(() =>{
  palvelin.getAll().then(response =>{
    setPersons(response.data)
  }).catch(error =>{
    console.log('Jokin meni vikaan, kun yritettiin päivittää sovellusta. Kenties samanaikaista muutosta', error)
  })
}, [])
 
  
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
    const existingPerson = persons.find(person => person.name==newName)
    if(existingPerson){
      palvelin.update({...existingPerson, number:newNumber}).then(response => {
        setPersons(persons.map(p => 
          p.id == existingPerson.id ? response.data : p
        ))
      }).catch(error => {
        setMessage(`Virhe: ${newName} was aldready removed from the server`)
        setMessageType('error')
        console.log('Päivitys ei onnistunut, jokin meni vikaan. Sovellus ei tue kunnolla saman aikaisia muutoksia', error)
      })
      setMessage(`${newName}'s number updated`)
      setMessageType('updated')
      setTimeout(() => {
        setMessage(null)
      }, 2000)
      return
    }

    palvelin.create({name: newName, number:newNumber}).then(response=>{
      setPersons([...persons,response.data])

    }).catch(error => {
    setMessage(`Error: Could not add ${newName} due to ${error.response.data.error}`)
    setMessageType('error')
    console.log(error.response.data)
    
  })
    setMessage(
          `${newName}'s number added`
        )
    setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 7000)

   
  }

  const handleRemove = (person) =>{
    if(window.confirm(`Delete ${person.name}`)){
       palvelin.remove(person).then(()=>{
        setPersons(persons.filter(p=>p.name!==person.name))
        setMessage(
          `${newName}'s number removed`
        )
        setMessageType('success')
              setTimeout(() => {
                setMessage(null)
              }, 2000)

       }
      
      ).catch(error=>{
        setMessage(`Error: ${person.name} was already deleted from server`)
        setMessageType('error')
        console.log("jotain meni vikaan poistaessa", error)
      })
    }

    

  }

  return (
    <>
      <h1>Phonebook</h1>
      <Notification message={message} messageType={messageType}/>
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

      <FilteredPersons filteredPersons={filteredPersons} handleRemove={handleRemove}/>

      
    </>
  )
}

export default App
