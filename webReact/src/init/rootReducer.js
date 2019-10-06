// Core
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
// Reducers
import { uiReducer as ui } from '../bus/ui/reducer'
import { filmsReducer as films } from '../bus/films/reducer'
import { starsReducer as stars } from '../bus/stars/reducer'
import { formatsReducer as formats } from '../bus/formats/reducer'

export const rootReducer = combineReducers({
    router,
    ui,
    films,
    stars,
    formats,
})
