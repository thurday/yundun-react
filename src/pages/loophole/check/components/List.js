import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Spin } from 'antd'
import { DropOption, TableFinder, Button, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, onExport, onInterrupt, onStart, onStop, onScanAgain, i18n } = this.props

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
      onExport(record.id)
    } else if(e.key === '4'){
      onInterrupt(record.id)
    } else if(e.key === '5'){
      onStart(record.id)
    } else if(e.key === '6'){
      onStop(record.id)
    } else if(e.key === '7'){
      onScanAgain(record.id)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, onExport, onInterrupt, onStart, globalLoading, onStop, i18n, ...tableProps } = this.props
    const columns = [
      // {
      //   title: <Trans>ID</Trans>,
      //   dataIndex: 'id',
      //   key: 'id',
      //   fixed: 'left',
      // },
      {
        title: <Trans>站点</Trans>,
        dataIndex: 'host',
        key: 'host',
      },
      // {
      //   title: <Trans>状态</Trans>,
      //   dataIndex: 'status',
      //   key: 'status',
      // },
      {
        title: <Trans>IP/域名</Trans>,
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
        dataIndex: 'medium',
        key: 'medium',
        render: (text,record) => <span style={{ color: '#f5be5b' }}>{record.medium}</span>
      },
      {
        title: <Trans>低危</Trans>,
        dataIndex: 'low',
        key: 'low',
        render: (text,record) => <span style={{ color: '#1ab394' }}>{record.low}</span>
      },
      {
        title: <Trans>状态</Trans>,
        dataIndex: 'status',
        key: 'status',
        render: (text,record) => {
          return(
            <span style={{ color: record.status==1?'#1ab394':record.status==-1?'#ed5565':'#f5be5b' }}>{record.status==1?'已完成':record.status==-1?'已中断':record.status==0?'进行中':record.status==0.5?'已暂停':''}</span>
          )
        }
      },
      {
        title: <Trans>扫描时间</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
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
            } else if (key === 'statement') {
              this.handleMenuClick(record, { key: '3' })
            } else if (key === 'interrupt') {
              this.handleMenuClick(record, { key: '4' })
            } else if (key === 'start') {
              this.handleMenuClick(record, { key: '5' })
            } else if (key === 'stop') {
              this.handleMenuClick(record, { key: '6' })
            } else if (key === 'again') {
              this.handleMenuClick(record, { key: '7' })
            }
          }
          // return <Operation data={['start','view', 'del', 'statement']} onClick={onClick} />
          if(record.status=='1'){
            return <Operation data={['again','edit','statement']} onClick={onClick} />
          }else if(record.status=='0'){
            return <Operation data={['again','edit','stop','interrupt']} onClick={onClick} />
          }else if(record.status=='0.5'){
            return <Operation data={['again','edit','start','interrupt']} onClick={onClick} />
          }else if(record.status=='-1'){
            return <Operation data={['again','edit']} onClick={onClick} />
          }
        },
      },
    ]

    return (
      <Spin spinning={globalLoading}>
        <TableFinder
          {...tableProps}
          pagination={{
            ...tableProps.pagination,
            showTotal: total => i18n.t`Total ${total} Items`,
          }}
          className={styles.table}
          columns={columns}
        />
      </Spin>
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onExport: PropTypes.func,
  onInterrupt: PropTypes.func,
  onStart: PropTypes.func,
  onStop: PropTypes.func,
  onScanAgain: PropTypes.func,
  location: PropTypes.object,
}

export default List
