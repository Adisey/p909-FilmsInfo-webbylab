import { type } from './types'
// import { v4 } from 'uuid';

export const uiActions = {
    emitError: (error, meta = null) => {
        return {
            type: type.EMIT_ERROR,
            payload: error,
            meta,
        }
    },
    addSpinning: id => {
        return {
            type: type.ADD_SPINNER,
            payload: id,
        }
    },
    removeSpinning: id => {
        return {
            type: type.REMOVE_SPINNER,
            payload: id,
        }
    },
}
