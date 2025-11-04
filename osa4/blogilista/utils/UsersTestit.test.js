const {test, describe, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const bcrypt = require('bcryptjs')
const User = require('../models/usersModel')
const assert = require('node:assert') 

const api = supertest(app)


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ name:"Lotta", username: 'root', password: passwordHash })

    await user.save()
  })

  test('Creation succeeds with a fresh username', async() => {
    const usersAtStart = await usersInDb() 

    const newUser = {
      username: 'lepakkoMies',
      name: 'Otto',
      password: 'salainen',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-type', /application\/json/)

    const usersAtEnd = await usersInDb() 
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('Gives out a proper statuscode, when trying to send with invalid userName given', async()=>{
    const usersAtStart = await usersInDb() 

    const newUser = {
      username: 'l',
      name: 'OoKKoo',
      password: 'salainen',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    const usersAtEnd = await usersInDb() 
    assert.strictEqual(usersAtEnd.length, 1)


    
  })

  test('Gives out a proper statuscode, when trying to send with invalid Password given', async()=>{
    const usersAtStart = await usersInDb() 

    const newUser = {
      username: 'lelelele',
      name: 'OKKoo',
      password: 'sa',
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    
    const usersAtEnd = await usersInDb() 
    assert.strictEqual(usersAtEnd.length, 1)


    
  })

   test('Creation fails with proper statuscode and message if username already taken', async() => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'root', 
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    

    const usersAtEnd = await usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})