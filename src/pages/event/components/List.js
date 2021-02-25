import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { DropOption, TableFinder, Button, Operation, Text } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, onViewItem, onFilterSave, onExceptionSave, onFollow, onShowDetail, i18n } = this.props

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
    } else if (e.key === '4') {
      confirm({
        title: i18n.t`您确定要过滤此类事件吗？`,
        onOk() {
          onFilterSave(record)
        },
      })
    } else if (e.key === '5') {
      confirm({
        title: i18n.t`您确定要设置该事件为例外事件吗?`,
        onOk() {
          onExceptionSave(record)
        },
      })
    } else if (e.key === '6') {
      onFollow(record);
    } else if (e.key === '7') {
      onShowDetail(record)
    }
  }

  filter = () => {

  }

  render() {
    const { onDeleteItem, onEditItem, onViewItem ,onChange, onFilterSave, onExceptionSave, onFollow, onShowDetail, i18n, ...tableProps } = this.props
    const columns = [
      {
        title: <Trans>时间</Trans>,
        dataIndex: 'time',
        key: 'time',
        fixed: 'left',
        sorter: (a, b) => {
          var stringA = a.time;
          var stringB = b.time;
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
        title: <Trans>等级</Trans>,
        dataIndex: 'level',
        key: 'level',
        onFilter: (value, record) => {this.filter},
        sorter: (a, b) => a.level - b.level,
        render: (text) => text == '3' ? <span style={{ color: '#ed5565' }}>{'高危'}</span> : (text == '2' ? <span>{'中危'}</span>:<span>{'低危'}</span>),
      },
      {
        title: <Trans>事件名称</Trans>,
        dataIndex: 'eventname',
        key: 'eventname',
        sorter: (a, b) => {
          var stringA = a.eventname;
          var stringB = b.eventname;
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
        title: <Trans>事件类型</Trans>,
        dataIndex: 'eventtype',
        key: 'eventtype',
        sorter: (a, b) => {
          var stringA = a.eventtype;
          var stringB = b.eventtype;
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
        title: <Trans>源IP</Trans>,
        dataIndex: 'srcip',
        key: 'srcip',
        sorter: (a, b) => {
          var stringA = a.srcip;
          var stringB = b.srcip;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        },
        render: (text) => <Text data={text==null?'':text} />
      },
      {
        title: <Trans>目标IP</Trans>,
        dataIndex: 'dstip',
        key: 'dstip',
        sorter: (a, b) => {
          var stringA = a.dstip;
          var stringB = b.dstip;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        },
        render: (text) => <Text data={text==null?'':text} />
      },
      // {
      //   title: <Trans>威胁地址</Trans>,
      //   dataIndex: 'detail',
      //   key: 'detail',
      //   sorter: (a, b) => {
      //     var stringA = a.detail.toUpperCase();
      //     var stringB = b.detail.toUpperCase();
      //     if (stringA < stringB) {
      //         return -1;
      //     }
      //     if (stringA > stringB) {
      //         return 1;
      //     }
      //     return 0;
      //   },
      //   render: (text) => <Text data={text==null?'':text} />
      // },
      {
        title: <Trans>频次</Trans>,
        dataIndex: 'freq',
        key: 'freq',
        sorter: (a, b) => a.freq - b.freq,
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        width:'16%',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'edit') {
              // onViewItem(record)
              this.handleMenuClick(record, { key: '1' })
            } else if (key === 'ignore') {
              this.handleMenuClick(record, { key: '2' })
            } else if (key === 'block') {
              this.handleMenuClick(record, { key: '3' })
            }
          }
          // return <Operation data={['edit', 'ignore', 'block']} onClick={onClick} />
          return (
            <div>
              <Operation data={['ignore', 'block']} onClick={onClick} />
              <Button type="success" style={{marginLeft:'10px'}} onClick={e => this.handleMenuClick(record, {key: '7'})}>详情</Button>
              <DropOption
                onMenuClick={e => this.handleMenuClick(record, e)}
                menuOptions={[
                  { key: '4', name: '过滤' },
                  { key: '5', name: '例外' },
                  { key: '6', name: '关注' },
                ]}
              />
            </div>
          )
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
  onViewItem: PropTypes.func,
  onFilterSave: PropTypes.func,
  onExceptionSave: PropTypes.func,
  onFollow: PropTypes.func,
  onShowDetail: PropTypes.func,
  location: PropTypes.object,
}

export default List
