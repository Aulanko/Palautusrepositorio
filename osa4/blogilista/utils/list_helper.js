

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

empty = []

const dummy = (blogs) => {
  // ...
  return 1
}

const summa = (sum,item) =>{
  return sum+item
}


const totalLikes = (blogs)=>{
  const likesLista = blogs.map(blog =>blog.likes)
  const vast = likesLista.reduce(summa,0)
  return vast
}

const favoriteBlog = (blogs)=>{
  const likesLista = blogs.map(blog=>blog.likes)
  const maks = Math.max(...likesLista)
  const vastaukset = blogs.find(blog=> blog.likes==maks)
  return vastaukset
  
}

const mostBlogs = (blogs)=>{
  if(blogs.length==0){
    return undefined;
  }
  kirjasto = {}
  for(i of blogs){
    kirjasto[i.author] = (kirjasto[i.author]||0)+1

  }
 
 
  const suosituin_author_tykkäykset =Math.max.apply(null, Object.values(kirjasto))
  const author_itse = Object.entries(kirjasto).find(([henkilö, arvo])=>arvo === suosituin_author_tykkäykset)

  const vast = {
    author: author_itse[0],
    blogs: author_itse[1]

  }
 
  return vast
}


const mostLikes = (blogs)=>{
  if(blogs.length==0){
    return undefined;
  }
  kirjasto = {}
  for(i of blogs){
    if(!(i.author in kirjasto)){
       kirjasto[i.author] = i.likes
       continue
    }
    kirjasto[i.author] += i.likes
   
  }

  const suosituin_author_tykkäykset =Math.max.apply(null, Object.values(kirjasto))
  const author_itse = Object.entries(kirjasto).find(([henkilö, arvo])=> arvo===suosituin_author_tykkäykset)

  const vast = {
    author: author_itse[0],
    likes: author_itse[1]
  }
  return vast
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}

//console.log(favoriteBlog(empty))

//console.log(mostBlogs(blogs))
//console.log(mostBlogs([]))

console.log(mostLikes(blogs))
