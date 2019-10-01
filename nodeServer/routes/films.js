const express = require('express')
const router = express.Router()
const Films = require(`../models/films`)

// ToDo: Добавить PATCH

router.get(`/`, async (req, res) => {
    // ToDO: Добавить Пагинацию
    const films = await Films.find({})
    res.status(200).json(films)
})

router.post(`/`, async (req, res) => {
    // ToDo: Обыграть проверку на дублирование
    try {
        const filmsData = {
            title: req.body.title,
            releaseYear: req.body.releaseYear,
            format: req.body.format,
            stars: req.body.stars ? req.body.stars : '',
        }
        const films = new Films(filmsData)
        await films.save()
        res.status(201).json(films)
    } catch (error) {
        res.status(400).json({
            message: 'Bad Request',
            error: error,
        })
    }
})

router.delete(`/:id`, async (req, res) => {
    try {
        const resDB = await Films.deleteOne({ _id: req.params.id })
        const message = resDB.deletedCount
            ? `record with id ${req.params.id} is delete`
            : `record with id ${req.params.id} is not Found`
        res.status(200).json({
            message: message,
        })
    } catch (error) {
        res.status(400).json({
            message: 'Bad Request',
            error: error,
        })
    }
})

module.exports = router
