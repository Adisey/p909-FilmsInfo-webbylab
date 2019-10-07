// Core
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// AntD
import { Spin } from 'antd'
// Components
import { Catcher, FilmCards, FilmTable } from '../'
// Styles
import Styles from './styles.less'
// Actions
import { uiActions } from '../../bus/ui/actions'
import { filmsActions } from '../../bus/films/actions'
import { starsActions } from '../../bus/stars/actions'
import { formatsActions } from '../../bus/formats/actions'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(
            {
                ...uiActions,
                ...filmsActions,
                ...starsActions,
                ...formatsActions,
            },
            dispatch
        ),
    }
}

const mapStateToProps = (state) => {
    return {
        isSpinning: state.ui.get('isSpinning'),
        listViewMode: state.ui.get('listViewMode'),
        listSortOrder: state.ui.get('listSortOrder'),
        listFilterTitle: state.ui.get('listFilterTitle'),
        listFilterStar: state.ui.get('listFilterStar'),
        films: state.films,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class FilmsViewer extends React.PureComponent {
        componentDidMount() {
            this.props.actions.fetchFilmsAsync()
            this.props.actions.fetchStarsAsync()
            this.props.actions.fetchFormatsAsync()
        }
        render() {
            const {
                isSpinning,
                films,
                listSortOrder,
                listFilterTitle,
                listFilterStar,
                listViewMode,
            } = this.props
            let filmsJS = films.toJS()
            if (listFilterTitle) {
                filmsJS = filmsJS.filter((f) =>
                    f.title.toUpperCase().includes(listFilterTitle.toUpperCase())
                )
            }
            if (listFilterStar) {
                filmsJS = filmsJS.filter((f) =>
                    f.stars.toUpperCase().includes(listFilterStar.toUpperCase())
                )
            }
            if (listSortOrder) {
                const sortTitle = (a, b) => {
                    const aT = listSortOrder === 'asc' ? a.title : b.title
                    const bT = listSortOrder === 'asc' ? b.title : a.title
                    return aT < bT ? -1 : 1
                }
                filmsJS = filmsJS.sort(sortTitle)
            }
            return (
                <Catcher>
                    <div className={Styles.main}>
                        <Spin
                            spinning={isSpinning}
                            delay={300}
                            size={'large'}
                            tip={'Loading...'}
                            wrapperClassName={Styles.spinContainer}
                        >
                            <div className={Styles.listContainer}>
                                {listViewMode === 'table' ? (
                                    <FilmTable
                                        films={filmsJS}
                                        listFilterTitle={listFilterTitle}
                                        listFilterStar={listFilterStar}
                                    />
                                ) : (
                                    <FilmCards
                                        films={filmsJS}
                                        listFilterTitle={listFilterTitle}
                                        listFilterStar={listFilterStar}
                                    />
                                )}
                            </div>
                        </Spin>
                    </div>
                </Catcher>
            )
        }
    }
)
