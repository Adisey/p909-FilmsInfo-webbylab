// Core
import React from 'react'
import { string, array } from 'prop-types'
// components
import { LightSearchText, Catcher } from '..'
// Styles
import cx from 'classnames'
import Styles from './styles.less'
// Antd
import { Table } from 'antd'

export default class FilmsTable extends React.Component {
    static propTypes = {
        films: array,
        listFilterTitle: string,
        listFilterStar: string,
    }
    static defaultProps = {
        films: [],
        listFilterTitle: '',
        listFilterStar: '',
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
    render() {
        const { films, listFilterTitle, listFilterStar } = this.props
        const { windowSizeHeight } = this.state
        const columns = [
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
        const data = films.map((f) => {
            const lightTitle = <LightSearchText text={f.title} searchText={listFilterTitle} />
            const lightStars = <LightSearchText text={f.stars} searchText={listFilterStar} />
            return {
                key: f._id,
                title: lightTitle,
                format: f.format,
                releaseYear: f.releaseYear,
                stars: lightStars,
            }
        })
        return (
            <Catcher>
                <div className={Styles.main}>
                    <Table
                        columns={columns}
                        dataSource={data}
                        pagination={false}
                        className={cx(Styles.table)}
                        // onChange={this.handleTableChange}
                        scroll={{ y: windowSizeHeight }}
                    />
                </div>
            </Catcher>
        )
    }
}
