//Core
import { fromJS, List } from 'immutable'

// Instruments
import { type } from './types'

const initialState = List()

export const formatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FILL_FORMATS:
            return fromJS(action.payload)
        default:
            return state
    }
}
