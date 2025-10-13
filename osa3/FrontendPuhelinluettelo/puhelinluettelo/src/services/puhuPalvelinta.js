import axios from "axios"
const baseUrl = 'http://localhost:3001/api/persons'

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