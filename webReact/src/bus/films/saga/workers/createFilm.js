// Core
import { put, apply } from 'redux-saga/effects'
import { v4 } from 'uuid'

// Instruments
import { api } from '../../../../REST'
import { uiActions } from '../../../ui/actions'
import { filmsActions } from '../../actions'

export function* createFilm({ payload }) {
    const spinnerId = v4()
    try {
        yield put(uiActions.addSpinning(spinnerId))
        const oldId = payload.id
        const response = yield apply(api, api.films.create, [payload])
        const { data } = yield apply(response, response.json)
        if (response.status !== 201) {
            const { message } = yield apply(response, response.json)
            throw new Error(message)
        }
        data.oldId = oldId
        yield put(filmsActions.replaceNewFilm(data))
    } catch (error) {
        yield put(uiActions.emitError(error, 'createFilm worker'))
    } finally {
        yield put(uiActions.removeSpinning(spinnerId))
    }
}
