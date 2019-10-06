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
            // Note: 135 сейчас просто подобрано, для текущих шапок, её можно рассчитать, но не сейчас
            this.setState({
                windowSizeHeight: window.innerHeight - 135,
            })
        }
        deleteItem = (id) => {
            console.log('deleteItem==(id)=>', id)
            this.props.actions.removeFilmAsync(id)
        }
        render() {
            console.log('==(this.props)=>', this.props)
            const { films, listFilterTitle, listFilterStar, isSpinning } = this.props
            const { windowSizeHeight } = this.state
            const data = films.map((f) => {
                const lightTitle = <LightSearchText text={f.title} searchText={listFilterTitle} />
                const lightStars = <LightSearchText text={f.stars} searchText={listFilterStar} />
                const _deleteItem = () => {
                    console.log('deleteItem==(id)=>', f._id)
                    this.deleteItem(f._id)
                }
                const actions = (
                    <ListToolBar deleteItem={_deleteItem} itemName={`"${f.title}" films`} />
                )
                return {
                    key: f._id,
                    title: lightTitle,
                    format: f.format,
                    releaseYear: f.releaseYear,
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
