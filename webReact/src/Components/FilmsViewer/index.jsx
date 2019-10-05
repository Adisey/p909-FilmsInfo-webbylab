// Core
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// AntD
import { Spin } from 'antd'
// Components
import { Catcher, FilmCards } from '../'
// Styles
import Styles from './styles.less'
// Actions
import { uiActions } from '../../bus/ui/actions'
import { filmsActions } from '../../bus/films/actions'

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...uiActions, ...filmsActions }, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        isSpinning: state.ui.get('isSpinning'),
        listViewMode: state.ui.get('listViewMode'),
        listSortOrder: state.ui.get('listSortOrder'),
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
        }
        aaa = () => {
            this.props.actions.fetchFilmsAsync()
        }
        render() {
            const { isSpinning, films, listSortOrder } = this.props
            let filmsJS = films.toJS()
            if (listSortOrder) {
                const sortTitle = (a, b) => {
                    const aT = listSortOrder === 'asc' ? a.title : b.title
                    const bT = listSortOrder === 'asc' ? b.title : a.title
                    return aT < bT ? -1 : 1
                }
                filmsJS.sort(sortTitle)
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
                                <FilmCards films={filmsJS} />
                            </div>
                        </Spin>
                    </div>
                </Catcher>
            )
        }
    }
)
