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
        itemNewName: string,
        isEditMode: bool.isRequired,
        isValidChange: bool.isRequired,
        setEditMode: func,
        setViewMode: func,
        deleteItem: func,
        saveChangeItem: func,
    }
    static defaultProps = {
        itemName: '',
        itemNewName: '',
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
            itemNewName,
        } = this.props
        const ViewPanel = (
            <div className={Styles.listToolBar}>
                {setEditMode ? (
                    <Tooltip
                        title={`Edit ${itemName}`}
                        className={cx(Styles.toolbarButton, Styles.edit)}
                    >
                        <Button icon="edit" onClick={setEditMode} />
                    </Tooltip>
                ) : null}
                {deleteItem ? (
                    <Popconfirm
                        title={`Do you want to remove the ${itemName}?`}
                        onConfirm={deleteItem}
                        okText="Yes"
                        cancelText="No"
                        icon={<Icon type="question-circle-o" />}
                        placement="bottom"
                    >
                        <Tooltip
                            title={`Delete ${itemName}`}
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
                        title={
                            isValidChange
                                ? `Save editable ${itemNewName}`
                                : `Can't save, title value is empty!`
                        }
                        className={cx(Styles.toolbarButton, Styles.ok)}
                    >
                        <Button icon="check" onClick={saveChangeItem} disabled={!isValidChange} />
                    </Tooltip>
                ) : null}
                {setViewMode ? (
                    <Tooltip
                        title={`Undo editable ${itemName}`}
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
