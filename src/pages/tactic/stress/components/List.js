import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Switch } from 'antd'
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

  render() {
    const { onDeleteItem, onEditItem,  i18n, ...tableProps } = this.props

    const columns = [
        {
          title: <Trans>已关注IP</Trans>,
          dataIndex: 'followIp',
          key: 'followIp',
          fixed: 'left',
        },
        {
          title: <Trans>备注</Trans>,
          dataIndex: 'remark',
          key: 'remark',
        },
        {
          title: <Trans>Operation</Trans>,
          key: 'operation',
          fixed: 'right',
          render: (text, record) => {
            const onClick = (key) => {
              if (key === 'edit') {
                this.handleMenuClick(record, { key: '1' })
              } else if (key === 'del') {
                this.handleMenuClick(record, { key: '2' })
              }
            }
            return <Operation data={['edit', 'del']} onClick={onClick} />
          },
        },
      ]

    return (
      <TableFinder
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
          pageSizeOptions:['10','20','50','100']
        }}
        className={styles.table}
        columns={columns}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
