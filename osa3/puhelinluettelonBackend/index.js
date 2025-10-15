

const express = require('express')
const cors = require('cors')
const fs = require('fs').promises
const app = express()
app.use(express.json())
app.use(cors())
const morgan = require('morgan')

const Person = require('./mongoose')

const path = require('path')
app.use(express.static('dist'))


app.use((req, res, next) => {
    const alkuperäinenJson = res.json
    res.json = (data) => {
        res.locals.responseBody = data
        alkuperäinenJson.call(res, data)  
    }
    next()
})

morgan.token('response-body', (req,res)=>{
    return res.locals.responseBody?JSON.stringify(res.locals.responseBody):"ei mitään"
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :response-body'))










app.get('/', (request,response)=>{
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', async(request,response, next)=>{
    try{
    const persons = await Person.find({})
    response.json(persons)
    }catch(error){
        next(error)
    }
})

app.get('/info', async(request, response, next)=>{
    try{
    const persons = await Person.find({})
    const currenthetki = new Date()
    response.send(`<h2>Phonebook has info of ${persons.length} persons</h2>
        <p>${currenthetki}</p>`
        
    )
    }
    catch(error){
        next(error)
    }
   
    
})

app.get('/api/persons/:id',async(request,response, next)=>{
    try{
    
    const hän = await Person.findById(request.params.id)
    if(hän){
        response.json(hän)
    }
    else{
        response.status(404).end()
    }
    }catch(error){
        next(error)
    }
})

app.delete('/api/persons/:id', async (request, response, next)=>{
    console.log("delete request from backend called")
    try{
    console.log(request.params.id)

    vast = await Person.findByIdAndDelete(request.params.id)
    if(vast){
        response.status(204).end()
    }else{
        response.status(404).json({error: "henkilöä ei löytynyt"})
    }
    }catch(error){
        console.log("Error deleting the person",error)
        next(error)
    }
})

app.post('/api/persons', async(request, response, next)=>{
    try{

        let persons = await Person.find({})
        const {name, number} = request.body

        if(!name||!number){
            return response.status(400).json({
                message:`There needs to be both name and number`
            })
        }
        inThere = persons.some((p)=>p.name==name)
        if(inThere){
            return response.status(400).json({
                message:`The name was aldready found in the list`
            })
        }
        const iD = Math.floor(Math.random()*1000000).toString()
        

        const person = new Person({
            name:name,
            id:iD,
            number: number
        })

        const savedPerson = await person.save()
        
        response.status(201).json(savedPerson)
        
    }catch(error){
        console.log(`Error adding a person to the database. ${error}`)
        next(error)
    }
})

app.put('/api/persons/:id', async(request,response, next)=>{
    try{
        const {name,number} = request.body
        const updatedPersona = await Person.findByIdAndUpdate(request.params.id, {name:name,number:number},{new:true, runValidators:true})
        if(updatedPersona){
            response.json(updatedPersona)
        }
        else{
            response.status(404).json({error:"henkilöä ei löytynyt"})
        }
    }catch(error){
        next(error)
    }
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// tämä tulee kaikkien muiden middlewarejen ja routejen rekisteröinnin jälkeen!!
app.use(errorHandler)

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
} )