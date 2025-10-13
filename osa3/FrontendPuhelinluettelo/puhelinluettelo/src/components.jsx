


export const Search = ({search,handleSearch}) =>{
  return(
    <h4>Search bar: <input value={search} onChange={handleSearch}></input></h4>
  )
}

export const Personform = ({handleSubmit, newName, handleNameChange, newNumber, handleNumberChange}) =>{
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

export const FilteredPersons = ({filteredPersons, handleRemove}) =>{
  return(
    <>
    {filteredPersons.map((person,index)=>(
      <div key={index}>
        <h3 key={index}>{person.name} {person.number}<button onClick={()=>handleRemove(person)}>delete</button></h3>
        
      </div>
      ))}

    </>
  )
}

export const Notification = ({ message, messageType }) => {
  if (message === null) {
    return null
  }


  return (
    <div className={messageType}>
      {message}
    </div>
  )
}
