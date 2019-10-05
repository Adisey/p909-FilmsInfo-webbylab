import { type } from './types'

// Instruments
// import { api } from '../../REST/';

export const filmsActions = {
    // Sync
    fillFilms: (films) => {
        return {
            type: type.FILL_FILMS,
            payload: films,
        }
    },
    createFilm: (film) => {
        return {
            type: type.CREATE_FILM,
            payload: film,
        }
    },
    removeFilm: (filmId) => {
        return {
            type: type.REMOVE_FILM,
            payload: filmId,
        }
    },
    updateFilm: (updatedFilm) => {
        return {
            type: type.UPDATE_FILM,
            payload: updatedFilm,
        }
    },

    // Async
    fetchFilmsAsync: () => {
        return {
            type: type.FETCH_FILMS_ASYNC,
        }
    },
    createFilmAsync: (comment) => {
        return {
            type: type.CREATE_FILM_ASYNC,
            payload: comment,
        }
    },
    removeFilmAsync: (filmId) => {
        return {
            type: type.REMOVE_FILM_ASYNC,
            payload: filmId,
        }
    },
    updateFilmAsync: (updatedFilm) => {
        return {
            type: type.UPDATE_FILM_ASYNC,
            payload: updatedFilm,
        }
    },
}
