// Core
import React from 'react'
import { array } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// components
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
// Antd
import { Table } from 'antd'

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
    class FilmsTable extends React.Component {
        static propTypes = {
            films: array,
        }
        static defaultProps = {
            films: [],
        }
        constructor() {
            super()
            this.state = {
                windowSizeHeight: 0,
            }
            this.updateSize = this.updateSize.bind(this)
        }
        componentDidMount() {
            this.updateSize()
            window.addEventListener('resize', this.updateSize)
        }
        componentWillUnmount() {
            window.removeEventListener('resize', this.updateSize)
        }
        updateSize() {
            // Note: 128 сейчас просто подобрано, для текущих шапок, её можно рассчитать, но не сейчас )
            this.setState({
                windowSizeHeight: window.innerHeight - 128,
            })
        }
        deleteItem = (id) => {
            this.props.actions.removeFilmAsync(id)
        }
        setEditModeItem = (id) => {
            this.props.actions.setEditModeFilm(id)
        }
        setViewModeFilm = (id) => {
            this.props.actions.setViewModeFilm(id)
        }
        setNewTitleFilm = (id, title) => {
            this.props.actions.setNewTitleFilm(id, title)
        }
        setNewYearFilm = (id, year) => {
            this.props.actions.setNewYearFilm(id, year)
        }
        setNewStarsFilm = (id, stars) => {
            this.props.actions.setNewStarsFilm(id, stars)
        }
        setNewFormatFilm = (id, stars) => {
            this.props.actions.setNewFormatFilm(id, stars)
        }
        updateFilm = (film) => {
            this.props.actions.updateFilmAsync(film)
        }
        //
        render() {
            const { films, listFilterTitle, listFilterStar, isSpinning } = this.props
            const { windowSizeHeight } = this.state
            const data = films.map((film) => {
                const {
                    _id,
                    isEditMode,
                    title,
                    newTitle,
                    releaseYear,
                    newReleaseYear,
                    stars,
                    newStars,
                    format,
                    newFormat,
                } = film

                const lightTitle = <LightSearchText text={title} searchText={listFilterTitle} />
                const lightStars = <LightSearchText text={stars} searchText={listFilterStar} />
                const _deleteItem = () => {
                    this.deleteItem(_id)
                }
                const _setEditModeItem = () => {
                    this.setEditModeItem(_id)
                }
                const _setViewModeItem = () => {
                    this.setViewModeFilm(_id)
                }
                const _saveChangeItem = () => {
                    const film = {
                        _id: _id,
                        title: newTitle,
                        releaseYear: newReleaseYear,
                        stars: newStars,
                        format: newFormat,
                    }
                    this.updateFilm(film)
                }
                const _setNewTitleFilm = (value) => {
                    this.setNewTitleFilm(_id, value)
                }
                const _setNewYearFilm = (value) => {
                    this.setNewYearFilm(_id, value)
                }
                const _setNewStarsFilm = (value) => {
                    this.setNewStarsFilm(_id, value)
                }
                const _setNewFormatFilm = (value) => {
                    this.setNewFormatFilm(_id, value)
                }
                const isValidChange = !!newTitle
                const actions = (
                    <ListToolBar
                        deleteItem={_deleteItem}
                        itemName={`"${title}" films`}
                        itemNewName={`"${isEditMode && newTitle ? newTitle : title}" films`}
                        setEditMode={_setEditModeItem}
                        setViewMode={_setViewModeItem}
                        isEditMode={isEditMode}
                        isValidChange={isValidChange}
                        saveChangeItem={_saveChangeItem}
                    />
                )
                return {
                    key: _id,
                    title: isEditMode ? (
                        <FilmInputTitle value={newTitle} changeFunc={_setNewTitleFilm} />
                    ) : (
                        lightTitle
                    ),
                    releaseYear: isEditMode ? (
                        <FilmInputYear value={newReleaseYear} changeFunc={_setNewYearFilm} />
                    ) : (
                        releaseYear
                    ),
                    format: isEditMode ? (
                        <FilmInputFormat value={newFormat} changeFunc={_setNewFormatFilm} />
                    ) : (
                        format
                    ),
                    //
                    stars: isEditMode ? (
                        <FilmInputStars value={newStars} changeFunc={_setNewStarsFilm} />
                    ) : (
                        lightStars
                    ),
                    actions: actions,
                }
            })
            const columns = [
                {
                    title: 'Actions',
                    dataIndex: 'actions',
                    className: cx(Styles.actions),
                },
                {
                    title: 'Year',
                    dataIndex: 'releaseYear',
                    className: cx(Styles.releaseYear),
                },
                {
                    title: 'Title',
                    dataIndex: 'title',
                    className: cx(Styles.columnTitle),
                },
                {
                    title: 'Format',
                    dataIndex: 'format',
                    className: cx(Styles.format),
                },
                {
                    title: 'Stars',
                    dataIndex: 'stars',
                    className: cx(Styles.stars),
                },
            ]
            return (
                <Catcher>
                    <div className={Styles.main}>
                        <Table
                            columns={columns}
                            dataSource={data}
                            pagination={false}
                            className={cx(Styles.table)}
                            // onChange={this.handleTableChange}
                            loading={isSpinning}
                            scroll={{ y: windowSizeHeight }}
                        />
                    </div>
                </Catcher>
            )
        }
    }
)
