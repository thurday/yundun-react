import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
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
    const { onDeleteItem, onEditItem, onViewItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>名称</Trans>,
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: <Trans>地址</Trans>,
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: <Trans>URL</Trans>,
        dataIndex: 'host',
        key: 'host',
      },
      {
        title: <Trans>资产组</Trans>,
        dataIndex: 'assetGroupName',
        key: 'assetGroupName',
      },
      {
        title: <Trans>备案状态</Trans>,
        dataIndex: 'operation',
        key: 'operation',
        render:(text, record) => {
        return  <span>{record.operation=='0'?'未备案':'已备案'}</span>
        }
      },
      {
        title: <Trans>开办单位</Trans>,
        dataIndex: 'company',
        key: 'company',
      },
      // {
      //   title: <Trans>访问量</Trans>,
      //   dataIndex: 'count',
      //   key: 'count',
      // },
      // {
      //   title: <Trans>操作</Trans>,
      //   key: 'operations',
      //   render: (text, record) => {
      //     const onClick = (key) => {
      //       if (key === 'view') {
      //         onViewItem(record)
      //       } else if (key === 'edit') {
      //         this.handleMenuClick(record, { key: '1' })
      //       } else if (key === 'del') {
      //         this.handleMenuClick(record, { key: '2' })
      //       }
      //     }
      //     // return <Operation data={['edit', 'view', 'del']} onClick={onClick} />
      //     return <Operation data={[ 'del' ]} onClick={onClick} />
      //   },
      // },
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
