import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TableFinder, Operation, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Input, Modal, Tooltip } from 'antd'
import styles from '../index.less'
const { Search } = Input
const FormItem = Form.Item
@withI18n()
class List extends PureComponent {
  state = { 
    visible: false,
    item: {}
  };

  handleMenuClick = (record, e) => {
    const { onEditItem, onViewItem } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      onViewItem(record)
    }
  }

  render() {
    const { onEditItem, onSearch, i18n, ...listOperationProps } = this.props
    const columns = [
      {
        title: <Trans>ID</Trans>,
        dataIndex: 'id',
        key: 'id',
        sorter: (a, b) => {
          var stringA = a.id;
          var stringB = b.id;
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
        title: <Trans>日志名称</Trans>,
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => {
          var stringA = a.name;
          var stringB = b.name;
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
        title: <Trans>日志类型</Trans>,
        dataIndex: 'log_type',
        key: 'log_type',
        sorter: (a, b) => {
          var stringA = a.log_type;
          var stringB = b.log_type;
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
        title: <Trans>操作详情</Trans>,
        dataIndex: 'log_detail',
        key: 'log_detail',
        ellipsis: {
          showTitle: false,
        },
        sorter: (a, b) => {
          var stringA = a.log_detail;
          var stringB = b.log_detail;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        },
        render: log_detail => (
          <Tooltip placement="topLeft" title={log_detail}>
            {log_detail}
          </Tooltip>
        ),
      },
      {
        title: <Trans>操作时间</Trans>,
        dataIndex: 'create_time',
        key: 'create_time',
        sorter: (a, b) => {
          var stringA = a.create_time;
          var stringB = b.create_time;
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
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        width:'16%',
        render: (text, record) => {
          const onClick = (key) => {
            if (key === 'edit') {
              this.handleMenuClick(record, { key: '1' })
            } else if (key === 'view') {
              this.handleMenuClick(record, { key: '2' })
            }
          }
          return (
            <Operation data={['edit', 'view']} onClick={onClick} />
          )
        },
      },
    ]

    const title = () => <div style={{ textAlign: 'right' }}>
      <Search placeholder={i18n.t`请输入关键字`} onSearch={(value) => onSearch({ username: value })} style={{ width: 180 }} />
    </div>

    return (
      <div>
        <TableFinder
          {...listOperationProps}
          pagination={{
            ...listOperationProps.pagination,
            showTotal: total => i18n.t`Total ${total} Items`,
          }}
          className={styles.table}
          columns={columns}
          // title={title}
        />
      </div>
    )
  }
}

List.propTypes = {
  onEditItem: PropTypes.func,
  onViewItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
