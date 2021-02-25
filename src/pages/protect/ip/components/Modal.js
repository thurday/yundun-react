import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect } from 'components'

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
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`源IP`} {...formItemLayout}>
            {getFieldDecorator('srcip', {
              initialValue: item.srcip,
              rules: [
                {
                    required: true,
                    message:'源IP不能为空'
                },
                {
                    pattern:/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/,
                    message:'请输入正确的IP格式'
                }
              ],
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`源端口`} {...formItemLayout}>
            <div>
              {getFieldDecorator('srcport', {
                initialValue: item.srcport,
                rules: [
                  {
                    required: true,
                    pattern: /^[0-9]+$/,
                    message:'请输入整数！'
                  },
                ],
              })(<InputNumber min={0} max={65535} style={{ width: 120, marginRight: 10 }} />)}
              <span>(0-65535)</span>
            </div>
          </FormItem>
          <FormItem label={i18n.t`目标IP`} {...formItemLayout}>
            {getFieldDecorator('distip', {
              initialValue: item.distip,
              rules: [
                {
                    required: true,
                    message:'源IP不能为空'
                },
                {
                    pattern:/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/,
                    message:'请输入正确的IP格式'
                }
              ],
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`目标端口`} {...formItemLayout}>
            <div>
              {getFieldDecorator('distport', {
                initialValue: item.distport,
                rules: [
                  {
                    required: true,
                    pattern: /^[0-9]+$/,
                    message:'请输入整数！'
                  },
                ],
              })(<InputNumber min={0} max={65535} style={{ width: 120, marginRight: 10 }} />)}
              <span>(0-65535)</span>
            </div>
          </FormItem>
          {/* <FormItem label={i18n.t`协议`} {...formItemLayout}>
            <div>
              {getFieldDecorator('protocol', {
                initialValue: item.protocol || 'TCP',
              })(<AsyncSelect allowClear={false} defaultOptions={['TCP', 'UDP'].map((v) => ({ label: v, value: v }))} placeholder={i18n.t`请选择`} width="120px" />)}
              <span style={{ marginLeft: 10 }}>(TCP, UDP)</span>
            </div>
          </FormItem> */}
          <FormItem label={i18n.t`阻断时长`} {...formItemLayout}>
            <div>
              {getFieldDecorator('blockTime', {
                initialValue: item.blockTime || 60,
                rules: [
                  {
                    required: true,
                    message:'阻断时长不能为空'
                  },
                ],
              })(<InputNumber min={-1} style={{ width: 120, marginRight: 10 }} />)}
              <span>秒(-1为无限)</span>
            </div>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
