// Core
import { fromJS } from 'immutable'
// Types
import { type } from './types'

const initialState = fromJS({
    isSpinning: 0,
    spinners: [],
})

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_SPINNER: {
            const _addSpinner = state.update('spinners', _spinners => _spinners.push(action.payload))

            return _addSpinner.set('isSpinning', _addSpinner.get('spinners').size)
        }
        case type.REMOVE_SPINNER: {
            const _removeSpinner = state.update('spinners', _spinners => {
                return _spinners.filter(sp => sp !== action.payload)
            })

            return _removeSpinner.set('isSpinning', _removeSpinner.get('spinners').size)
        }
        default:
            return state
    }
}
