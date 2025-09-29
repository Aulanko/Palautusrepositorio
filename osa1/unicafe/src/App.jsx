import { useState } from 'react'

import './App.css'


const Statisticsline = ({text, stat}) =>{

  return(
    <>
      <tr>
        <td>
        {text} {stat}

        </td>
        
      </tr>
    </>
  )
}

const Statistics = ({good,neutral,bad,arvo}) =>{
  return(
    <>
        <table>

      
        <tbody>
        <Statisticsline text="Good" stat={good}/>
        <Statisticsline text="Neutral" stat={neutral}/>
        <Statisticsline text="Bad" stat={bad}/>
        
        <Statisticsline text="All" stat={good+neutral+bad}/>
        <Statisticsline text="Average" stat={arvo/(good+neutral+bad)}/>
        <Statisticsline text="Positive" stat={`${good/(good+neutral+bad)} %`}/>

        </tbody>
        </table>
      
    </>
  )
}

const Button = ({handleClick,name}) =>{


  return(
    <>
    <button onClick={handleClick}>{name}</button>
    </>
  )
}

function App() {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [arvo,setArvo] = useState(0)

  const handleGood = () =>{
    setGood(good+1)
    setArvo(arvo+1)
  }
  const handleNeutral = () =>{
    setNeutral(neutral+1)
  }
  const handleBad = () =>{
    setBad(bad+1)
    setArvo(arvo-1)
  }

  



  return (
    <div>
      <div className='feedback-container'>
        <h1>Give feedback</h1>




        <div className='button-container'>

          <Button handleClick={handleGood} name="Good" />
          <Button handleClick={handleNeutral} name="Neutral" />
          <Button handleClick={handleBad} name="Bad" />

         
          <h2>Statistics</h2>
          {(good||neutral||bad)?
          <Statistics good={good} neutral={neutral} bad={bad} arvo={arvo} />:
          <h2>No feedback given</h2>}
        </div>
        
        
      </div>
    </div>
  )
}

export default App
