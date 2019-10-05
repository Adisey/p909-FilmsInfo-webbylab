// Core
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// AntD
import { Button, Input, Radio, Icon } from 'antd'
// Styles
import cx from 'classnames'
import Styles from './styles.less'
// Actions
import { uiActions } from '../../bus/ui/actions'
import { filmsActions } from '../../bus/films/actions'

const ButtonGroup = Button.Group

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ ...uiActions, ...filmsActions }, dispatch),
    }
}

const mapStateToProps = (state) => {
    return {
        isSpinning: state.ui.get('isSpinning'),
        listViewMode: state.ui.get('listViewMode'),
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
        render() {
            console.log('FilmsViewer', this.props)
            return <div className={Styles.main}>dkslkdflkslkdjflks</div>
        }
    }
)
