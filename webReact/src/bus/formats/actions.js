import { type } from './types'

// Instruments
// import { api } from '../../REST/';

export const formatsActions = {
    // Sync
    fillFormats: (formats) => {
        return {
            type: type.FILL_FORMATS,
            payload: formats,
        }
    },

    // Async
    fetchFormatsAsync: () => {
        return {
            type: type.FETCH_FORMATS_ASYNC,
        }
    },
}
