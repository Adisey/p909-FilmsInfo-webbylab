const Stars = require(`../models/stars`)

module.exports = starsMongoDB = {
    async getAll() {
        const response = {
            status: 500,
            message: 'Internal Server Error',
        }
        try {
            const stars = await Stars.find({})
            response.status = 200
            response.message = 'Ok'
            response.data = stars
        } catch (error) {
            response.status = 400
            response.message = 'Bad Request'
        }
        return response
    },
    async deleteStar(id) {
        const response = {
            status: 412,
            message: 'Precondition Failed',
        }
        try {
            const resDB = await Stars.deleteOne({ _id: id })
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
    async load(fullName) {
        console.log(fullName, `<-- load Stars------------ fullName`)
        const response = {
            status: 412,
            message: 'Precondition Failed',
        }
        const starData = {
            fullName: fullName,
        }
        const star = new Stars(starData)
        try {
            await star.save()
            response.status = 201
            response.message = 'Ok'
            response.data = star
        } catch (error) {
            if (error.code === 11000) {
                await Stars.findOne({ fullName: fullName }, function(findError, star) {
                    if (findError || !star) {
                        response.status = 400
                        response.message = 'Duplicate fullName'
                        response.data = findError
                    } else {
                        response.status = 201
                        response.message = 'Duplicate FullName'
                        response.data = star
                    }
                })
            } else {
                response.status = 400
                response.message = 'Bad Request'
                response.data = error.errmsg
            }
        }
        console.log(response, `<-- load Stars------------ response`)
        return response
    },
    async add(fullName) {
        const response = {
            status: 412,
            message: 'Precondition Failed',
        }
        const starData = {
            fullName: fullName,
        }
        const star = new Stars(starData)
        try {
            await star.save()
            response.status = 201
            response.message = 'Ok'
            response.data = star
        } catch (error) {
            response.status = 400
            response.message = 'Duplicate fullName'
            response.data = findError
        }
        return response
    },
}
