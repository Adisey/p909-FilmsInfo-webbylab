// Core
import { takeEvery, all, call } from 'redux-saga/effects'

// Types
import { type } from '../types'

// Workers
import { fetchFormats } from './workers'

function* watcherFillFormats() {
    yield takeEvery(type.FETCH_FORMATS_ASYNC, fetchFormats)
}
export function* watcherFormats() {
    yield all([call(watcherFillFormats)])
}
