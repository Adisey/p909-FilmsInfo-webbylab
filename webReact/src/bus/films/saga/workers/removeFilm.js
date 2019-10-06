// Core
import { put, apply } from 'redux-saga/effects'
import { v4 } from 'uuid'

// Instruments
import { api } from '../../../../REST'
import { uiActions } from '../../../ui/actions'
import { filmsActions } from '../../actions'

export function* removeFilm({ payload: id }) {
    const spinnerId = v4()
    try {
        yield put(uiActions.addSpinning(spinnerId))
        const response = yield apply(api, api.films.remove, [id])
        if (response.status !== 204) {
            const { message } = yield apply(response, response.json)
            throw new Error(message)
        }
        yield put(filmsActions.removeFilm(id))
    } catch (error) {
        yield put(uiActions.emitError(error, 'removeFilm worker'))
    } finally {
        yield put(uiActions.removeSpinning(spinnerId))
    }
}
