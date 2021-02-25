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
class RuleMouldListModal extends PureComponent {
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
        status: item.status
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
          <FormItem label={i18n.t`策略名称`} {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                    required: true,
                    message:'策略名称不能为空'
                },
              ],
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`策略描述`} {...formItemLayout}>
            {getFieldDecorator('describe', {
              initialValue: item.describe,
            })(<Input allowClear maxLength={200} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

RuleMouldListModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default RuleMouldListModal
