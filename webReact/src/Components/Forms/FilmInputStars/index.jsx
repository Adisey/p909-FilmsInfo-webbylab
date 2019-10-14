import React from 'react'
import { connect } from 'react-redux'

// Components
import { Catcher, instruments } from '../..'
// Antd
import { Select } from 'antd'
const { Option } = Select
const mapStateToProps = (state) => {
    return {
        stars: state.stars,
    }
}

export default connect(mapStateToProps)(function FilmInputStars(props) {
    const { value, changeFunc, stars } = props
    const valuesArr = value ? value.split(', ') : []
    const _setNewStarsFilm = (valuesArr) => {
        const newStars = instruments.uniqueItemsInArr(valuesArr).join(', ')
        if (changeFunc) {
            changeFunc(newStars)
        }
    }
    const makeOption = (y) => {
        return (
            <Option key={y} value={y}>
                {y}
            </Option>
        )
    }
    const optionJSX = stars.map((s) => makeOption(s.get('fullName')))
    return (
        <Catcher>
            <Select
                mode="tags"
                style={{ width: '100%' }}
                onChange={_setNewStarsFilm}
                defaultValue={valuesArr}
                tokenSeparators={[',']}
            >
                {optionJSX}
            </Select>
        </Catcher>
    )
})
