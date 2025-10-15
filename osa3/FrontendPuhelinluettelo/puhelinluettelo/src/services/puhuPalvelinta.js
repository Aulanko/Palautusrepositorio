import axios from "axios"


const baseUrl = import.meta.env.VITE_NODE_ENV !== 'development' 
  ? 'https://backi-puhelin-applikaatio-leo.onrender.com/api/persons':'http://localhost:3001/api/persons'
  
  

const getAll= ()=>{
    return axios
    .get(baseUrl)
    
}

const create = (person)=>{
    return axios
    .post(baseUrl, person)
}

const update = (person) =>{
    return axios.put(`${baseUrl}/${person.id}`,person)
}

const remove = (person) =>{
    console.log("remove request called")
    return axios.delete(`${baseUrl}/${person.id}`)
}

export default{
    getAll:getAll,
    create: create,
    remove: remove,
    update:update

}