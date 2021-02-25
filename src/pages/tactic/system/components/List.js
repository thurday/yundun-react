import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Avatar, Switch } from 'antd'
import { DropOption, TableFinder, Button, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, onCopyItem, i18n } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (e.key === '3'){
      confirm({
        title: i18n.t`Are you sure copy this record?`,
        onOk() {
          onCopyItem(record.id)
        },
      })
    }
  }

  onSwitchChange = (record) => {
    const { onChecked } = this.props
    onChecked(record.id,record.status);
  }

  render() {
    const { onDeleteItem, onEditItem, onCopyItem, onChecked, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>事件名称</Trans>,
        dataIndex: 'cnRuleName',
        key: 'cnRuleName',
        render: (text,record) => {
          return <span>{record.cnRuleName==null?record.ruleName:record.cnRuleName}</span>
        }
      },
      {
        title: <Trans>事件类型</Trans>,
        dataIndex: 'eventTypeName',
        key: 'eventTypeName',
        render: (text,record) => {
          return <span>{record.eventTypeName}</span>
        }
      },
      {
        title: <Trans>协议类型</Trans>,
        dataIndex: 'protocolType',
        key: 'protocolType',
        render: (text,record) => {
          return <span>{record.protocolType}</span>
        }
      },
      {
        title: <Trans>备注</Trans>,
        dataIndex: 'remark',
        key: 'remark',
        render: (text,record) => {
          return  <span>{text}</span>
        }
      },
      {
        title: <Trans>是否应用</Trans>,
        dataIndex: 'status',
        key: 'status',
        render: (text,record) => {
          const onClick = (key) => {
            this.onSwitchChange(record)
          }
          return  <span><Switch checked={record.status=="1"?true:false} onClick={onClick} /></span>
        }
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'edit') {
              this.handleMenuClick(record, { key: '1' })
            } else if (key === 'del') {
              this.handleMenuClick(record, { key: '2' })
            } else if (key === 'copy') {
              this.handleMenuClick(record, { key: '3' })
            }
          }
          return <Operation data={['edit','copy']} onClick={onClick} />
        },
      },
    ]

    return (
      <TableFinder
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        columns={columns}
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onCopyItem: PropTypes.func,
  onChecked: PropTypes.func,
  location: PropTypes.object,
}

export default List
