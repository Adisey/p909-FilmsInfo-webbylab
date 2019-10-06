import React from 'react'
import { connect } from 'react-redux'

// Components
import { Catcher } from '../..'
// Antd
import { Select } from 'antd'
const { Option } = Select
const mapStateToProps = (state) => {
    return {
        formats: state.formats,
    }
}

export default connect(mapStateToProps)(function FilmInputFormat(props) {
    const { value, changeFunc, formats } = props
    const _setNewFormatFilm = (value) => {
        if (changeFunc) {
            changeFunc(value)
        }
    }
    const makeOption = (y) => {
        return (
            <Option key={y} value={y}>
                {y}
            </Option>
        )
    }
    const optionJSX = formats.map((s) => makeOption(s.get('name')))
    return (
        <Catcher>
            <Select onChange={_setNewFormatFilm} defaultValue={value}>
                {optionJSX}
            </Select>
        </Catcher>
    )
})
