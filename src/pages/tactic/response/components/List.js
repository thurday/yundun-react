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
    const { onDeleteItem, onEditItem, i18n } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  onSwitchChange = (record) => {
    const { onChecked } = this.props
    onChecked(record.id,record.status);
  }

  render() {
    const { onDeleteItem, onEditItem, onChecked, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>响应方式</Trans>,
        dataIndex: 'responseMethodName',
        key: 'responseMethodName',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>响应名称</Trans>,
        dataIndex: 'methodName',
        key: 'methodName',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>告警方式</Trans>,
        dataIndex: 'warn',
        key: 'warn',
        render: (text,record) => {
          return  <span>{text}</span>
        }
      },
      {
        title: <Trans>创建时间</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text,record) => {
          return  <span>{text}</span>
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
            } else if (key === 'view') {
              this.handleMenuClick(record, { key: '3' })
            }
          }
          return <Operation data={['edit', 'view', 'del']} onClick={onClick} />
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
  onChecked: PropTypes.func,
  location: PropTypes.object,
}

export default List
