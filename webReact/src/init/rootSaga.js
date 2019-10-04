//Core
import { all } from 'redux-saga/effects'

// Watchers
// import { watchAuth } from '../bus/auth/saga/watchers';
// import { watchProfile } from '../bus/profile/saga/watchers';
// import { watchPatients } from '../bus/patients/saga/watchers';

export function* rootSaga() {
    yield all([
        // call(watchAuth),
        // call(watchProfile),
        // call(watchPatients)
    ])
}
