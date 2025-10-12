

const express = require('express')
const fs = require('fs').promises
const app = express()
app.use(express.json())
const morgan = require('morgan')

app.use(morgan('tiny'))

/*const persons = [
    {
      name: "Arto Hellas",
      number: "03021-321-321-21",
      id: "1"
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: "2"
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: "3"
    },
    {
      name: "Mary Poppendiecka",
      number: "39-23-6423122",
      id: "4"
    }
]
*/

const getDataFromFilu = async() => {
    const data = await fs.readFile('db.json', 'utf8');
    return JSON.parse(data);
};

const saveDataToFilu = async(data) => {
    await fs.writeFile('db.json',JSON.stringify(data),null, 2);
};


app.get('/', (request,response)=>{
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', async(request,response)=>{
    const persons = await getDataFromFilu()
    response.json(persons)
})

app.get('/info', async(request, response)=>{
    const persons = await getDataFromFilu()
    const currenthetki = new Date()
    response.send(`<h2>Phonebook has info of ${persons.length} persons</h2>
        <p>${currenthetki}</p>`
        
    )

   
    
})

app.get('/api/persons/:id',async(request,response)=>{
    const persons = await getDataFromFilu()
    const id = request.params.id
    const hän = persons.find(hän=>hän.id==id)
    if(hän){
        response.json(hän)
    }
    else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', async (request, response)=>{

    try{

    
    let persons = await getDataFromFilu()
    const id = request.params.id
    
    persons = persons.filter(hän=>hän.id!==id)
    await saveDataToFilu(persons)

    response.status(200).json(
        {message:`person with id of:${id} deleted succesfully `}

    )
    }catch(error){
        console.log("Error fetching the data from a file",error)
    }
})

app.post('/api/persons', async(request, response)=>{
    try{

        let persons = await getDataFromFilu()
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
        persons = [...persons, {id:iD,name: name,number: number}]

        await saveDataToFilu(persons)
        response.status(201).json({id:iD,name:name, number: number})
        
    }catch(error){
        console.log(`Error adding a person to the database. ${error}`)
    }
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
} )