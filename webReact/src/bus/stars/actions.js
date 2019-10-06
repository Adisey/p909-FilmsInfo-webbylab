import { type } from './types'

// Instruments
// import { api } from '../../REST/';

export const starsActions = {
    // Sync
    fillStars: (stars) => {
        return {
            type: type.FILL_STARS,
            payload: stars,
        }
    },

    // Async
    fetchStarsAsync: () => {
        return {
            type: type.FETCH_STARS_ASYNC,
        }
    },
}
