import Seq from 'sequelize'
import casual from 'casual'
import _ from 'lodash'

const db = new Seq('course', null, null, {
	dialect: 'sqlite',
	storage: './courses.sqlite'
})

const AuthorModel = db.define('author', {
    firstName: { type: Seq.STRING },
    lastName: { type: Seq.STRING }
})

const PostModel = db.define('post', {
    title: { type: Seq.STRING },
    text: { type: Seq.STRING }
})

AuthorModel.hasMany(PostModel)
PostModel.belongsTo(AuthorModel)

casual.seed(123)
db.sync({ force: true }).then(() => {
    _.times(10, () => {
        return AuthorModel.create({
            firstName: casual.first_name,
            lastName: casual.last_name
        }).then(author => {
            return author.createPost({
                title: `A post by ${author.firstName}`,
                text: casual.sentences(3)
            })
        })
    })
})

const Author = db.models.author
const Post = db.models.post

export {Author, Post}