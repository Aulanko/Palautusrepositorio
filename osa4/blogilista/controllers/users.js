
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/usersModel')

usersRouter.post('/', async (request, response) => {

  try{

  
  const { username, name, password } = request.body

  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    password,
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
  const users = await User.find({})
  response.json(users)
})

module.exports = usersRouter