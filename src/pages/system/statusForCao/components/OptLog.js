import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TableFinder } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Input, Tooltip  } from 'antd'
import styles from '../index.less'

const { Search } = Input

@withI18n()
class List extends PureComponent {
  render() {
    const { onDeleteItem, onEditItem, onSearch, i18n, ...tableProps } = this.props

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
        title: <Trans>操作类型</Trans>,
        dataIndex: 'operation',
        key: 'operation',
        sorter: (a, b) => {
          var stringA = a.operation;
          var stringB = b.operation;
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
        title: <Trans>操作用户</Trans>,
        dataIndex: 'username',
        key: 'username',
        sorter: (a, b) => {
          var stringA = a.username;
          var stringB = b.username;
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
        title: <Trans>访问者IP地址</Trans>,
        dataIndex: 'ip',
        key: 'ip',
        sorter: (a, b) => {
          var stringA = a.ip;
          var stringB = b.ip;
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
        dataIndex: 'params',
        key: 'params',
        ellipsis: {
          showTitle: false,
        },
        render: params => (
          <Tooltip placement="topLeft" title={params}>
            {params}
          </Tooltip>
        ),
        sorter: (a, b) => {
          var stringA = a.params;
          var stringB = b.params;
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
        title: <Trans>操作时间</Trans>,
        dataIndex: 'gmtCreate',
        key: 'gmtCreate',
        sorter: (a, b) => {
          var stringA = a.gmtCreate;
          var stringB = b.gmtCreate;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        }
      },
    ]

    const title = () => <div style={{ textAlign: 'right' }}>
      操作用户：<Search placeholder={i18n.t`请输入关键字`} onSearch={(value) => onSearch({ username: value })} style={{ width: 180 }} />
    </div>

    return (
      <TableFinder
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
        }}
        className={styles.table}
        columns={columns}
        title={title}
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
