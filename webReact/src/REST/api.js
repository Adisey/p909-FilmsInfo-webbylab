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
                method: 'PUT',
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
    stars: {
        fetch() {
            return fetch(`${MAIN_URL}/stars`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        },
    },
    formats: {
        fetch() {
            return fetch(`${MAIN_URL}/formats`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        },
    },
    file: {
        upload(file) {
            return fetch(`${MAIN_URL}/uploadfile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: file }),
            })
        },
    },
}
