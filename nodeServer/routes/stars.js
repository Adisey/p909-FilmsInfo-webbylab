const express = require('express')
const router = express.Router()
const Stars = require(`../models/stars`)

router.get(`/`, async (req, res) => {
    // ToDO: Добавить Пагинацию
    const stars = await Stars.find({})
    res.status(200).json(stars)
})

router.post(`/`, async (req, res) => {
    try {
        const starsData = {
            fullName: req.body.fullName,
        }
        const stars = new Stars(starsData)
        await stars.save()
        res.status(201).json(stars)
    } catch (error) {
        res.status(400).json({
            message: 'Bad Request',
            error: error,
        })
    }
})

router.delete(`/:id`, async (req, res) => {
    try {
        const resDB = await Stars.deleteOne({ _id: req.params.id })
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
