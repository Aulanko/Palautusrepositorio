

const mongoose = require('mongoose')
const config = require('../utils/config.js')




const userSchema = mongoose.Schema({

    name:{
        type:String,
        required: true,
        minlength: 1
    },
    username:{
        type:String,
        required: true,
        minlength: 3,
        unique: true
    },
    password:{
        type:String,
        required: true,
        minlength: 3
    }

})


userSchema.set('toJSON', {
    transform:(document, returnedObj)=>{
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
        delete returnedObj.password
    }
})

module.exports = mongoose.model('User', userSchema)