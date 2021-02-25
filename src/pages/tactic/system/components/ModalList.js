import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Table, Switch } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal,ModalTable } from 'components'
import styles from './List.less'
const { confirm } = Modal

@withI18n()
class ModalList extends PureComponent {
  handleClick = () => {
    const { onCancel } = this.props;
      onCancel(); 

  }

  onSwitchChange = (record) => {
    const { onChecked } = this.props
    onChecked(record.id,record.status,record.strategyId);
  }

  render() {
    const {  onCancel, onChecked, i18n, ...modalTableProps } = this.props
    const columns = [
      {
        title: <Trans>规则名称</Trans>,
        dataIndex: 'ruleName',
        key: 'ruleName',
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
        render: (text,record) => {
          return <span>{record.level}</span>
        }
      },
      {
        title: <Trans>开启阻断</Trans>,
        dataIndex: 'status',
        key: 'status',
        // render: (text,record) => <Avatar className="anticon" src={'/icons/switch.svg'} style={{ width: 36, height: 20, lineHeight: 20, borderRadius: 0 }} />
        render: (text,record) => {
          const onClick = (key) => {
            this.onSwitchChange(record)
          }
          return  <span><Switch checked={record.status=="1"?true:false} onClick={onClick} /></span>
        }
      },

    ];


    return (
      <Modal title="规则列表" {...modalTableProps} width="80%" centered={false} footer={<Button type="primary" onClick={this.handleClick}>关闭</Button>}>
        <ModalTable
          {...modalTableProps}
          // pagination={{
          //   ...modalTableProps.pagination,
          //   showTotal: total => i18n.t`Total ${total} Items`,
          // }}
          pagination={false}
          className={styles.table}
          columns={columns}
          rowKey='id'
        />
     </Modal>
    )
  }
}

ModalList.propTypes = {
  location: PropTypes.object,
  onCancel: PropTypes.func,
  onChecked: PropTypes.func,
}

export default ModalList
