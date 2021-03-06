import React from 'react'
// Components
import { Catcher } from '../..'
// Antd
import { Select } from 'antd'
const { Option } = Select

export default function FilmInputYear(props) {
    const { value, changeFunc } = props
    const _setNewYearFilm = (value) => {
        if (changeFunc) {
            changeFunc(value)
        }
    }
    const today = new Date()
    const nowYear = today.getFullYear()
    const makeOption = (y) => {
        return (
            <Option key={y} value={y}>
                {y}
            </Option>
        )
    }
    const optionJSX = []
    for (let i = nowYear; i > 1894; i--) {
        optionJSX.push(makeOption(i.toString()))
    }
    return (
        <Catcher>
            <Select
                showSearch
                placeholder="Year"
                defaultValue={value}
                style={{ width: '100%' }}
                optionFilterProp="children"
                onChange={_setNewYearFilm}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {optionJSX}
            </Select>
        </Catcher>
    )
}
