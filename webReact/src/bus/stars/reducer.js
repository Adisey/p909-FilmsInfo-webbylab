//Core
import { fromJS, List } from 'immutable'

// Instruments
import { type } from './types'

const initialState = List()

export const starsReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FILL_STARS:
            return fromJS(action.payload)
        default:
            return state
    }
}
