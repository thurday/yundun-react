import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Switch } from 'antd'
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

  onShowChange = (record) => {
    const { onShowSystem } = this.props
    onShowSystem('3',record);
  }

  onSwitchChange = (record) => {
    const { onTypeChecked } = this.props
    onTypeChecked(record);
  }

  render() {
    const { onDeleteItem, onEditItem, onTypeChecked, onShowSystem,  i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>策略种类</Trans>,
        dataIndex: 'desc',
        key: 'desc',
        render: (text,record) => {
            const onClick = (key) => {
                this.onShowChange(record)
              }
            return  <a onClick={onClick}>{text}</a>
        }
      },
      {
        title: <Trans>规则类别数量</Trans>,
        dataIndex: 'eventTotal',
        key: 'eventTotal',
        render: (text,record) => {
        return  <span>{record.eventTotal}/{record.total}</span>
        }
      },
      {
        title: <Trans>是否启用</Trans>,
        dataIndex: 'status',
        key: 'status',
        render: (text,record) => {
            const onClick = (key) => {
                this.onSwitchChange(record)
            }
            return  <span><Switch checked={record.status=="1"?true:false} onClick={onClick} /></span>
        }
    },
    ]

    return (
      <TableFinder
        {...tableProps}
        pagination={{
          ...tableProps.typePagination,
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onTypeChecked: PropTypes.func,
  onShowSystem: PropTypes.func,
  location: PropTypes.object,
}

export default List
