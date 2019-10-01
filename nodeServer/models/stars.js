const mongoose = require('mongoose')
const Schema = mongoose.Schema

const starsSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('stars', starsSchema)
