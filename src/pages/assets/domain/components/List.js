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
    const { onDeleteItem, onEditItem, onStartHoleScan, i18n,assetsDiscover } = this.props
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
    const { assetsDiscover, onDeleteItem, onEditItem, onViewItem, onStartHoleScan, onChange, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>网站地址</Trans>,
        dataIndex: 'host',
        key: 'host',
      },
      {
        title: <Trans>网站标题</Trans>,
        dataIndex: 'title',
        key: 'title',
      },
      {
        title: <Trans>状态</Trans>,
        dataIndex: 'assetStatus',
        key: 'assetStatus',
      },
      {
        title: <Trans>漏扫</Trans>,
        dataIndex: 'lousaoStatus',
        key: 'lousaoStatus',
        render:(text, record) => {
          return  <span>{record.lousaoStatus==0?'未扫描':record.isBeian==1?'已扫描':record.lousaoStatus}</span>
        }
      },
      {
        title: <Trans>备案</Trans>,
        dataIndex: 'isBeian',
        key: 'isBeian',
        sorter: (a, b) => {
          var stringA = a.isBeian;
          var stringB = b.isBeian;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        },
        render:(text, record) => {
          return  <span>{record.isBeian=='0'?'否':record.isBeian=='1'?'是':''}</span>
        }
      },
      {
        title: <Trans>资产组</Trans>,
        dataIndex: 'assetGroupName',
        key: 'assetGroupName',
        sorter: (a, b) => {
          var stringA = a.assetGroupName;
          var stringB = b.assetGroupName;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        }
      },
      {
        title: <Trans>操作</Trans>,
        key: 'caozuo',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'edit') {
              // onViewItem(record)
              this.handleMenuClick(record, { key: '1' })
            } else if (key === 'del') {
              this.handleMenuClick(record, { key: '2' })
            } else if (key === 'detection'){
              this.handleMenuClick(record, { key: '3' })
            }
          }
          return <Operation data={['edit', 'del']} onClick={onClick} />
          // return (
          //   <div>
          //     <Button type="success" size="small" className="margin-right" onClick={_ => onViewItem(record)}>详情</Button>
          //     <DropOption
          //       onMenuClick={e => this.handleMenuClick(record, e)}
          //       menuOptions={[
          //         { key: '1', name: i18n.t`Update` },
          //         { key: '2', name: i18n.t`Delete` },
          //       ]}
          //     />
          //   </div>
          // )
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
