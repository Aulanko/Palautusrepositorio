

const dummy = (blogs) => {
  // ...
  return 1
}

const summa = (sum,item) =>{
  return sum+item
}


const totalLikes = (blogs)=>{
  likesLista = blogs.map(blog =>blog.likes)
  vast = likesLista.reduce(summa,0)
  return vast
}

module.exports = {
  dummy,
  totalLikes
}