const express = require('express')
const router = express.Router()
const StarsMongoDB = require(`../middleware/stars`)

router.get(`/`, async (req, res) => {
    const resDB = await StarsMongoDB.getAll()
    res.status(resDB.status).json({
        message: resDB.message,
        data: resDB.data,
    })
})

router.post(`/`, async (req, res) => {
    if (req && req.body && req.body.fullName) {
        const response = await StarsMongoDB.add(req.body.fullName)
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
        const resDB = await StarsMongoDB.deleteStar(req.params.id)
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
