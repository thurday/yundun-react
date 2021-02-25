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
    const { onDeleteItem, onEditItem, onViewItem, i18n } = this.props

    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (e.key === '3') {
      onViewItem(record)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, onViewItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>资产组名称</Trans>,
        dataIndex: 'assetGroupName',
        key: 'assetGroupName',
      },
      {
        title: <Trans>资产总数</Trans>,
        dataIndex: 'total',
        key: 'total',
      },
      {
        title: <Trans>治理资产数</Trans>,
        dataIndex: 'finish',
        key: 'finish',
      },
      {
        title: <Trans>未治理资产</Trans>,
        dataIndex: 'unfinish',
        key: 'unfinish',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'view') {
              this.handleMenuClick(record, { key: '3' })
            }else if(key === 'edit'){
              this.handleMenuClick(record, { key: '1' })
            }else if(key === 'del'){
              this.handleMenuClick(record, { key: '2' })
            }
          }
          return <Operation data={['view','edit','del']} onClick={onClick} />
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
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onViewItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
