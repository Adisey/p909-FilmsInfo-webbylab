import React from 'react'
import { LightSearchText } from '../'
// Styles
import cx from 'classnames'
import Styles from './styles.less'

export default function FilmCards(props) {
    const { films, listFilterTitle, listFilterStar } = props
    const filmsJSX = films.map((film) => {
        return (
            <div key={film._id} className={Styles.card}>
                <FilmCard
                    film={film}
                    listFilterTitle={listFilterTitle}
                    listFilterStar={listFilterStar}
                />
            </div>
        )
    })
    return <div className={Styles.main}>{filmsJSX}</div>
}

function FilmCard(props) {
    const { film, listFilterTitle, listFilterStar } = props
    const lightTitle = <LightSearchText text={film.title} searchText={listFilterTitle} />
    const lightStars = <LightSearchText text={film.stars} searchText={listFilterStar} />
    return (
        <>
            <div className={cx(Styles.titleFilms)}>{lightTitle}</div>
            <div className={cx(Styles.format, Styles.field)}>
                <div className={Styles.title}>Format:</div>
                <div className={Styles.content}>{film.format}</div>
            </div>
            <div className={cx(Styles.stars, Styles.field)}>
                <div className={Styles.title}>Stars:</div>
                <div className={Styles.content}>{lightStars}</div>
            </div>
        </>
    )
}
