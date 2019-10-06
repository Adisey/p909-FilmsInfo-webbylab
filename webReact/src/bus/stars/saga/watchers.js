// Core
import { takeEvery, all, call } from 'redux-saga/effects'

// Types
import { type } from '../types'

// Workers
import { fetchStars } from './workers'

function* watcherFillStars() {
    yield takeEvery(type.FETCH_STARS_ASYNC, fetchStars)
}
export function* watcherStars() {
    yield all([call(watcherFillStars)])
}
