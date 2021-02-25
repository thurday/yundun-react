import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Switch } from 'antd'
import { DropOption, TableFinder, Button, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {

  render() {
    const { i18n, color = [], ...tableProps } = this.props
    const renderEl=(text,record,index)=>
      record.level == '1' ? <span style={{ color: color[3] }}>{text}</span> : (record.level == '2' ? <span style={{ color: color[4] }}>{text}</span>:<span style={{ color: color[2] }}>{text}</span>)
    

    const columns = [
      {
        title: <Trans>规则名称</Trans>,
        dataIndex: 'cnRuleName',
        key: 'cnRuleName',
        render: (text,record) => {
          return <span>{record.cnRuleName==null?record.ruleName:record.cnRuleName}</span>
        }
      },
      {
        title: <Trans>协议类型</Trans>,
        dataIndex: 'protocolType',
        key: 'protocolType',
      },
      {
        title: <Trans>等级</Trans>,
        dataIndex: 'level',
        key: 'level',
        width: 'auto',
        render: (text,record,index)=>renderEl(
          text == '1' ? <span>{'低危'}</span> : (text == '2' ? <span>{'中危'}</span>:<span>{'高危'}</span>),
          record,
          index
        ),
      },
    ]

    return (
      <TableFinder
        {...tableProps}
        pagination={{
          ...tableProps.pagination,
          showTotal: total => i18n.t`Total ${total} Items`,
          pageSizeOptions:['10','20','50','100']
        }}
        className={styles.table}
        columns={columns}
      />
    )
  }
}

List.propTypes = {
  location: PropTypes.object,
}

export default List
