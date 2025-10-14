import axios from "axios"


const baseUrl = import.meta.env.VITE_NODE_ENV === 'development' 
  ? 'http://localhost:3001/api/persons'
  : 'https://palautusrepositorio-fddg.onrender.com/api/persons'
  

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
    return axios.delete(`${baseUrl}/${person.id}`)
}

export default{
    getAll:getAll,
    create: create,
    remove: remove,
    update:update

}