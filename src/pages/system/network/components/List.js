import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TableFinder, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>接口名称</Trans>,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: <Trans>接口类型</Trans>,
        dataIndex: 'aliasName',
        key: 'aliasName',
      },
      // {
      //   title: <Trans>接收速率</Trans>,
      //   dataIndex: 'jSpeed',
      //   key: 'jSpeed',
      // },
      // {
      //   title: <Trans>发送速率</Trans>,
      //   dataIndex: 'fSpeed',
      //   key: 'fSpeed',
      // },
      {
        title: <Trans>状态</Trans>,
        dataIndex: 'onboot',
        key: 'onboot',
        render: (text,record) => {return record.onboot=='1'?<span style={{ color: '#1ab394' }}>已连接</span>:<span style={{ color: '#ed5565' }}>已断开</span>}
      },
      {
        title: <Trans>操作</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'edit') {
              this.handleMenuClick(record, { key: '1' })
            }
          }
          return <Operation data={['edit']} onClick={onClick} />
        },
      },
    ]

    return (
      <TableFinder
        {...tableProps}
        // pagination={{
        //   ...tableProps.pagination,
        //   showTotal: total => i18n.t`Total ${total} Items`,
        // }}
        className={styles.table}
        columns={columns}
        pagination={false}
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
