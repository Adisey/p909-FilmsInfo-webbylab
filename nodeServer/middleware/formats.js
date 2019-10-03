const Formats = require(`../models/formats`)

module.exports = formatsMongoDB = {
    async getAll() {
        const response = {
            status: 500,
            message: 'Internal Server Error',
        }
        try {
            const formats = await Formats.find({})
            response.status = 200
            response.message = 'Ok'
            response.data = formats
        } catch (error) {
            response.status = 400
            response.message = 'Bad Request'
        }
        return response
    },
    async deleteFormat(id) {
        const response = {
            status: 412,
            message: 'Precondition Failed',
        }
        try {
            const resDB = await Formats.deleteOne({ _id: id })
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
    async load(name) {
        const response = {
            status: 412,
            message: 'Precondition Failed',
        }
        const formatData = {
            name: name,
        }
        const format = new Formats(formatData)
        try {
            await format.save()
            response.status = 201
            response.message = 'Ok'
            response.data = format
        } catch (error) {
            if (error.code === 11000) {
                await Formats.findOne({ name: name }, function(findError, format) {
                    if (findError || !format) {
                        response.status = 400
                        response.message = 'Duplicate name'
                        response.data = findError
                    } else {
                        response.status = 201
                        response.message = 'Duplicate name'
                        response.data = format
                    }
                })
            } else {
                response.status = 400
                response.message = 'Bad Request'
                response.data = error.errmsg
            }
        }
        return response
    },
    async add(name) {
        const response = {
            status: 412,
            message: 'Precondition Failed',
        }
        const formatData = {
            name: name,
        }
        const format = new Formats(formatData)
        try {
            await format.save()
            response.status = 201
            response.message = 'Ok'
            response.data = format
        } catch (error) {
            response.status = 400
            response.message = 'Duplicate name'
            response.data = findError
        }
        return response
    },
}
