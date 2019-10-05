import React from 'react'
// Styles
import Styles from './styles.less'

export default function LightSearchText(props) {
    const { text, searchText } = props
    if (!props) {
        return null
    }
    if (!searchText) {
        return <>{text}</>
    }

    const rEst = new RegExp(`${searchText}`, 'ig')
    const arr = text.replace(rEst, (ft) => {
        return `<~>${ft}<~>`
    })
    const els = arr.split('<~>').map((el, i) =>
        el.toLowerCase() === searchText.toLowerCase() ? (
            <span key={i} className={Styles.lightText}>
                {el}
            </span>
        ) : (
            el
        )
    )
    return <>{els}</>
}
