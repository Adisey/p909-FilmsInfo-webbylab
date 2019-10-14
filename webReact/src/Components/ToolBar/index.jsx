// Core
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// components
import { Catcher, UploadFile } from '..'

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
        listSortOrder: state.ui.get('listSortOrder'),
        listFilterTitle: state.ui.get('listFilterTitle'),
        listFilterStar: state.ui.get('listFilterStar'),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    class ToolBar extends React.PureComponent {
        setViewMode = (e) => {
            this.props.actions.setListViewMode(e.target.value)
        }
        setFilterTitle = (e) => {
            this.props.actions.setListFilterTitle(e.target.value)
        }
        setFilterStar = (e) => {
            this.props.actions.setListFilterStar(e.target.value)
        }
        onClickAscending = () => {
            this.props.actions.setListSortOrder(this.props.listSortOrder !== 'asc' ? 'asc' : void 0)
        }
        onClickDescending = () => {
            this.props.actions.setListSortOrder(this.props.listSortOrder !== 'des' ? 'des' : void 0)
        }
        createFilm = () => {
            this.props.actions.createFilm()
        }
        render() {
            const {
                isSpinning,
                listViewMode,
                listSortOrder,
                listFilterTitle,
                listFilterStar,
            } = this.props
            return (
                <Catcher>
                    <div className={Styles.main}>
                        <div className={Styles.buttonPlace} title="Add new film">
                            <Button
                                type="primary"
                                shape="circle"
                                icon="plus"
                                loading={isSpinning}
                                onClick={this.createFilm}
                            />
                            {/* createFilm */}
                        </div>

                        <div className={Styles.searchPlace3}>
                            <Input
                                placeholder="Film title"
                                allowClear
                                value={listFilterTitle}
                                onChange={this.setFilterTitle}
                                prefix={
                                    <Icon
                                        style={{ color: 'rgba(0,0,0,.25)' }}
                                        type="video-camera"
                                    />
                                }
                                suffix={!listFilterTitle ? <Icon type="search" /> : null}
                            />
                        </div>
                        <div className={Styles.buttonPlace} title="sort by title">
                            <ButtonGroup>
                                <Button
                                    type={listSortOrder === 'asc' ? 'primary' : 'default'}
                                    icon="sort-ascending"
                                    onClick={this.onClickAscending}
                                />
                                <Button
                                    type={listSortOrder === 'des' ? 'primary' : 'default'}
                                    icon="sort-descending"
                                    onClick={this.onClickDescending}
                                />
                            </ButtonGroup>
                        </div>
                        <div className={Styles.searchPlace2}>
                            <Input
                                placeholder="Star"
                                allowClear
                                value={listFilterStar}
                                onChange={this.setFilterStar}
                                prefix={<Icon style={{ color: 'rgba(0,0,0,.25)' }} type="user" />}
                                suffix={!listFilterStar ? <Icon type="search" /> : null}
                            />
                        </div>
                        <div className={Styles.buttonPlace} title={'change show mode'}>
                            <Radio.Group
                                onChange={this.setViewMode}
                                value={listViewMode}
                                buttonStyle="solid"
                            >
                                <Radio.Button value="card">
                                    <Icon type="appstore" />
                                </Radio.Button>
                                <Radio.Button value="table">
                                    <Icon type="table" />
                                </Radio.Button>
                            </Radio.Group>
                        </div>
                        <div className={Styles.spacePlace} />
                        <div className={cx(Styles.buttonPlace, Styles.rightSpace)}>
                            <UploadFile />
                        </div>
                    </div>
                </Catcher>
            )
        }
    }
)
