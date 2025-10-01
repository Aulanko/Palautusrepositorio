import { useState } from 'react'

import './App.css'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [anecdote_map, setAnecdote_map] = useState(
     anecdotes.map(anecdote=>({
    text:anecdote,
    votes:0
  })) 

)
  
  const [selected, setSelected] = useState(0)
  

  const handleClick = () =>{
    const randomNume = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomNume)
  }

  const handleVote = (e) =>{
    const newAnecdote = [...anecdote_map]
    newAnecdote[selected].votes += 1
    setAnecdote_map(newAnecdote)
  }

  const maxAnecdote = anecdote_map.reduce((max, current)=>
    current.votes>max.votes ?current:max
  )

  return (
    <>
      <div>
         {anecdotes[selected]}
         <h4>Has {anecdote_map[selected].votes} votes</h4>
         <h2>Anecdote with the most votes:</h2>
         <h4>{maxAnecdote.text}</h4>
         <h4>has {maxAnecdote.votes} votes</h4>
      </div>
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleClick}>Next anecdote</button>
    </>
  )
}

export default App
