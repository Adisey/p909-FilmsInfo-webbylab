const express = require('express')
const router = express.Router()
const FormatsMongoDB = require(`../middleware/formats`)

router.get(`/`, async (req, res) => {
    const resDB = await FormatsMongoDB.getAll()
    res.status(resDB.status).json({
        message: resDB.message,
        data: resDB.data,
    })
})

router.post(`/`, async (req, res) => {
    if (req && req.body && req.body.name) {
        const response = await FormatsMongoDB.add(req.body.name)
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
        const resDB = await FormatsMongoDB.deleteFormat(req.params.id)
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
