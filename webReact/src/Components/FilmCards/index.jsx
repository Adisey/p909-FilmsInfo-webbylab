import React from 'react'
// Styles
import cx from 'classnames'
import Styles from './styles.less'

export default function FilmCards(props) {
    const { films } = props
    const filmsJSX = films.map((f) => {
        return (
            <div key={f._id} className={Styles.card}>
                <FilmCard film={f} />
            </div>
        )
    })
    return <div className={Styles.main}>{filmsJSX}</div>
}

function FilmCard(props) {
    const { film } = props
    return (
        <>
            <div className={cx(Styles.titleFilms)}>{film.title}</div>
            <div className={cx(Styles.format, Styles.field)}>
                <div className={Styles.title}>Format:</div>
                <div className={Styles.content}>{film.format}</div>
            </div>
            <div className={cx(Styles.stars, Styles.field)}>
                <div className={Styles.title}>Stars:</div>
                <div className={Styles.content}>{film.stars}</div>
            </div>
        </>
    )
}
