import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, TableFinder } from 'components'
import styles from './List.less'
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, modalType, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    const columns = [
      {
        title: <Trans>资产名称</Trans>,
        dataIndex: 'name',
        key: 'name',
        render: (text,record) => {
            return  <span>{record.name}</span>
        }
      },
      {
        title: <Trans>资产类型</Trans>,
        dataIndex: 'type',
        key: 'type',
        render: (text,record) => {
          return  <span>{record.type}</span>
        }
      },
      {
        title: <Trans>资产状态</Trans>,
        dataIndex: 'operationName',
        key: 'operationName',
        render: (text,record) => {
            return  <span>{record.operationName}</span>
        }
    },
    ]

    if(modalType === 'detail'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <TableFinder
            {...modalProps}
            // pagination={{
            //   ...modalProps.typePagination,
            //   showTotal: total => i18n.t`Total ${total} Items`,
            //   pageSizeOptions:['10','20','50','100']
            // }}
            className={styles.table}
            columns={columns}
            title={''}
          />
        </Modal>
      )
    }else{
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`资产组名称`} {...formItemLayout}>
              {getFieldDecorator('assetGroupName', {
                initialValue: item.assetGroupName,
                rules: [
                  {
                    required: true,
                    message:'请输入资产组名称',
                  },
                  {
                    max:20,
                    message: '名称不能大于20个字',
                  }
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
