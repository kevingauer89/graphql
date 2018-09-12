import {
    GraphQLObjectType as Obj, GraphQLString as String, GraphQLSchema as Schema,
    GraphQLInt as Int, GraphQLList as List, GraphQLID as Id, GraphQLNonNull as Required
} from 'graphql'
import Book from './book'
import Author from './author'
import _ from 'lodash'

const books = [
    { name: 'Name of the Wind', genre: 'Fantasy', id: 1, authorId: 1 },
    { name: 'The Final Empire', genre: 'Fantasy', id: 2, authorId: 2 },
    { name: 'The Long Earth', genre: 'Sci-Fi', id: 3, authorId: 3 }
]

const authors = [
    { name: 'Patrick Rothfuss', age: 44, id: 1 },
    { name: 'Brandon Sanderson', age: 42, id: 2 },
    { name: 'Terry Pratchett', age: 66, id: 3 }
]

const bookType = new Obj({
    name: 'Book',
    fields: () => ({
        id: { type: Id },
        name: { type: String },
        genre: { type: String },
        author: {
            type: authorType,
            resolve(parent, args) {
               // return _.find(authors, {id: parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const authorType = new Obj({
    name: 'Author',
    fields: () => ({
        id: { type: Id },
        name: { type: String },
        age: { type: Int },
        books: {
            type: new List(bookType),
            resolve(parent, args) {
               // return _.filter(books, { authorId: parent.id })
                return Book.find({authorId: parent.id})
            }
        }
    })
})

const rootQuery = new Obj({
    name: 'RootQueryType',
    fields: {
        book: {
            type: bookType,
            args: { id: { type: Id } },
            resolve(parent, args) {
                // return _.find(books, { id: args.id })
                return Book.findById(args.id)
            }
        },
        author: {
            type: authorType,
            args: { id: { type: Id } },
            resolve(parent, args) {
                // return _.find(authors, { id: args.id })
                return Author.findById(args.id)
            }
        },
        books: {
            type: new List(bookType),
            resolve(parent, args) {
              //  return books
                return Book.find({})
            }
        },
        authors: {
            type: new List(authorType),
            resolve(parent, args) {
                return Author.find({})
            }
        }
    }
})

const mutation = new Obj({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: authorType,
            args: {
                name: { type: new Required (String) },
                age: { type: new Required (Int) }
            },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                })
                return author.save()
            }
        },
        addBook: {
            type: bookType,
            args: {
                name: { type: new Required (String) },
                genre: { type: new Required (String) },
                authorId: { type: new Required (Id) }
            },
            resolve(parent, args) {
                let book = new Book ({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                })
                return book.save()
            }
        }
    }
})

export default new Schema({
    query: rootQuery,
    mutation
})