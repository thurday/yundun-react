import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TableFinder, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Modal, Switch } from 'antd'
import styles from '../index.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
    handleMenuClick = (record, e) => {
        const { onDeleteItem, onEditItem, onDetail, i18n } = this.props
        if (e.key === '1') {
          onEditItem(record)
        } else if (e.key === '2') {
          confirm({
            title: i18n.t`Are you sure delete this record?`,
            onOk() {
              onDeleteItem(record.userId)
            },
          })
        } else if(e.key === '3'){
            onDetail(record)
        }
    }

    onSwitchChange = (record) => {
        const { onChecked } = this.props
        onChecked(record.id,record.status);
      }

    render() {
        const { onDeleteItem, onEditItem, onChecked, i18n, ...probeProps } = this.props
        const columns = [
            {
                title: <Trans>探针IP地址</Trans>,
                dataIndex: 'host',
                key: 'host',
            },
            {
                title: <Trans>探针名称</Trans>,
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: <Trans>访问端口</Trans>,
                dataIndex: 'port',
                key: 'port',
            },
            {
                title: <Trans>启停</Trans>,
                dataIndex: 'status',
                key: 'status',
                render: (text,record) => {
                    const onClick = (key) => {
                        this.onSwitchChange(record)
                    }
                    return  <span><Switch checked={record.status=="1"?true:false} onClick={onClick} /></span>
                }
            },
            {
                title: <Trans>Operation</Trans>,
                key: 'operation',
                fixed: 'right',
                render: (text, record) => {
                const onClick = (key) => {
                    if (key === 'edit') {
                    this.handleMenuClick(record, { key: '1' })
                    } else if (key === 'view') {
                    this.handleMenuClick(record, { key: '3' })
                    }
                }
                return <Operation data={['edit','view']} onClick={onClick} />
                },
            },
        ]

        const title = () => <div style={{ textAlign: 'right' }}>
        </div>

        return (
        <TableFinder
            {...probeProps}
            // pagination={{
            // ...probeProps.pagination,
            // showTotal: total => i18n.t`Total ${total} Items`,
            // }}
            pagination={false}
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
  onDetail: PropTypes.func,
  onChecked: PropTypes.func,
  location: PropTypes.object,
}

export default List
