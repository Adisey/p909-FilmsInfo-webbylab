// Core
import { takeEvery, all, call } from 'redux-saga/effects'

// Types
import { type } from '../types'

// Workers
import {
    fetchFilms,
    removeFilm,
    // createFilm,
} from './workers'

function* watcherFillFilms() {
    yield takeEvery(type.FETCH_FILMS_ASYNC, fetchFilms)
}
// function* watcherCrateFilm() {
//     yield takeEvery(type.CREATE_FILM_ASYNC, createFilm)
// }
function* watcherRemoveFilm() {
    yield takeEvery(type.REMOVE_FILM_ASYNC, removeFilm)
}
export function* watcherFilms() {
    yield all([
        call(watcherFillFilms),
        call(watcherRemoveFilm),
        // call(watcherCrateFilm),
    ])
}
