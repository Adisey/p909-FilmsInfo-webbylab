const Films = require(`../models/films`)
const starsMongoDB = require(`../middleware/stars`)
const formatsMongoDB = require(`../middleware/formats`)
const Response = require(`../helpers/response`)

module.exports = filmsMongoDB = {
    async getAll() {
        const response = new Response()
        try {
            const films = await Films.find({})
            response
                .status(200)
                .message('Ok')
                .data(films)
        } catch (error) {
            response
                .status(400)
                .message('Bad Request')
                .data(error)
        }
        return response.result
    },
    async deleteFilm(id) {
        const response = new Response(412, 'Precondition Failed')
        try {
            const resDB = await Films.deleteOne({ _id: id })
            response
                .status(204)
                .message(
                    resDB.deletedCount
                        ? `record with id ${id} is delete`
                        : `record with id ${id} is not Found`
                )
        } catch (error) {
            response
                .status(400)
                .message('Bad Request')
                .data(error)
        }
        return response.result
    },
    async add(newFilm) {
        const response = new Response(412, 'Precondition Failed')
        const filmData = {
            title: newFilm.title,
            releaseYear: newFilm.releaseYear,
            format: newFilm.format,
            stars: newFilm.stars,
        }
        const film = new Films(filmData)
        try {
            await film.save()
            response
                .status(201)
                .message('Ok')
                .data(film)
        } catch (error) {
            response
                .status(400)
                .message('Duplicate name')
                .data(findError)
        }
        return response.result
    },
    async load(newFilm) {
        const response = new Response(412, 'Precondition Failed')
        const filmData = {
            title: newFilm.title,
            releaseYear: newFilm.releaseYear,
            format: newFilm.format,
            stars: newFilm.stars,
        }
        const film = new Films(filmData)
        try {
            await film.save()
            response
                .status(201)
                .message('Ok')
                .data(film)
        } catch (error) {
            if (error.code === 11000) {
                const myResponse = await updateFilmByTitle(newFilm)
                response
                    .status(myResponse.status)
                    .message(myResponse.message)
                    .data(myResponse.data)
            } else {
                response
                    .status(400)
                    .message('Bad Request')
                    .data(error.errmsg)
            }
        }
        // Node: В фоне добавим артистов и форматы
        if (response.status === 201) {
            if (newFilm.format) {
                formatsMongoDB.load(newFilm.format)
            }
            const newStar = response.data.stars.split(',')
            newStar.forEach((star) => {
                starsMongoDB.load(star.trim())
            })
        }
        return response.result
    },
    async update(id, newFilm) {
        const response = new Response(412, 'Precondition Failed')
        const filmData = {
            title: newFilm.title,
            releaseYear: newFilm.releaseYear,
            format: newFilm.format,
            stars: newFilm.stars,
        }
        try {
            const updatedFilm = await Films.findOneAndUpdate(
                { _id: id },
                { $set: filmData },
                { new: true }
            )
            response
                .status(201)
                .message('Ok')
                .data(updatedFilm)
        } catch (error) {
            response
                .status(400)
                .message('Bad Request')
                .data(error.errmsg)
        }
        // Node: В фоне добавим артистов и форматы
        if (response.status === 201) {
            if (response.data.format) {
                formatsMongoDB.load(response.data.format)
            }
            const newStar = response.data.stars.split(',')
            newStar.forEach((star) => {
                starsMongoDB.load(star.trim())
            })
        }
        return response.result
    },
}
async function updateFilmByTitle(newFilm) {
    const response = new Response(400, 'Error Updating Films')
    try {
        const updatedFilm = await Films.findOneAndUpdate(
            { title: newFilm.title },
            { $set: newFilm },
            { new: true }
        )
        response
            .status(201)
            .message('Ok')
            .data(updatedFilm)
    } catch (error) {
        response.data(error)
    }
    return response.result
}
