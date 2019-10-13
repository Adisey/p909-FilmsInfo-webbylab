import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
    LightSearchText,
    Catcher,
    ListToolBar,
    FilmInputTitle,
    FilmInputYear,
    FilmInputStars,
    FilmInputFormat,
} from '..'
// Styles
import cx from 'classnames'
import Styles from './styles.less'
// Actions
import { filmsActions } from '../../bus/films/actions'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                ...filmsActions,
            },
            dispatch
        ),
    }
}

const mapStateToProps = (state) => {
    return {
        isSpinning: state.ui.get('isSpinning'),
        listFilterTitle: state.ui.get('listFilterTitle'),
        listFilterStar: state.ui.get('listFilterStar'),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class FilmCard extends React.Component {
        render() {
            const { film, listFilterTitle, listFilterStar } = this.props
            console.log('==(props)=>', this.props)
            const lightTitle = <LightSearchText text={film.title} searchText={listFilterTitle} />
            const lightStars = <LightSearchText text={film.stars} searchText={listFilterStar} />
            const _deleteItem = () => {
                this.props.actions.removeFilmAsync(film._id)
            }
            const _setEditModeItem = () => {
                this.props.actions.setEditModeFilm(film._id)
            }
            const _setViewModeItem = () => {
                this.props.actions.setViewModeFilm(film._id)
            }
            const _saveChangeItem = () => {
                const editFilm = {
                    _id: film._id,
                    title: film.newTitle,
                    releaseYear: film.newReleaseYear,
                    stars: film.newStars,
                    format: film.newFormat,
                }
                this.props.actions.updateFilmAsync(editFilm)
            }
            const _createFilm = () => {
                const editFilm = {
                    id: film._id,
                    title: film.newTitle,
                    releaseYear: film.newReleaseYear,
                    stars: film.newStars,
                    format: film.newFormat,
                }
                this.props.actions.createFilmAsync(editFilm)
            }

            const _setNewTitleFilm = (value) => {
                this.props.actions.setNewTitleFilm(film._id, value)
            }
            const _setNewYearFilm = (value) => {
                this.props.actions.setNewYearFilm(film._id, value)
            }
            const _setNewStarsFilm = (value) => {
                this.props.actions.setNewStarsFilm(film._id, value)
            }
            const _setNewFormatFilm = (value) => {
                this.props.actions.setNewFormatFilm(film._id, value)
            }
            const isValidChange = !!film.newTitle

            return (
                <Catcher>
                    <div className={cx(Styles.titleFilms)}>
                        {film.isEditMode ? (
                            <FilmInputTitle value={film.newTitle} changeFunc={_setNewTitleFilm} />
                        ) : (
                            lightTitle
                        )}
                    </div>
                    <div className={cx(Styles.format, Styles.field)}>
                        <div className={Styles.title}>Year:</div>
                        <div className={cx(film.isEditMode ? Styles.editContent : Styles.content)}>
                            {film.isEditMode ? (
                                <FilmInputYear
                                    value={film.newReleaseYear}
                                    changeFunc={_setNewYearFilm}
                                />
                            ) : (
                                film.releaseYear
                            )}
                        </div>
                    </div>
                    <div className={cx(Styles.format, Styles.field)}>
                        <div className={Styles.title}>Format:</div>
                        <div className={cx(film.isEditMode ? Styles.editContent : Styles.content)}>
                            {film.isEditMode ? (
                                <FilmInputFormat
                                    value={film.newFormat}
                                    changeFunc={_setNewFormatFilm}
                                />
                            ) : (
                                film.format
                            )}
                        </div>
                    </div>
                    <div className={cx(Styles.stars, Styles.field)}>
                        <div className={Styles.title}>Stars:</div>
                        <div className={cx(film.isEditMode ? Styles.editContent : Styles.content)}>
                            {film.isEditMode ? (
                                <FilmInputStars
                                    value={film.newStars}
                                    changeFunc={_setNewStarsFilm}
                                />
                            ) : (
                                lightStars
                            )}
                        </div>
                    </div>
                    <div className={cx(Styles.footerFilms, Styles.field)}>
                        <ListToolBar
                            deleteItem={_deleteItem}
                            itemName={`"${film.title}" films`}
                            itemNewName={`"${
                                film.isEditMode && film.newTitle ? film.newTitle : film.title
                            }" films`}
                            setEditMode={_setEditModeItem}
                            setViewMode={_setViewModeItem}
                            isEditMode={film.isEditMode}
                            isValidChange={isValidChange}
                            saveChangeItem={film.isNew ? _createFilm : _saveChangeItem}
                        />
                    </div>
                </Catcher>
            )
        }
    }
)
