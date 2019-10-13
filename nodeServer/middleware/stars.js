const Stars = require(`../models/stars`)
const Response = require(`../helpers/response`)

module.exports = starsMongoDB = {
    async getAll() {
        const response = new Response()
        try {
            const stars = await Stars.find({})
            response
                .status(200)
                .message('Ok')
                .data(stars)
        } catch (error) {
            response
                .status(400)
                .message('Bad Request')
                .data(error)
        }
        return response.result
    },
    async deleteStar(id) {
        const response = new Response(412, 'Precondition Failed')
        try {
            const resDB = await Stars.deleteOne({ _id: id })
            response
                .status(200)
                .message(
                    resDB.deletedCount
                        ? `record with id ${id} is delete`
                        : `record with id ${id} is not Found`
                )
        } catch (error) {
            response.status(400).message('Bad Request')
        }
        return response.result
    },
    async load(fullName) {
        const response = new Response(412, 'Precondition Failed')
        const starData = {
            fullName: fullName,
        }
        const star = new Stars(starData)
        try {
            await star.save()
            response
                .status(201)
                .message('Ok')
                .data(star)
        } catch (error) {
            if (error.code === 11000) {
                await Stars.findOne({ fullName: fullName }, function(findError, star) {
                    if (findError || !star) {
                        response
                            .status(400)
                            .message('Duplicate fullName')
                            .data(findError)
                    } else {
                        response
                            .status(201)
                            .message('Duplicate fullName')
                            .data(star)
                    }
                })
            } else {
                response
                    .status(400)
                    .message('Bad Request')
                    .data(error.errmsg)
            }
        }
        return response.result
    },
    async add(fullName) {
        const response = new Response(412, 'Precondition Failed')
        const starData = {
            fullName: fullName,
        }
        const star = new Stars(starData)
        try {
            await star.save()
            response
                .status(201)
                .message('Ok')
                .data(star)
        } catch (error) {
            response
                .status(400)
                .message('Duplicate fullName')
                .data(findError)
        }
        return response.result
    },
}
