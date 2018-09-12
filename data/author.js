import mongo from 'mongoose'

const authorSchema = new mongo.Schema({
    name: String,
    age: Number
})

export default mongo.model('Author', authorSchema)
