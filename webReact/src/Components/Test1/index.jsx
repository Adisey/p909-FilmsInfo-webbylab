// Core
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// AntD
import { Button, Spin } from 'antd'
// Styles
import cx from 'classnames'
import Styles from './styles.less'
// Actions
import { uiActions } from '../../bus/ui/actions'

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({ ...uiActions }, dispatch),
    }
}

const mapStateToProps = state => {
    return {
        isSpinning: state.ui.get('isSpinning'),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class Test1 extends React.PureComponent {
        _setSpin = () => {
            const addSpinning = this.props.actions.addSpinning
            addSpinning()
        }
        render() {
            const { isSpinning } = this.props
            return (
                <div className={Styles.main}>
                    <Button type="primary" onClick={this._setSpin}>
                        Test1
                    </Button>
                    {isSpinning ? <Spin /> : null}
                    <div className={Styles.container1}>
                        <div className={Styles.item}>1</div>
                        <div className={cx(Styles.item, Styles.itemViolets)}>2</div>
                    </div>
                </div>
            )
        }
    }
)
