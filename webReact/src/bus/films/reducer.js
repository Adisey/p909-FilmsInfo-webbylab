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
        case type.SET_EDIT_MODE_FILM:
            return state.map((film) => {
                if (film.get('_id') !== action.payload) {
                    return film
                } else {
                    return film
                        .set('isEditMode', true)
                        .set('newTitle', film.get('title'))
                        .set('newFormat', film.get('format'))
                        .set('newReleaseYear', film.get('releaseYear'))
                        .set('newStars', film.get('stars'))
                }
            })
        case type.SET_VIEW_MODE_FILM:
            return state.map((film) => {
                if (film.get('_id') !== action.payload) {
                    return film
                } else {
                    return film.set('isEditMode', false)
                }
            })
        case type.SET_NEW_TITLE_FILM:
            return state.map((film) => {
                const { id, title } = action.payload
                if (film.get('_id') !== id) {
                    return film
                } else {
                    return film.set('newTitle', title)
                }
            })

        // format, releaseYear, isEditMode, title, stars

        case type.UPDATE_FILM:
            return state.map((film) =>
                film.get('_id') !== action.payload._id ? film : fromJS(action.payload)
            )
        default:
            return state
    }
}
