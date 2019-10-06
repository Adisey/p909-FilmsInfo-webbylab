// Core
import * as React from 'react'
import { string, bool, func } from 'prop-types'
// Components
import { Catcher } from '..'
// Styles
import Styles from './styles.less'
import cx from 'classnames'
// Antd
import { Button, Tooltip, Popconfirm, Icon } from 'antd'

export default class ListToolBar extends React.PureComponent {
    static propTypes = {
        itemName: string,
        isEditMode: bool.isRequired,
        isValidChange: bool.isRequired,
        setEditMode: func,
        setViewMode: func,
        deleteItem: func,
        saveChangeItem: func,
    }
    static defaultProps = {
        itemName: '',
        isEditMode: false,
        isValidChange: false,
        setEditMode: void 0,
        setViewMode: void 0,
        deleteItem: void 0,
        saveChangeItem: void 0,
    }

    render() {
        const {
            isEditMode,
            setEditMode,
            setViewMode,
            deleteItem,
            saveChangeItem,
            isValidChange,
            itemName,
        } = this.props
        const _itemName = itemName ? itemName : ''
        const ViewPanel = (
            <div className={Styles.listToolBar}>
                {setEditMode ? (
                    <Tooltip
                        title={`edit ${_itemName}`}
                        className={cx(Styles.toolbarButton, Styles.edit)}
                    >
                        <Button icon="edit" onClick={setEditMode} />
                    </Tooltip>
                ) : null}
                {deleteItem ? (
                    <Popconfirm
                        title={`Do you want to remove the ${_itemName}?`}
                        onConfirm={deleteItem}
                        okText="Yes"
                        cancelText="No"
                        icon={<Icon type="question-circle-o" />}
                        placement="bottom"
                    >
                        <Tooltip
                            title={`delete ${_itemName}`}
                            className={cx(Styles.toolbarButton, Styles.danger)}
                        >
                            <Button icon="delete" />
                        </Tooltip>
                    </Popconfirm>
                ) : null}
            </div>
        )

        const EditPanel = (
            <div className={Styles.listToolBar}>
                {saveChangeItem ? (
                    <Tooltip
                        title={isValidChange ? 'save editable' : 'check Error!'}
                        className={cx(Styles.toolbarButton, Styles.ok)}
                    >
                        <Button icon="check" onClick={saveChangeItem} disabled={!isValidChange} />
                    </Tooltip>
                ) : null}
                {setViewMode ? (
                    <Tooltip
                        title="undo editable"
                        className={cx(Styles.toolbarButton, Styles.danger)}
                    >
                        <Button icon="undo" onClick={setViewMode} />
                    </Tooltip>
                ) : null}
            </div>
        )

        return <Catcher>{isEditMode ? EditPanel : ViewPanel} </Catcher>
    }
}
