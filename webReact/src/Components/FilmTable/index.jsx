// Core
import React from 'react'
import { array } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// components
import { LightSearchText, Catcher, ListToolBar } from '..'
// Styles
import cx from 'classnames'
import Styles from './styles.less'
// Antd
import { Table, Input } from 'antd'

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
        setViewModeItem = (id) => {
            this.props.actions.setViewModeFilm(id)
        }
        setNewTitleFilm = (id, title) => {
            this.props.actions.setNewTitleFilm(id, title)
        }
        render() {
            console.log('==(this.props)=>', this.props)
            const { films, listFilterTitle, listFilterStar, isSpinning } = this.props
            const { windowSizeHeight } = this.state
            const data = films.map((film) => {
                const { _id, format, releaseYear, isEditMode, title, newTitle, stars } = film

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
                    console.log('==(_saveChangeItem)=>', 1111)
                }
                const _setNewTitleFilm = (e) => {
                    const { value } = e.target
                    console.log('==(title)=>', value)
                    this.setNewTitleFilm(_id, value)
                }
                const TitleInput = () => {
                    return (
                        <Input
                            placeholder="Title"
                            value={newTitle}
                            onChange={_setNewTitleFilm}
                            allowClear
                            className={cx(newTitle ? Styles.validInput : Styles.invalidInput)}
                        />
                    )
                }

                const actions = (
                    <ListToolBar
                        deleteItem={_deleteItem}
                        itemName={`"${title}" films`}
                        setEditMode={_setEditModeItem}
                        setViewMode={_setViewModeItem}
                        isEditMode={isEditMode}
                        isValidChange={newTitle}
                        saveChangeItem={_saveChangeItem}
                    />
                )
                return {
                    key: _id,
                    title: isEditMode ? <TitleInput /> : lightTitle,
                    format: format,
                    releaseYear: releaseYear,
                    stars: lightStars,
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
