const Films = require(`../models/films`)

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
            if (error.code === 11000) {
                await Films.findOne({ title: newFilm.title }, function(findError, film) {
                    if (findError || !film) {
                        response.status = 400
                        response.message = 'Duplicate name'
                        response.data = findError
                    } else {
                        // ToDo: Нужно проапдейтить фильм
                        response.status = 201
                        response.message = 'Duplicate name'
                        response.data = film
                    }
                })
            } else {
                response.status = 400
                response.message = 'Bad Request'
                response.data = error.errmsg
            }
        }
        // ToDo: В фоне добавить артистов и форматы
        return response
    },
}
