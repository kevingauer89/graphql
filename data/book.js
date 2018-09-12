import mongo from 'mongoose'

const bookSchema = new mongo.Schema ({
	name: String,
	genre: String,
	authorId: String
})

export default mongo.model('Book', bookSchema)