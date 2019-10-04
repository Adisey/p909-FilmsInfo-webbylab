// Core
import React from 'react'
import { connect } from 'react-redux'

// Styles
import './styles.css'

const mapStateToProps = state => {
    return {
        isSpinning: state.ui.get('isSpinning'),
    }
}

export default connect(mapStateToProps)(
    class LineSpinner extends React.PureComponent {
        render() {
            const { isSpinning } = this.props
            const wLine = { width: `${100 / isSpinning}%` }

            return isSpinning ? (
                <div className={'spinner'}>{isSpinning ? <div className={'line'} style={wLine} /> : null}</div>
            ) : null
        }
    }
)
