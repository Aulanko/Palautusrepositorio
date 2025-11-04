
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

    test('The field, which identifyes the blogs must be named id', async() =>{
        const res = await api.get('/api/blogs')
        assert.ok('id' in res.body[0])
        assert.ok(!('_id' in res.body[0]))
    })

    test('You can add blogs to the app by using http POST request to /api/blogs', async() =>{
        const newObject = {
            "title": "Koiran juoksu",
            "author": "Koira",
            "url": "http://koira.fi",
            "likes": 29
        }
        await api.post('/api/blogs')
        .send(newObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)


        const res = await api.get('/api/blogs')
        assert.strictEqual(initialBlogs.length+1, res.body.length)

        const otsikot = res.body.map(b => b.title)

        assert.ok(otsikot.includes("Koiran juoksu"))
    })

    test('If no value in the field likes, its default value will be set to 0', async()=>{
        const newObject = {
            "title": "Koiran juoksu",
            "author": "Koira",
            "url": "http://koira.fi",
            "likes": ""
            
        }
        await api.post('/api/blogs')
        .send(newObject)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        res = await api.get('/api/blogs')
        lisättyBlogi = res.body.find(b => b.title ==="Koiran juoksu")
        assert.strictEqual(0, lisättyBlogi.likes)

    } )

    test('if the new to be added blog, does not contain title field or url field, it will be met with status 400 Bad Request', async() =>{
        const newObject = {
            
            "author": "Koira",
            
            "likes": 32   
        }
        await api.post('/api/blogs')
        .send(newObject)
        .expect(400)

    })

    test('Testing deleting an object from the blogs', async() =>{
        const blogitAlussa = await api.get('/api/blogs')
        const blogToDelete = blogitAlussa.body[1]

        await api.delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        

        const res = await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        assert.strictEqual(res.body.length, 1)
        const poistettuBlogi = res.body.find(b => b.title ==="Kissan seisonta")
        assert.strictEqual(poistettuBlogi, undefined)
    })

    test('Testing editing a blog', async()=>{
        const blogitAlussa = await api.get('/api/blogs')
        const blogiToUpdate = blogitAlussa.body[0]

        const updatedObj =  {
        "title": "Hepan juoksu",
        "author": "Heppa",
        "url": "http://koira.fi",
        "likes": 990,
        
    }

        await api.put(`/api/blogs/${blogiToUpdate.id}`)
        .send(updatedObj)
        .expect(200)

        const res = await api.get('/api/blogs')

        assert.strictEqual(990, res.body[0].likes)

    })

    after(async () =>{
        await mongoose.connection.close()
    })

})

