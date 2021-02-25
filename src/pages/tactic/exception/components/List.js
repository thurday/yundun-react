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
        title: i18n.t`您确定要撤销该记录吗?`,
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
        title: <Trans>源IP</Trans>,
        dataIndex: 'srcip',
        key: 'srcip',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>源端口</Trans>,
        dataIndex: 'srcport',
        key: 'srcport',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>目标IP</Trans>,
        dataIndex: 'dstip',
        key: 'dstip',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      {
        title: <Trans>目标端口</Trans>,
        dataIndex: 'dstport',
        key: 'dstport',
        render: (text,record) => {
          return <span>{text}</span>
        }
      },
      // {
      //   title: <Trans>威胁地址</Trans>,
      //   dataIndex: 'address',
      //   key: 'address',
      //   render: (text,record) => {
      //     return <span>{text}</span>
      //   }
      // },
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
