//Core
import { fromJS, List } from 'immutable'

// Instruments
import { type } from './types'

const initialState = List()

export const filmsReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.FILL_FILMS:
            return fromJS(action.payload)
        case type.CREATE_FILM:
            return state.unshift(fromJS(action.payload))
        case type.REMOVE_FILM:
            return state.filter((film) => film.get('_id') !== action.payload)
        case type.UPDATE_FILM:
            return state.map((film) =>
                film.get('_id') !== action.payload._id ? film : fromJS(action.payload)
            )
        default:
            return state
    }
}
