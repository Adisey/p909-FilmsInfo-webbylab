// Core
import { put, apply } from 'redux-saga/effects'
import { v4 } from 'uuid'

// Instruments
import { api } from '../../../../REST'
import { uiActions } from '../../../ui/actions'
import { formatsActions } from '../../actions'

export function* fetchFormats() {
    const spinnerId = v4()
    try {
        yield put(uiActions.addSpinning(spinnerId))
        const response = yield apply(api, api.formats.fetch)
        const { data, message } = yield apply(response, response.json)

        if (response.status !== 200) {
            throw new Error(message)
        }
        yield put(formatsActions.fillFormats(data))
    } catch (error) {
        yield put(uiActions.emitError(error, 'fetchFormats worker'))
    } finally {
        yield put(uiActions.removeSpinning(spinnerId))
    }
}
