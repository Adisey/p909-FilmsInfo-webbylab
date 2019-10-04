import React from 'react'
import ReactDOM from 'react-dom'
import App from './App/App'
import * as serviceWorker from './serviceWorker'
// Redux
import { Provider } from 'react-redux'
import { Router } from 'react-router'
// Store
import { store } from './init/store'
import { history } from './init/middleware/core'
// AntD
import { LocaleProvider } from 'antd'
import ruRU from 'antd/lib/locale-provider/ru_RU'
// Styles
import './index.css'
// ANT.D Styles
import 'antd/dist/antd.css'

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <LocaleProvider locale={ruRU}>
                <App />
            </LocaleProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
