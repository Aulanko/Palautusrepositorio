import { useState,useEffect } from 'react'
import axios from 'axios'

import './App.css'

const Maantiedot = ({country}) =>{

  return(
    <>
      <h2>{country.name.common}</h2>
     

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
      filteredMaat.map(country =>(
        <Maantiedot key={maat.cca3} country={country} />
      ))}
      
    </>
  )
}

export default App
