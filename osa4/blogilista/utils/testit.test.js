const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('./list_helper')


const blogi = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
    }
  ]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,

  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
   
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
 
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
   
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
   
  }  
]

test('dummy returns one', () => {
  

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total_likes', () =>{
  

  test('all likes from the test blog lists combined equal, to one calculated', ()=>{
    const vast = listHelper.totalLikes(blogs)
    console.log(vast)
    assert.strictEqual(vast,36)
  })

  test('capable of counting likes only from a single element', () =>{
    const vast = listHelper.totalLikes(blogi)
    assert.strictEqual(vast, 7)
  })

  test('capable of identifying 0 likes', () =>{
    const vast = listHelper.totalLikes([blogs[5]], 0)
  })

  test('Capable of getting it right with part of the items from a list', ()=>{
    const vast = listHelper.totalLikes(blogs.slice(1,4))
    assert.strictEqual(vast, 27)
  })
})

describe('Getting the maximum likes object', () =>{
  test('works with only 1 item', ()=>{
     const vast = listHelper.favoriteBlog(blogi)
     assert.deepStrictEqual(vast, blogi[0])
  })

  test('works with multiple items in a object list', () =>{
    const vast = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(vast, blogs[2])
  })

  test('gives undefined with an empty list', ()=>{
    const vast = listHelper.favoriteBlog([])
    assert.deepStrictEqual(vast, undefined)
  })
})

