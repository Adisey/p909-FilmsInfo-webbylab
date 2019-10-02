const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filmsSchema = new Schema({
    title: {
        index: true,
        required: true,
        type: String,
        unique: true,
    },
    releaseYear: {
        type: String,
        required: true,
    },
    format: {
        type: String,
        required: true,
    },
    stars: {
        // ToDo: Подумать, тут вероятнее всего будет удобнее массив
        type: String,
    },
})

module.exports = mongoose.model('films', filmsSchema)
