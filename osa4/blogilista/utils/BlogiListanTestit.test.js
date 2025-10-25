
const {test, describe, after, beforeEach} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { application } = require('express')
const app = require('../index')
const Blog = require('../models/blogs')
const  assert  = require('node:assert')

const api = supertest(app)

const initialBlogs = [
  {
    "title": "Hepan juoksu",
    "author": "Heppa",
    "url": "http://koira.fi",
    "likes": 42,
    "id": "68f0e71dd4dbd29615557037"
  },
  {
    "title": "Kissan seisonta",
    "author": "Kissa",
    "url": "http://kissa.fi",
    "likes": 12,
    "id": "68f0e71dd4dbd29615557099"
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})


describe('tietokannasta hakemistestejä', ()=>{
    test('haetaan JSON arvoja', async ()=>{
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        
    })

    test('All blogs returned', async() =>{
        const res = await api.get('/api/blogs')
    
        assert.strictEqual(initialBlogs.length, res.body.length)
    })

    after(async () =>{
        await mongoose.connection.close()
    })

})

