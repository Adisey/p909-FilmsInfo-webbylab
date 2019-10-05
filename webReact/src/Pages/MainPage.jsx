import React from 'react'
import Styles from './styles.less'
import { Catcher, ToolBar, LineSpinner, FilmsViewer } from '../Components'

function MainPage() {
    return (
        <Catcher>
            <LineSpinner />
            <div className={Styles.main}>
                <ToolBar />
                <FilmsViewer />
            </div>
        </Catcher>
    )
}

export default MainPage
