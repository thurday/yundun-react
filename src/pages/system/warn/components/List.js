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

  warnningFn = (warnningType) => {
    let newData = warnningType.split(',');
    let result = []
    newData.map(v=>{
      if(v=='email'){
        v='邮件'
        result.push('邮件')
      }else if(v=='voice'){
        v='声音'
        result.push('声音')
      }else if(v=='windows'){
        v='弹框'
        result.push('弹框')
      }else if(v=='syslog'){
        result.push('syslog')
      }
    })
    return result.join(', ')
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>事件类型</Trans>,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: <Trans>风险等级</Trans>,
        dataIndex: 'level',
        key: 'level',
        sorter: (a, b) => a.level - b.level,
        render:(text)=> {
            if (text == '3') {
              return <span style={{ color: '#ed5565' }}>{'高危'}</span>
            }else if(text == '2'){
              return <span>{'中危'}</span>
            }else{
              return <span>{'低危'}</span>
            }
        }
      },
      {
        title: <Trans>通知类型</Trans>,
        dataIndex: 'warnningType',
        key: 'warnningType',
        render: (text,record) => {
          return <span>{this.warnningFn(record.warnningType)}</span>
        }
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'del') {
              this.handleMenuClick(record, { key: '2' })
            } else if(key === 'edit'){
              this.handleMenuClick(record, { key: '1' })
            }
          }
          return <Operation data={['edit','del']} onClick={onClick} />
          // return (
          //   <div>
          //     <Button type="success" size="small" className="margin-right">详情</Button>
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
