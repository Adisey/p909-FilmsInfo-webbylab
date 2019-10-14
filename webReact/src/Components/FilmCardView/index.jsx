import React from 'react'
import { object } from 'prop-types'

import { Catcher } from '..'
// Styles
import cx from 'classnames'
import Styles from './styles.less'
// Actions

export default class FilmCardView extends React.Component {
    static propTypes = {
        film: object.isRequired,
    }

    render() {
        const { film } = this.props
        return (
            <Catcher>
                <div className={Styles.mainCard}>
                    <div className={cx(Styles.field)}>
                        <div className={Styles.title}>Year:</div>
                        <div className={Styles.content}>{film.releaseYear}</div>
                    </div>
                    <div className={cx(Styles.format, Styles.field)}>
                        <div className={Styles.title}>Format:</div>
                        <div className={Styles.content}>{film.format}</div>
                    </div>
                    <div className={cx(Styles.stars, Styles.field)}>
                        <div className={Styles.title}>Stars:</div>
                        <div className={Styles.content}>{film.stars}</div>
                    </div>
                </div>
            </Catcher>
        )
    }
}
