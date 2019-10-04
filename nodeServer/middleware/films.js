const Films = require(`../models/films`)
const starsMongoDB = require(`../middleware/stars`)
const formatsMongoDB = require(`../middleware/formats`)

module.exports = filmsMongoDB = {
    async getAll() {
        const response = {
            status: 500,
            message: 'Internal Server Error',
        }
        try {
            const films = await Films.find({})
            response.status = 200
            response.message = 'Ok'
            response.data = films
        } catch (error) {
            response.status = 400
            response.message = 'Bad Request'
        }
        return response
    },
    async deleteFilm(id) {
        const response = {
            status: 412,
            message: 'Precondition Failed',
        }
        try {
            const resDB = await Films.deleteOne({ _id: id })
            response.status = 200
            response.message = resDB.deletedCount
                ? `record with id ${id} is delete`
                : `record with id ${id} is not Found`
        } catch (error) {
            response.status = 400
            response.message = 'Bad Request'
        }
        return response
    },
    async add(newFilm) {
        const response = {
            status: 412,
            message: 'Precondition Failed',
        }
        const filmData = {
            title: newFilm.title,
            releaseYear: newFilm.releaseYear,
            format: newFilm.format,
            stars: newFilm.stars,
        }
        const film = new Films(filmData)
        try {
            await film.save()
            response.status = 201
            response.message = 'Ok'
            response.data = film
        } catch (error) {
            response.status = 400
            response.message = 'Duplicate name'
            response.data = findError
        }
        return response
    },
    async load(newFilm) {
        let response = {
            status: 412,
            message: 'Precondition Failed',
        }
        const filmData = {
            title: newFilm.title,
            releaseYear: newFilm.releaseYear,
            format: newFilm.format,
            stars: newFilm.stars,
        }
        const film = new Films(filmData)
        try {
            await film.save()
            response.status = 201
            response.message = 'Ok'
            response.data = film
        } catch (error) {
            if (error.code === 11000) {
                const myResponse = await updateFilmByTitle(newFilm)
                response = Object.assign({}, myResponse)
            } else {
                response.status = 400
                response.message = 'Bad Request'
                response.data = error.errmsg
            }
        }
        // Node: В фоне добавим артистов и форматы
        if (response.status === 201) {
            if (newFilm.format) {
                formatsMongoDB.load(newFilm.format)
            }
            const newStar = response.data.stars.split(',')
            newStar.forEach(star => {
                starsMongoDB.load(star.trim())
            })
        }
        return response
    },
}

async function updateFilmByTitle(newFilm) {
    const response = {}
    response.status = 400
    response.message = 'Error Updating Films'
    try {
        const updatedFilm = await Films.findOneAndUpdate(
            { title: newFilm.title },
            { $set: newFilm },
            { new: true }
        )
        response.status = 201
        response.message = 'Duplicate name'
        response.data = updatedFilm
    } catch (error) {
        response.data = error
    }
    return response
}
