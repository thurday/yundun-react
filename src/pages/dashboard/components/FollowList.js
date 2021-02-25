import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Tooltip } from 'antd'
import { DropOption, TableFinder, Button, Operation, Text } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onFilterSave, onExceptionSave, onShowDetail, i18n } = this.props
    if(e.key === '1'){
      onShowDetail(record)
    }else if (e.key === '2') {
      confirm({
        title: i18n.t`您确定要过滤此类事件吗？`,
        onOk() {
          onFilterSave(record)
        },
      })
    } else if (e.key === '3') {
      confirm({
        title: i18n.t`您确定要设置该事件为例外事件吗?`,
        onOk() {
          onExceptionSave(record)
        },
      })
    }
  }

  render() {
    const { onFilterSave, onExceptionSave, onShowDetail, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>时间</Trans>,
        dataIndex: 'time',
        key: 'time',
        fixed: 'left',
        // sorter: (a, b) => a.time - b.time,
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
        // render: (text) => text == '3' ? <span style={{ color: '#ed5565' }}>{text}</span> : text
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
        title: <Trans>事件名称</Trans>,
        dataIndex: 'ruleName',
        key: 'ruleName',
        sorter: (a, b) => {
          var stringA = a.ruleName;
          var stringB = b.ruleName;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        },
        render: ruleName => (
          <Tooltip placement="topLeft" title={ruleName}>
            {ruleName}
          </Tooltip>
        ),
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
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        width:'20%',
        render: (text, record) => {
        return (
          <div>
            <Button type="success" className={styles.button} onClick={ e => this.handleMenuClick(record, { key: '1' }) }>详情</Button>
            <Button type="primary" className={styles.button} onClick={ e => this.handleMenuClick(record, { key: '2' }) }>过滤</Button>
            <Button type="danger" className={styles.button} onClick={ e => this.handleMenuClick(record, { key: '3' }) }>例外</Button>
          </div>
        )
        },
      },
    ]

    return (
      <TableFinder
        {...tableProps}
        pagination={false}
        className={styles.table}
        columns={columns}
      />
    )
  }
}

List.propTypes = {
  onFilterSave: PropTypes.func,
  onExceptionSave: PropTypes.func,
  onShowDetail: PropTypes.func,
  location: PropTypes.object,
}

export default List
