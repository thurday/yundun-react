import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect } from 'components'
import { LEVELS, EVENT_TYPES } from 'utils/constant'

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
class StressModal extends PureComponent {
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
          <FormItem label={i18n.t`IP`} {...formItemLayout}>
            {getFieldDecorator('followIp', {
              initialValue: item.followIp,
              rules: [
                {
                    required: true,
                    message:'ip不能为空'
                },
                {
                    pattern:/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/,
                    message:'请输入正确的IP格式'
                }
              ],
            })(<Input allowClear placeholder={i18n.t`例如：192.168.1.1`} />)}
          </FormItem>
          <FormItem label={i18n.t`备注`} {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
              rules: [
                {
                  required: false,
                  message:'备注不能为空'
                },
                {
                  max:20,
                  message: '备注内容不能大于20个字',
                }
              ],
            })(<Input allowClear maxLength={200} placeholder={i18n.t`请输入备注内容，最大长度为20字符`} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

StressModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default StressModal
