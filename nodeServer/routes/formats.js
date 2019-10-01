const express = require('express')
const router = express.Router()
const Formats = require(`../models/formats`)

router.get(`/`, async (req, res) => {
    const formats = await Formats.find({})
    res.status(200).json(formats)
})

router.post(`/`, async (req, res) => {
    // ToDo: Обыграть проверку на дублирование
    try {
        const formatsData = {
            name: req.body.name,
        }
        const formats = new Formats(formatsData)
        await formats.save()
        res.status(201).json(formats)
    } catch (error) {
        res.status(400).json({
            message: 'Bad Request',
            error: error,
        })
    }
})

router.delete(`/:id`, async (req, res) => {
    try {
        const resDB = await Formats.deleteOne({ _id: req.params.id })
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
