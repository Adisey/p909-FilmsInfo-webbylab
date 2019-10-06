import React from 'react'
// Components
import { Catcher } from '../..'
// Styles
import cx from 'classnames'
import Styles from './styles.less'
// Antd
import { Input } from 'antd'

export default function FilmInputTitle(props) {
    const { value, changeFunc } = props
    const _setNewTitleFilm = (e) => {
        const { value } = e.target
        if (changeFunc) {
            changeFunc(value)
        }
    }
    return (
        <Catcher>
            <div className={Styles.main}>
                <Input
                    placeholder="Title"
                    value={value || ''}
                    onChange={_setNewTitleFilm}
                    allowClear
                    className={cx(value ? Styles.validInput : Styles.invalidInput)}
                />
            </div>
        </Catcher>
    )
}
