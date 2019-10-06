//Core
import { all, call } from 'redux-saga/effects'

// Watchers
import { watcherFilms } from '../bus/films/saga/watchers'
import { watcherStars } from '../bus/stars/saga/watchers'
import { watcherFormats } from '../bus/formats/saga/watchers'

export function* rootSaga() {
    yield all([call(watcherFilms), call(watcherStars), call(watcherFormats)])
}
