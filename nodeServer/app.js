const express = require('express')
const mongoose = require('mongoose')
const bodyPaser = require('body-parser')
const path = require('path')
const starsRouter = require(`./routes/stars`)
const formatsRouter = require(`./routes/formats`)
const keys = require('./key')

const host = '127.0.0.1'
const port = process.env.PORT || 5000 // проверяем симтемный параметр, есди не задан используем 5000
const clientPath = path.join(__dirname, 'client')

mongoose
    .connect(keys.mongoURI)
    .then(() => console.log(`Was connected to MongoDB`))
    .catch(err => console.error(err))

const app = express()
app.use(bodyPaser.json())
app.use(`/api/stars`, starsRouter)
app.use(`/api/formats`, formatsRouter)
app.use(express.static(clientPath))

app.listen(port, () => {
    console.log()
    console.log(`API Server is started ${new Date().toISOString()}`)
    console.log(`Connect to "//${host}:${port}`)
    console.log('Stop Server - "Crtl+C"')
})
