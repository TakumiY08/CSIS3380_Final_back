const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bookRouter = require('./bookRoutes')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = 'mongodb+srv://ty_mongouser:csis3380g2@atlascluster.hp3vha1.mongodb.net/BookStorage?retryWrites=true&w=majority&appName=AtlasCluster'
// const uri = 'mongodb://127.0.0.1:27017/BookStorage'

mongoose.connect(uri,{
    useNewUrlParser: true, useUnifiedTopology: true
})

const connection = mongoose.connection
connection.prependListener('open', () => {
    console.log('Mongo DB connection')
})

app.use(bookRouter)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})