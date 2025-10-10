

const express = require('express')
const app = express()

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

const getDataFromFile = async () => {
    const data = await fs.readFile('db.json', 'utf8');
    return JSON.parse(data);
};

app.get('/', (request,response)=>{
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request,response)=>{
    response.json(persons)
})

app.get('/info', (request, response)=>{
    const currenthetki = new Date()
    response.send(`<h2>Phonebook has info of ${persons.length} persons</h2>
        <p>${currenthetki}</p>`
        
    )

   
    
})

app.get('/api/persons/:id',(request,response)=>{
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
    let persons = await getDataFromFile()
    const id = request.params.id
    
    persons = persons.filter(hän=>hän.id!==id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, ()=>{
    console.log(`server is running on port: ${PORT}`)
} )