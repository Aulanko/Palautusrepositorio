



const Header = ({course}) =>{
  return(
    <h1>
      {course}
    </h1>
  )
}

const Part = ({part, exercises})=>{

  return(
    <p>{part} {exercises}</p>
  )
}

const Content = ({parts})=>{



  return(
    <>
    
      {parts.map((part)=>

        <Part key={part["id"]} part={part["name"]} exercises={part["exercises"]}/>
      )} 
       
    </>
  )

}
const Total = ({parts}) =>{
  let summa = parts.reduce((kaikki,part)=>kaikki+part["exercises"],0)
  
  return(
   
  <p> <strong> Total number of exercises {summa}</strong></p>
  )

}

export default function Course({courses}){
    return (
        <div>
        
        

        {
            courses.map((course)=>(
            <div key={course.id}>
            <Header course={course["name"]} />
            <Content parts={course.parts} />
            <Total  parts = {course.parts} />
            </div>
            ))
        }
        </div>
  )

}