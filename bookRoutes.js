const router = require('express').Router();
const Book = require('./book.model')

router.route('/').get((req, res) => {
    Book
    .find()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Book
    .findById(req.params.id)
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/').post(async(req, res) => {
    let title
    let author
    let description

    if(req.body.title && req.body.author) {
        title = req.body.title
        author = req.body.author
    } else {
        res.status(400).json('Error happens about PUT method')
    }

    if(req.body.description) {
        description = req.body.description
    } else {
        description = null
    }

    const newBook = new Book({
        title,author,description
    })

    await newBook
    .save()
    .then(() => res.json("Book added"))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').post(async(req, res) => {
    await Book
    .findById(req.params.id)
    .then((edBook) => {
        edBook.title = req.body.title
        edBook.author = req.body.author
        if(req.body.description) {
            edBook.description = req.body.description
        }

        edBook
        .save()
        .then(() => res.json('Book updated'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete(async(req, res) => {
    await Book
    .findByIdAndDelete(req.params.id)
    .then(() => res.json('Deleted book'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router