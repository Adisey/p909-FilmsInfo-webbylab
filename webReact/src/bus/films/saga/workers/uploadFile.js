// Core
import { put, apply } from 'redux-saga/effects'
import { v4 } from 'uuid'

// Instruments
import { api } from '../../../../REST'
import { uiActions } from '../../../ui/actions'
// import { filmsActions } from '../../actions'

export function* uploadFile({ payload }) {
    const spinnerId = v4()
    try {
        yield put(uiActions.addSpinning(spinnerId))
        const response = yield apply(api, api.file.upload, [payload])
        const { data } = yield apply(response, response.json)
        console.log('==(data)=>', data)
        if (response.status !== 201) {
            const { message } = yield apply(response, response.json)
            throw new Error(message)
        }
    } catch (error) {
        yield put(uiActions.emitError(error, 'uploadFile worker'))
    } finally {
        yield put(uiActions.removeSpinning(spinnerId))
    }
}
