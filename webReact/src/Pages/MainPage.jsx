import React from 'react'
import Styles from './styles.less'
import { Catcher, ToolBar, LineSpinner } from '../Components'

function MainPage() {
    return (
        <Catcher>
            <LineSpinner />
            <div className={Styles.main}>
                <ToolBar />
            </div>
        </Catcher>
    )
}

export default MainPage
