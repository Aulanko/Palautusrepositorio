
const {test, describe, after} = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const { application } = require('express')
const app = require('../index')

const api = supertest(app)


describe('tietokannasta hakemistestejä', ()=>{
    test('haetaan JSON arvoja', async ()=>{
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        
    })
    after(async () =>{
        await mongoose.connection.close()
    })

})

