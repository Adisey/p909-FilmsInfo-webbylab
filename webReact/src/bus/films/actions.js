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
    createFilm: () => {
        return {
            type: type.CREATE_FILM,
        }
    },
    removeFilm: (filmId) => {
        return {
            type: type.REMOVE_FILM,
            payload: filmId,
        }
    },
    replaceFilm: (updatedFilm) => {
        return {
            type: type.UPDATE_FILM,
            payload: updatedFilm,
        }
    },
    replaceNewFilm: (updatedFilm) => {
        return {
            type: type.UPDATE_NEW_FILM,
            payload: updatedFilm,
        }
    },
    setEditModeFilm: (filmId) => {
        return {
            type: type.SET_EDIT_MODE_FILM,
            payload: filmId,
        }
    },
    setViewModeFilm: (filmId) => {
        return {
            type: type.SET_VIEW_MODE_FILM,
            payload: filmId,
        }
    },
    setNewTitleFilm: (id, title) => {
        return {
            type: type.SET_NEW_TITLE_FILM,
            payload: { id, title },
        }
    },
    setNewYearFilm: (id, year) => {
        return {
            type: type.SET_NEW_YEAR_FILM,
            payload: { id, year },
        }
    },
    setNewFormatFilm: (id, format) => {
        return {
            type: type.SET_NEW_FORMAT_FILM,
            payload: { id, format },
        }
    },
    setNewStarsFilm: (id, stars) => {
        return {
            type: type.SET_NEW_STARS_FILM,
            payload: { id, stars },
        }
    },

    // Async
    fetchFilmsAsync: () => {
        return {
            type: type.FETCH_FILMS_ASYNC,
        }
    },
    createFilmAsync: (film) => {
        return {
            type: type.CREATE_FILM_ASYNC,
            payload: film,
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
