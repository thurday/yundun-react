import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TableFinder, Operation, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Modal, Switch, Icon, message } from 'antd'
import styles from '../index.less'
import { add } from 'lodash'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
    handleMenuClick = (record, e) => {
        const { onDeleteItem, onEditItem, onDetail, i18n } = this.props
        if (e.key === '1') {
          confirm({
            title: i18n.t`Are you sure delete this record?`,
            onOk() {
              onDeleteItem(record.id)
            },
          })
        }
    }

    handleItems = (key) => {
        const { onAdd } = this.props
        if(key === '1'){
            onAdd()
        }
    }

    multiDeleteItems = () => {
        const { i18n, warnSelectedRowKeys, onbatchDeleteItem } = this.props
        if (!warnSelectedRowKeys.length) {
            message.warn('请选择数据')
        return
        }else{
            confirm({
            title: i18n.t`Are you sure delete this records?`,
                onOk() {
                    onbatchDeleteItem(warnSelectedRowKeys)
                },
            })
        }
    }

    render() {
        const { onDeleteItem, onEditItem, onChange, i18n, ...warningProps } = this.props
        const columns = [
            {
                title: <Trans>名称</Trans>,
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: <Trans>通知方向</Trans>,
                dataIndex: 'noticeDirection',
                key: 'noticeDirection',
                render: (text,record) => {
                    return <span>{record.noticeDirection==0?'上级':record.noticeDirection==1?'下级':'上级、下级'}</span>
                }
            },
            {
                title: <Trans>创建时间</Trans>,
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: <Trans>Operation</Trans>,
                key: 'operation',
                fixed: 'right',
                render: (text, record) => {
                const onClick = (key) => {
                    if (key === 'del') {
                        this.handleMenuClick(record, { key: '1' })
                    }
                }
                return <Operation data={['del']} onClick={onClick} />
                },
            },
        ]

        const title = () => <div style={{ textAlign: 'right' }}>
        </div>

        return (
            <div>
                <Button style={{margin:'0 10px 10px 0'}} type="primary" size="small" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
                <Button type="danger" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}><Icon type="delete" />批量删除</Button>
                <TableFinder
                    {...warningProps}
                    pagination={{
                        ...warningProps.pagination,
                        showTotal: total => i18n.t`Total ${total} Items`,
                    }}
                    className={styles.table}
                    columns={columns}
                    title={title}
                />
            </div>
        )
    }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onChange: PropTypes.func,
  onAdd: PropTypes.func,
  onbatchDeleteItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
