// Core
import { put, call, apply } from 'redux-saga/effects'
import { v4 } from 'uuid'

// Instruments
import { api } from '../../../../REST'
import { uiActions } from '../../../ui/actions'
import { filmsActions } from '../../actions'

export function* fetchFilms() {
    const spinnerId = v4()
    try {
        yield put(uiActions.addSpinning(spinnerId))
        const response = yield apply(api, api.films.fetch)
        const { data, message } = yield apply(response, response.json)

        if (response.status !== 200) {
            throw new Error(message)
        }
        yield put(filmsActions.fillFilms(data))
    } catch (error) {
        yield put(uiActions.emitError(error, 'fetchFilms worker'))
    } finally {
        yield put(uiActions.removeSpinning(spinnerId))
    }
}
