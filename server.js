import express from 'express'
import graphql from 'express-graphql'
import schema from './data/schema'
import mongo from 'mongoose'

const port = 4000 
const server = express()

mongo.connect('mongodb://kevin.gauer:Meteor555@ds229552.mlab.com:29552/graphql-books')
mongo.connection.once('open', () => {
    console.log('connected to mongodb')
})

//const schema = Schema(`
//type Query {
//    author(firstName: String, lastName: String): Author
//    }

//type Author {
//    firstName: String
//    lastName: String
//    posts: [Post]
//    }

//type Post {
//    title: String
//    text: String
//    author: Author
//}
//`)

const Data = [

    {
        firstName: 'Paul',
        lastName: 'Allen'
    },

    {
        firstName: 'Dick',
        lastName: 'Face'
    },

    {
        firstName: 'Taser',
        lastName: 'Face'
    },

    {
        firstName: 'Dick',
        lastName: 'Army'
    }

]

const getAuthor = args => {
    return Author.find({where: args})
}

//const getCourses = (args) => {
//    if (args.topic.length > 0) {
//        return coursesData.filter(course => course.topic === args.topic)
//    }
//    else return coursesData
//}

//const updateCourseTopic = ({ id, topic }) => {
//    coursesData.map(course => {
//        if (course.id === id) 
//            course.topic = topic
//    })
//    return coursesData.filter(course => course.id === id)[0]
//}

//const createCourse = ({ topic, title }) => {
//    const newCourse = coursesData.length
//    if (!coursesData[newCourse]) {
//        coursesData[newCourse] = {
//            id: newCourse,
//            topic: topic,
//            title: title
//        }
//        return coursesData[newCourse]
//    }
//    else return coursesData
//}

//const rootValue = {
//    author: getAuthor,
//    Author: {
//        posts(author) {
//            return author.getPosts()
//        }
//    }
//}

server.use('/', graphql({
    schema,
    graphiql: true
}))

server.listen(port, () => console.log(`running on localhost:${port}`))