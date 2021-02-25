import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, Spin } from 'antd'
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
const childFormItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
@withI18n()
@Form.create()
class UserModal extends PureComponent {
  state = {
    port: true,
    payload: true,
  };
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

  handleOnCancel = () => {
    const { onCancel } = this.props
    onCancel()
  }

  handlePing = () => {
    const { item = {}, onPing, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onPing(data)
    })
  }
  
  render() {
    const { item = {}, onOk, form, i18n, modalType, loading, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form
    const radioData = [{ value: '0', label: '防火墙' }, { value: '1', label: '漏洞扫描' }, { value: '2', label: '交换机' }]
    console.log(this.props)
    return (
      <Modal 
        {...modalProps} 
        footer={[
          <Button type="primary" onClick={this.handlePing}>
          测试
          </Button>,
          <Button type="primary" onClick={this.handleOk}>
          确定
          </Button>,
          <Button onClick={this.handleOnCancel}>
            取消
          </Button>, ]}
      >
        <Spin spinning={loading.global}>
          <Form layout="horizontal">
          <FormItem label={i18n.t`联动方式`} {...formItemLayout}>
              {getFieldDecorator('type', {
                initialValue: item.type,
                rules: [
                  {
                      required: true,
                      message:'请选择联动方式'
                  },
                ],
              })(<div><Radio.Group defaultValue={item.type} options={radioData} /><div>请使用XXXX品牌XXX型号进行联动</div></div>)}
            </FormItem>
            <FormItem label={i18n.t`名称`} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                      required: true,
                      message:'名称不能为空'
                  },
                ],
              })(<Input allowClear />)}
            </FormItem>
            <FormItem label={i18n.t`关联地址`} {...formItemLayout}>
              {getFieldDecorator('port', {
                initialValue: item.port,
                rules: [
                  {
                      required: true,
                      message:'关联地址不能为空'
                  },
                ],
              })(<Input allowClear />)}
            </FormItem>
            <FormItem label={i18n.t`身份验证`} {...formItemLayout}>
                <div>
                  <FormItem label={i18n.t`key`} {...childFormItemLayout}>
                    {getFieldDecorator('key', {
                      initialValue: item.key,
                      rules: [
                        {
                            required: false,
                            message:'key不能为空'
                        },
                      ],
                    })(<Input allowClear />)}
                  </FormItem>
                  <FormItem label={i18n.t`value`} {...childFormItemLayout}>
                    {getFieldDecorator('value', {
                      initialValue: item.value,
                      rules: [
                        {
                            required: false,
                            message:'value不能为空'
                        },
                      ],
                    })(<Input allowClear />)}
                  </FormItem>
                </div>
            </FormItem>
          </Form>
        </Spin>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  onPing: PropTypes.func,
}

export default UserModal
