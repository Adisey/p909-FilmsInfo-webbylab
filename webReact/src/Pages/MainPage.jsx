import React from 'react'
import Styles from './styles.less'
import { Catcher, Test1, LineSpinner } from '../Components'

function MainPage() {
    return (
        <Catcher>
            <div className={Styles.main}>
                START
                <Test1 />
            </div>
            <LineSpinner />
        </Catcher>
    )
}

export default MainPage
