// Core
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
// Reducers
import { uiReducer as ui } from '../bus/ui/reducer'
import { filmsReducer as films } from '../bus/films/reducer'

export const rootReducer = combineReducers({
    router,
    ui,
    films,
})
