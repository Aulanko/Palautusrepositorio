const mongoose = require('mongoose')
const config = require('./config.js')

mongoose.set('strictQuery', false)

const connectToDatabase = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message)
        return process.exit(1)
    }
}

module.exports = { connectToDatabase }