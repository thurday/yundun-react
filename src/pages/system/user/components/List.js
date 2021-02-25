import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal,Switch } from 'antd'
import { DropOption, TableFinder, Button, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from './List.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, onViewItem, onChangePwd, i18n } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Are you sure delete this record?`,
        onOk() {
          onDeleteItem(record.userId)
        },
      })
    } else if (e.key === '3') {
      onViewItem(record)
    } else if (e.key === '4') {
      onChangePwd(record)
    }
  }

  onSwitchChange = (record) => {
    const { onChecked } = this.props
    onChecked(record.userId,record.status,record.roleId);
  }

  render() {
    const { onDeleteItem, onEditItem, onChecked, onViewItem, onChangePwd, i18n, ...tableProps } = this.props

    const columns = [
      {
        title: <Trans>用户ID</Trans>,
        dataIndex: 'userId',
        key: 'userId',
        fixed: 'left',
      },
      {
        title: <Trans>角色名称</Trans>,
        dataIndex: 'roleName',
        key: 'roleName',
      },
      {
        title: <Trans>登录账号</Trans>,
        dataIndex: 'username',
        key: 'username',
        width:'10%',
        render:(text,record) => {
          const onClick = (key) => {
            this.onSwitchChange(record)
          }
          return (
            <span>
              <div style={{display:'inline-block'}}>{record.username}</div>
              <Switch style={{float:'right'}} disabled={record.userId=='1'?true:false} checked={record.status=="1"?true:false} onClick={onClick} />
            </span>
          )}
      },
      {
        title: <Trans>姓名</Trans>,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: <Trans>联系邮箱</Trans>,
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: <Trans>联系手机</Trans>,
        dataIndex: 'mobile',
        key: 'mobile',
      },
      // {
      //   title: <Trans>可访问起始IP</Trans>,
      //   dataIndex: 'startIp',
      //   key: 'startIp',
      // },
      // {
      //   title: <Trans>可访问结束IP</Trans>,
      //   dataIndex: 'endIp',
      //   key: 'endIp',
      // },
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
            } else if (key === 'view') {
              this.handleMenuClick(record, { key: '3' })
            } else if (key === 'changePwd') {
              this.handleMenuClick(record, { key: '4' })
            }
          }
          if(record.userId=='1'){
            return <Operation data={['view']} onClick={onClick} />
          }else{
            return <Operation data={['view','edit','changePwd']} onClick={onClick} />
          }
          
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
        // pagination={{
        //   ...tableProps.pagination,
        //   showTotal: total => i18n.t`Total ${total} Items`,
        // }}
        pagination={false}
        className={styles.table}
        columns={columns}
        rowKey={record => record.userId}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onChecked: PropTypes.func,
  onViewItem: PropTypes.func,
  onChangePwd: PropTypes.func,
  location: PropTypes.object,
}


export default List
