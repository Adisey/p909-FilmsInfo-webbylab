import React from 'react'
// Components
import { Catcher } from '../'
import FilmCard from './FilmCard'
// Styles
import Styles from './styles.less'

export default function FilmCards(props) {
    const { films } = props
    const filmsJSX = films.map((film) => {
        return (
            <div key={film._id} className={Styles.card}>
                <FilmCard film={film} />
            </div>
        )
    })
    return (
        <Catcher>
            <div className={Styles.main}>{filmsJSX}</div>
        </Catcher>
    )
}
