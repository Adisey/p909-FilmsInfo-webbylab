const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const starsRouter = require(`./routes/stars`)
const formatsRouter = require(`./routes/formats`)
const filmsRouter = require(`./routes/films`)
const keys = require('./key')
var cors = require('cors')

const host = '127.0.0.1'
const port = process.env.PORT || 5000 // проверяем системный параметр, если не задан используем 5000
const clientPath = path.join(__dirname, 'client')

mongoose
    .connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log(`Was connected to MongoDB`))
    .catch((err) => console.error(err))

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(`/api/stars`, starsRouter)
app.use(`/api/formats`, formatsRouter)
app.use(`/api/films`, filmsRouter)
app.use(express.static(clientPath))

app.listen(port, () => {
    console.log()
    console.log(`API Server is started ${new Date().toISOString()}`)
    console.log(`Connect to "//${host}:${port}`)
    console.log('Stop Server - "Crtl+C"')
})
