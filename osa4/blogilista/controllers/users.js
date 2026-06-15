
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/usersModel')
const Blog = require("../models/blogs")

usersRouter.post('/', async (request, response) => {

  try{

  
  const { username, name, password } = request.body

 
  if(username.length<3||password.length<3){
    return response.status(400).send({error:"username or password too short"})
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    password:passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
} catch(error){
    console.error("Error adding a new user:", error.message);
  
  response.status(400).json({success: false,message: error.message
  });
}
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate("blogs")
  response.json(users)
})

module.exports = usersRouter