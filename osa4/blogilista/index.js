
const express = require('express')
const { connectToDatabase } = require('./utils/db')
const Blog = require('./models/blogs')
const User = require('./models/usersModel')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware') 
const app = express()
const jwt = require('jsonwebtoken')


app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.tokenExtractor)



app.get('/', (request, response)=>{
    response.send('Blog is running now')
})

app.get('/api/blogs', async(request, response) => {
 
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
  //Blog.find({}).then((blogs) => {
  //  response.json(blogs)
  //})
})

app.post('/api/blogs', async(request, response) => {
  if(!request.body.likes){
    request.body.likes = 0
  }
  if(!("url" in request.body)||!("title" in request.body)){
    return response.status(400).send({error:"Bad request"})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  //const usera = await User.findOne({})
  const blog = new Blog({...request.body, user:user._id})
  const savedBlog = await blog.save()

  
  await User.findByIdAndUpdate(user._id, {
      $push: { blogs: savedBlog._id }
    })
  
  
  response.status(201).json(savedBlog)
  
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



connectToDatabase().then(() => {
  if(process.env.NODE_ENV !== 'test') {
    const PORT = 3003
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  }
})


module.exports = app