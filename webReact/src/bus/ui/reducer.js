// Core
import { fromJS } from 'immutable'
// Types
import { type } from './types'

const initialState = fromJS({
    isSpinning: false,
    spinners: [],
    listViewMode: 'table',
    listSortOrder: void 0,
    listFilterTitle: '',
    listFilterStar: '',
})

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_SPINNER: {
            const _addSpinner = state.update('spinners', (_spinners) =>
                _spinners.push(action.payload)
            )

            return _addSpinner.set('isSpinning', !!_addSpinner.get('spinners').size)
        }
        case type.REMOVE_SPINNER: {
            const _removeSpinner = state.update('spinners', (_spinners) => {
                return _spinners.filter((sp) => sp !== action.payload)
            })

            return _removeSpinner.set('isSpinning', !!_removeSpinner.get('spinners').size)
        }
        case type.SET_LIST_VIEW_MODE: {
            return state.set('listViewMode', action.payload)
        }
        case type.SET_LIST_SORT_ORDER: {
            return state.set('listSortOrder', action.payload)
        }
        case type.SET_LIST_FILTER_TITLE: {
            return state.set('listFilterTitle', action.payload)
        }
        case type.SET_LIST_FILTER_STAR: {
            return state.set('listFilterStar', action.payload)
        }
        default:
            return state
    }
}
