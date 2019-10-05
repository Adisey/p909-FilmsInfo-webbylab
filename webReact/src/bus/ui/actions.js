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
    addSpinning: (id) => {
        return {
            type: type.ADD_SPINNER,
            payload: id,
        }
    },
    removeSpinning: (id) => {
        return {
            type: type.REMOVE_SPINNER,
            payload: id,
        }
    },
    setListViewMode: (mode) => {
        return {
            type: type.SET_LIST_VIEW_MODE,
            payload: mode,
        }
    },
    setListSortOrder: (order) => {
        return {
            type: type.SET_LIST_SORT_ORDER,
            payload: order,
        }
    },
    setListFilterTitle: (title) => {
        return {
            type: type.SET_LIST_FILTER_TITLE,
            payload: title,
        }
    },
    setListFilterStar: (star) => {
        return {
            type: type.SET_LIST_FILTER_STAR,
            payload: star,
        }
    },
}
