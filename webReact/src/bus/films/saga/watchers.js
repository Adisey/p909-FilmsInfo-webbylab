// Core
import { takeEvery, all, call } from 'redux-saga/effects'

// Types
import { type } from '../types'

// Workers
import { fetchFilms, removeFilm, updateFilm, createFilm } from './workers'

function* watcherFillFilms() {
    yield takeEvery(type.FETCH_FILMS_ASYNC, fetchFilms)
}
function* watcherUpdateFilm() {
    yield takeEvery(type.UPDATE_FILM_ASYNC, updateFilm)
}
function* watcherCrateFilm() {
    yield takeEvery(type.CREATE_FILM_ASYNC, createFilm)
}
function* watcherRemoveFilm() {
    yield takeEvery(type.REMOVE_FILM_ASYNC, removeFilm)
}
export function* watcherFilms() {
    yield all([
        call(watcherFillFilms),
        call(watcherRemoveFilm),
        call(watcherUpdateFilm),
        call(watcherCrateFilm),
    ])
}
