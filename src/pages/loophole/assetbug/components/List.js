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
    const { onDeleteItem, onEditItem, onStartHoleScan, i18n,assetBug } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }else if(e.key === '3'){
      onStartHoleScan(record);
    }
  }

  render() {
    const { assetBug, onDeleteItem, onEditItem, onViewItem, onStartHoleScan, onChange, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>站点</Trans>,
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: <Trans>IP</Trans>,
        dataIndex: 'ip',
        key: 'ip',
      },
      {
        title: <Trans>高危</Trans>,
        dataIndex: 'high',
        key: 'high',
        render: (text,record) => <span style={{ color: '#ed5565' }}>{record.high}</span>
      },
      {
        title: <Trans>中危</Trans>,
        dataIndex: 'middle',
        key: 'middle',
        render: (text,record) => <span style={{ color: '#f5be5b' }}>{record.middle}</span>
      },
      {
        title: <Trans>低危</Trans>,
        dataIndex: 'low',
        key: 'low',
        render: (text,record) => <span style={{ color: '#1ab394' }}>{record.low}</span>
      },
      {
        title: <Trans>扫描时间</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
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
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onStartHoleScan: PropTypes.func,
  location: PropTypes.object,
}

export default List
