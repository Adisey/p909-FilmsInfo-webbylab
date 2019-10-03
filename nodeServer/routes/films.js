const express = require('express')
const router = express.Router()
const FilmsMongoDB = require(`../middleware/films`)

// ToDo: Добавить PATCH

router.get(`/`, async (req, res) => {
    // ToDO: Возможно добавить Пагинацию
    const resDB = await FilmsMongoDB.getAll()
    res.status(resDB.status).json({
        message: resDB.message,
        data: resDB.data,
    })
})

router.post(`/`, async (req, res) => {
    if (req && req.body) {
        // const response = await FilmsMongoDB.add(req.body)
        // ToDo: Временно, для теста
        const response = await FilmsMongoDB.load(req.body)
        res.status(response.status).json({
            message: response.message,
            data: response.data,
        })
    } else {
        res.status(412).json({
            message: 'Precondition Failed',
        })
    }
})

router.delete(`/:id`, async (req, res) => {
    if (req && req.params && req.params.id) {
        const resDB = await FilmsMongoDB.deleteFilm(req.params.id)
        res.status(resDB.status).json({
            message: resDB.message,
        })
    } else {
        res.status(400).json({
            message: 'Bad Request',
        })
    }
})

module.exports = router
