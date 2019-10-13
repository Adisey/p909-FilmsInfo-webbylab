module.exports = Response = class {
    constructor(status, message = 'Internal Server Error', data = {}) {
        this._status = isNaN(parseInt(status)) ? 500 : parseInt(status)
        this._message = message
        this._data = data
    }
    status(newStatus) {
        if (newStatus) {
            this._status = isNaN(parseInt(newStatus)) ? parseInt(newStatus) : this._status
            return this
        } else {
            return this._status
        }
    }
    message(newMessage) {
        if (newMessage) {
            this._message = newMessage
            return this
        } else {
            return this._message
        }
    }
    data(newData) {
        if (newData) {
            this._data = newData
            return this
        } else {
            return this._data
        }
    }
    get result() {
        return {
            message: this._message,
            status: this._status,
            data: this._data,
        }
    }
}
