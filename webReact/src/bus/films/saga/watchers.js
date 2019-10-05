/**
 * Created by PhpStorm
 * Project p501-redux-online-intensive
 * User: Adisey
 * Date: 05.08.2018
 * Time: 11:29
 */

// Core
import { takeEvery, all, call } from 'redux-saga/effects'

// Types
import { type } from '../types'

// Workers
import {
    fetchFilms,
    // createFilm,
    // removeFilm
} from './workers'

function* watcherFillFilms() {
    yield takeEvery(type.FETCH_FILMS_ASYNC, fetchFilms)
}
// function* watcherCrateFilm() {
//     yield takeEvery(type.CREATE_FILM_ASYNC, createFilm)
// }
// function* watcherRemoveFilm() {
//     yield takeEvery(type.REMOVE_FILM_ASYNC, removeFilm)
// }
export function* watcherFilms() {
    yield all([
        call(watcherFillFilms),
        // call(watcherCrateFilm),
        // call(watcherRemoveFilm)
    ])
}
