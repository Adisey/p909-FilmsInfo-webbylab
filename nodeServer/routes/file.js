const express = require('express')
const router = express.Router()
const FileLoad = require(`../middleware/file`)

router.post(`/`, async (req, res) => {
    if (req && req.body) {
        // console.log('=************=(req.body)=>', req.body)
        const response = await FileLoad.load(req.body)
        res.status(200).json({
            message: response.message,
            data: response.data,
        })
    } else {
        res.status(412).json({
            message: 'Precondition Failed',
        })
    }
})

module.exports = router
