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
    const { onDeleteItem, i18n } = this.props
    if (e.key === '1') {
      confirm({
        title: i18n.t`你确定要撤销该过滤事件吗？`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onChange, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>事件名称</Trans>,
        dataIndex: 'cnRuleName',
        key: 'cnRuleName',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>事件类别</Trans>,
        dataIndex: 'typeName',
        key: 'typeName',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => {
          const onClick = (key) => {
              this.handleMenuClick(record, { key: '1' })
          }
          // return <Operation data={['edit', 'del']} onClick={onClick} />
          return <Button type="danger" onClick={onClick}>撤销</Button>
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
        onChange={onChange}
        rowKey={record => record.id}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
