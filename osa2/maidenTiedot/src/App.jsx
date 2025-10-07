import { useState,useEffect } from 'react'
import axios from 'axios'

import './App.css'

const Maantiedot = ({country}) =>{

  return(
    <>
      <h2>{country.name.common}</h2>
      <h3>Capital: {country.capital}</h3>
      <p>area: {country.area}</p>
      <p>Population:</p>
      <h3>languages:</h3>
        <ul>
            {Object.values(country.languages).map(language =>(
                <li key={language}>{language}</li>
            ))}
        </ul>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />

    </>
  )
}

function App() {
  

  const [inputa, setInputa] = useState('')
  const [maat, setMaat] = useState([])

  useEffect(()=>{
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response=>{
      setMaat(response.data)})
  }, [])

  const handleInput = (e) =>{
    e.preventDefault()
    setInputa(e.target.value)
  }

  const filteredMaat = maat.filter(country=>
    country.name.common.toLowerCase().includes(inputa.toLowerCase())
  )



  return (
    <>
      <div>
        <h3>Find countries <input onChange={handleInput}></input></h3>
      </div>
      
      {filteredMaat.length>10? <p>too many matches, spesify more</p>:
      filteredMaat.length===1?
      <Maantiedot country={filteredMaat[0]} />:
      filteredMaat.map(country =>(
        
        <h2 key={country.cca3}>{country.name.common}</h2>
      ))

     
      
      
      }
      
    </>
  )
}

export default App
