import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { TableFinder, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, onIdentity, i18n } = this.props

    if (e.key === '1') {
        onEditItem(record)
    }else if(e.key === '2'){
        confirm({
            title: i18n.t`Are you sure delete this record?`,
            onOk() {
                onDeleteItem(record)
            },
        })
    }else if(e.key === '3'){
        onIdentity(record)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, onIdentity, i18n, ...tableProps } = this.props

    const columns = [
      // {
      //   title: <Trans>设备属性</Trans>,
      //   dataIndex: 'name',
      //   key: 'name',
      // },
      {
        title: <Trans>设备IP</Trans>,
        dataIndex: 'host',
        key: 'host',
      },
      {
        title: <Trans>设备端口</Trans>,
        dataIndex: 'port',
        key: 'port',
      },
      {
        title: <Trans>设备类型</Trans>,
        dataIndex: 'type',
        key: 'type',
      },
      // {
      //   title: <Trans>主机IP</Trans>,
      //   dataIndex: 'aliasName',
      //   key: 'aliasName',
      // },
      // {
      //   title: <Trans>主机端口</Trans>,
      //   dataIndex: 'aliasName',
      //   key: 'aliasName',
      // },
      {
        title: <Trans>状态</Trans>,
        dataIndex: 'status',
        key: 'status',
        render: (text,record) => {return record.status=='已连接'?<span style={{ color: '#1ab394' }}>已连接</span>:<span style={{ color: '#ed5565' }}>已断开</span>}
      },
      {
        title: <Trans>操作</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'edit') {
                this.handleMenuClick(record, { key: '1' })
            }else if(key === 'del'){
                this.handleMenuClick(record, { key: '2' })
            }else if(key === 'identity'){
                this.handleMenuClick(record, { key: '3' })
            }
          }
          return <Operation data={['del']} onClick={onClick} />
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
  onIdentity: PropTypes.func,
  location: PropTypes.object,
}

export default List
