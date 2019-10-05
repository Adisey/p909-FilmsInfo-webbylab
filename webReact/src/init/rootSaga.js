//Core
import { all, call } from 'redux-saga/effects'

// Watchers
import { watcherFilms } from '../bus/films/saga/watchers'

export function* rootSaga() {
    yield all([
        call(watcherFilms),
        // call(watchProfile),
        // call(watchPatients)
    ])
}
