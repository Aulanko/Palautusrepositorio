
const express = require('express')
const { connectToDatabase } = require('./utils/db')
const Blog = require('./models/blogs')
const usersRouter = require('./controllers/users')

const app = express()


app.use(express.json())
app.use('/api/users', usersRouter)

app.get('/', (request, response)=>{
    response.send('Blog is running now')
})

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  if(!request.body.likes){
    request.body.likes = 0
  }
  if(!("url" in request.body)||!("title" in request.body)){
    return response.status(400).send({error:"Bad request"})
  }
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.delete('/api/blogs/:id', async(request, response)=>{
  try{
    const id = request.params.id
    result = await Blog.findByIdAndDelete(id)
    if(result){
      response.status(204).end()
    }else{
      response.status(404).json({error: "The blog could not be found"})
    }

  }catch(error){
    console.log("Error deleting a blog;", error)
  }
  

})

app.put('/api/blogs/:id', async(request, response)=>{
 

  try{
    if(!request.body.likes){
    request.body.likes = 0
  }
    if(!("url" in request.body)||!("title" in request.body)){
      return response.status(400).send({error:"Bad request"})
    }

    const id = request.params.id
    const result = await Blog.findByIdAndUpdate(id, request.body, {new:true})
    if(result){
      response.status(200).json(result)
    }else{
      response.status(404).json({error:"Blog to edit not found"})
    }

  }catch(error){
    console.log("Error editing a blog", error)
  }
})


if(process.env.NODE_ENV !=='test'){
  const PORT = 3003
  
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
}


module.exports = app