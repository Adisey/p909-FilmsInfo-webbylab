import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { v4 } from 'uuid'

import { Catcher, instruments } from '..'
// Styles
import cx from 'classnames'
import Styles from './styles.less'
// Antd
import { Button, Upload } from 'antd'

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
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class UploadFile extends React.Component {
        state = {
            file: '',
            spinnerId: '',
        }
        loadFileInMemory = async ({ onSuccess, onError, file }) => {
            const newFile = await await instruments.fileBlob2Base64(file)
            await this.props.actions.uploadFileAsync(newFile)
            this.props.actions.fetchFilmsAsync()
            this.props.actions.fetchStarsAsync()
            this.props.actions.fetchFormatsAsync()
            const { spinnerId } = this.state
            this.props.actions.removeSpinning(spinnerId)
        }
        changeStatusUpload = (info) => {
            if (info.file.status === 'uploading') {
                const spinnerId = v4()
                this.props.actions.addSpinning(spinnerId)
                this.setState({
                    spinnerId: spinnerId,
                })
                return
            }
            if (info.file.status === 'done') {
                const { spinnerId } = this.state
                this.props.actions.removeSpinning(spinnerId)
            }
        }
        render() {
            const { isSpinning } = this.props
            console.log('==(this.props)=>', this.props)
            const props = {
                listType: 'text',
                customRequest: this.loadFileInMemory,
                showUploadList: false,
                onChange: this.changeStatusUpload,
            }

            return (
                <Catcher>
                    <div className={cx(Styles.main)}>
                        <div className={Styles.buttonPlace} title={'Download'}>
                            <Upload {...props}>
                                <Button icon="download" type="danger" loading={isSpinning} />
                            </Upload>
                        </div>
                    </div>
                </Catcher>
            )
        }
    }
)
