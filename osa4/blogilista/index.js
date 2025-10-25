
const express = require('express')


const Blog = require('./models/blogs')

const app = express()



//const mongoUrl = 'mongodb://localhost/bloglist'


app.use(express.json())

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

if(process.env.NODE_ENV !=='test'){

  const PORT = 3003
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
}


module.exports = app