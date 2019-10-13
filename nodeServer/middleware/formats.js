const Formats = require(`../models/formats`)
const Response = require(`../helpers/response`)

module.exports = formatsMongoDB = {
    async getAll() {
        const response = new Response()
        try {
            const formats = await Formats.find({})
            response
                .status(200)
                .message('Ok')
                .data(formats)
        } catch (error) {
            response.status(400).message('Bad Request')
        }
        return response.result
    },
    async deleteFormat(id) {
        const response = new Response(412, 'Precondition Failed')
        try {
            const resDB = await Formats.deleteOne({ _id: id })
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
    async load(name) {
        const response = new Response(412, 'Precondition Failed')
        const formatData = {
            name: name,
        }
        const format = new Formats(formatData)
        try {
            await format.save()
            response
                .status(201)
                .message('Ok')
                .data(format)
        } catch (error) {
            if (error.code === 11000) {
                await Formats.findOne({ name: name }, function(findError, format) {
                    if (findError || !format) {
                        response
                            .status(400)
                            .message('Duplicate name')
                            .data(findError)
                    } else {
                        response
                            .status(201)
                            .message('Duplicate name')
                            .data(format)
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
    async add(name) {
        const response = new Response(412, 'Precondition Failed')
        const formatData = {
            name: name,
        }
        const format = new Formats(formatData)
        try {
            await format.save()
            response
                .status(201)
                .message('Ok')
                .data(format)
        } catch (error) {
            response
                .status(400)
                .message('Duplicate name')
                .data(findError)
        }
        return response.result
    },
}
