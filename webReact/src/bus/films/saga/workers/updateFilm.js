// Core
import { put, apply } from 'redux-saga/effects'
import { v4 } from 'uuid'

// Instruments
import { api } from '../../../../REST'
import { uiActions } from '../../../ui/actions'
import { filmsActions } from '../../actions'

export function* updateFilm({ payload }) {
    const spinnerId = v4()
    try {
        yield put(uiActions.addSpinning(spinnerId))
        const response = yield apply(api, api.films.update, [payload])
        const { data } = yield apply(response, response.json)
        if (response.status !== 201) {
            const { message } = yield apply(response, response.json)
            throw new Error(message)
        }
        yield put(filmsActions.replaceFilm(data))
    } catch (error) {
        yield put(uiActions.emitError(error, 'updateFilm worker'))
    } finally {
        yield put(uiActions.removeSpinning(spinnerId))
    }
}
