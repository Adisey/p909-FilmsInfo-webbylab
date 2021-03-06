const mongoose = require('mongoose')
const Schema = mongoose.Schema

const formatsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
})

module.exports = mongoose.model('formats', formatsSchema)
