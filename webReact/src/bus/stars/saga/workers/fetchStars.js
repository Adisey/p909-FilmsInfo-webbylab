// Core
import { put, apply } from 'redux-saga/effects'
import { v4 } from 'uuid'

// Instruments
import { api } from '../../../../REST'
import { uiActions } from '../../../ui/actions'
import { starsActions } from '../../actions'

export function* fetchStars() {
    const spinnerId = v4()
    try {
        yield put(uiActions.addSpinning(spinnerId))
        const response = yield apply(api, api.stars.fetch)
        const { data, message } = yield apply(response, response.json)

        if (response.status !== 200) {
            throw new Error(message)
        }
        yield put(starsActions.fillStars(data))
    } catch (error) {
        yield put(uiActions.emitError(error, 'fetchStars worker'))
    } finally {
        yield put(uiActions.removeSpinning(spinnerId))
    }
}
