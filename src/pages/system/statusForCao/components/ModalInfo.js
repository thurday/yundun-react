import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Avatar, Radio, Tree } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, ModalInfo, AsyncSelect } from 'components'

const FormItem = Form.Item
const { TreeNode } = Tree;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const detailFormItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
}
@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, modalInfoType, onOk, form } = this.props
    const { validateFields, getFieldsValue} = form
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

  handleCancel = () => {
    const { onCancel } = this.props
    onCancel()
  }

  render() {
    const { systemUser, item = {}, onOk, form, i18n, modalInfoType, ...modalInfoProps } = this.props
    const { getFieldDecorator } = form
    if(modalInfoType === 'update'){
      return (
        <ModalInfo {...modalInfoProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`日志名称`} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                    {
                        required: true,
                        message:'日志名称不能为空'
                    },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入日志名称`} />)}
            </FormItem>
          </Form>
        </ModalInfo>
      )
    }else if(modalInfoType === 'block'){
      return (
        <ModalInfo 
        footer={[
            <Button type="primary" key="back" onClick={this.handleCancel}>
              关闭
            </Button>
          ]}
        {...modalInfoProps}
        >
          <Form layout="horizontal">
            <FormItem label={i18n.t`日志名称`} {...detailFormItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
              })(<span>{item.name}</span>)}
            </FormItem>
            <FormItem label={i18n.t`日志类型`} {...detailFormItemLayout}>
              {getFieldDecorator('log_type', {
                initialValue: item.log_type,
              })(<span>{item.log_type}</span>)}
            </FormItem>
            <FormItem label={i18n.t`操作详情`} {...detailFormItemLayout}>
              {getFieldDecorator('log_detail', {
                initialValue: item.log_detail,
              })(<span>{item.log_detail}</span>)}
            </FormItem>
            <FormItem label={i18n.t`操作时间`} {...detailFormItemLayout}>
              {getFieldDecorator('create_time', {
                initialValue: item.create_time,
              })(<span>{item.create_time}</span>)}
            </FormItem>
          </Form>
        </ModalInfo>
      )
    }
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default UserModal
