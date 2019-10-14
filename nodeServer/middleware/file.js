const Response = require(`../helpers/response`)
const filmsMongoDB = require(`./films`)

module.exports = fileLoad = {
    async load(body) {
        const response = new Response(412, 'Precondition Failed')
        try {
            const data = await body.data
            const content64 = await base64Content(data)
            const content = Buffer.from(content64, 'base64').toString('ascii')
            const contentArr = content.split('\n')
            const contentArrLength = contentArr.length
            const film = new Film()
            for (let strN = 0; strN < contentArrLength; strN++) {
                if (contentArr[strN]) {
                    const strArr = contentArr[strN].split(':')
                    if (!!strArr.length) {
                        if (strArr[0].toLowerCase() === 'title' && film.ok) {
                            const result = film.result
                            await filmsMongoDB.load(result)
                            film.clean()
                            film.add(...strArr)
                        } else {
                            film.add(...strArr)
                        }
                    }
                }
            }
            if (film.ok) {
                const result = film.result
                await filmsMongoDB.load(result)
            }
            response.status(201).message('Ok')
        } catch (error) {
            response
                .status(400)
                .message('Bad Request')
                .data(error)
        }
        return response.result
    },
}

const base64Content = async (base64) => {
    if (base64 && typeof base64 === 'string') {
        return await base64.split(',')[1]
    } else {
        return ''
    }
}

const Film = class {
    add(field, ...values) {
        const _field = field === 'Release Year' ? 'releaseYear' : field.toLowerCase().trim()
        const _value = values.join(':').trim()
        this[_field] = _value ? _value : ''
    }
    clean() {
        this.title = undefined
        this.releaseYear = undefined
        this.format = undefined
        this.stars = undefined
    }
    get result() {
        return {
            title: this.title,
            releaseYear: this.releaseYear,
            format: this.format,
            stars: this.stars,
        }
    }
    get ok() {
        return !!this.title
    }
}
