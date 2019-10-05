import { MAIN_URL } from './config'

export const api = {
    films: {
        fetch() {
            return fetch(`${MAIN_URL}/films`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        },
        create(film) {
            return fetch(`${MAIN_URL}/films`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(film),
            })
        },
        update(film) {
            return fetch(`${MAIN_URL}/films/${film._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(film),
            })
        },
        remove(filmId) {
            return fetch(`${MAIN_URL}/films/${filmId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        },
    },
}
