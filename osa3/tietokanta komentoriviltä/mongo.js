


const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const henkilöNimi = process.argv[3]

const number = process.argv[4]


const url = `mongodb+srv://Leo:${password}@cluster0.hhycu.mongodb.net/puhelinLuetteloIhmiset?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)





const puhelinluetteloSchema = new mongoose.Schema({
    name: String,
    number: String,
})



const Person = mongoose.model('Person', puhelinluetteloSchema)

const person = new Person({
    name: henkilöNimi,
    number: number,
})

person.save().then(result =>{
    console.log('person saved!')
   // mongoose.connection.close()
})
/*
const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})
*/
Person.find({}).then(result => {
  result.forEach(person => {
    console.log(person)
  })
  mongoose.connection.close()
})