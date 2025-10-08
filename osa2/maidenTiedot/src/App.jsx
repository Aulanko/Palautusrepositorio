import { useState,useEffect } from 'react'
import axios from 'axios'

import './App.css'

const WeatherDetails = ({capital, cordinates}) =>{

  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_SOME_KEY

  useEffect(()=>{
    const [latitude, longitude] = cordinates
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${api_key}`)
    .then((response)=>{setWeather(response.data)}).catch((error)=>console.log("nyt tuli virhe säädatan hakemisessa", error))

  },[cordinates,api_key])
  if(!weather){
    return(
      <h2>Loading weather..</h2>
    )
  }
  return(
    <div>

      <h4>Weather in {capital}</h4>
      <p>Temperature: </p>



    </div>
  )
}

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
      <WeatherDetails capital={country.capital} cordinates ={country.capitalInfo.latlng}/>

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

  const handleShow = (country) =>{
    setInputa(country.name.common)
   
    
    
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
        
        <h2 key={country.cca3}>{country.name.common} <button onClick={()=>handleShow(country)}>show</button></h2>
      ))

     
      
      
      }
      
    </>
  )
}

export default App
