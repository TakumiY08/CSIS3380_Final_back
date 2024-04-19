const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: String, required: true},
        description: {type: String}
    },
    {
        collection: 'bookrecords'
    }
)

const BookModel = mongoose.model('BookModel', bookSchema)
module.exports = BookModel