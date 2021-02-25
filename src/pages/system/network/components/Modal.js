import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Avatar,Spin, Tooltip } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect } from 'components'
import { ROLES } from 'utils/constant'

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

  handleConfirmPassword = (rule, value, callback) => {
    const { form, i18n } = this.props
    const { getFieldValue } = form
    if (value && value !== getFieldValue('password')) {
      callback(i18n.t`两次输入密码不一致`)
    }
    callback()
  }

  render() {
    const { systemNetwork, confirmLoading, item = {}, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const option = [{value:'1',label:'主机'},{value:'2',label:'备机'}]
    const interfaceList = [{value:'镜像口',label:'镜像口'},{value:'管理口',label:'管理口'}]

    if(modalType === 'create'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
              <FormItem label={i18n.t`设备IP`} {...formItemLayout}>
              {getFieldDecorator('host', {
                  initialValue: item.host,
                  rules: [
                  {
                      required: true,
                      message:'设备IP不能为空'
                  },
                  {
                      pattern:/^(?!^255(\.255){3}$)(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])(\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)){2}\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/,
                      message:'ip格式错误'
                  }
                  ],
              })(
                  <Input allowClear onPressEnter={this.handleSubmit} />
              )}
              </FormItem>
              <FormItem label={i18n.t`设备端口`} {...formItemLayout}>
              {getFieldDecorator('port', {
                  initialValue: item.port,
                  rules: [
                  {
                      required: true,
                      message:'设备端口不能为空'
                  },
                  ],
              })(
                  <Input allowClear onPressEnter={this.handleSubmit} />
              )}
              </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'identity'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
              <FormItem label={i18n.t`身份设置`} {...formItemLayout}>
              {getFieldDecorator('identity', {
                  initialValue: item.identity,
                  rules: [
                  {
                      required: true,
                      message:'请选择身份'
                  },
                  ],
              })(
                <AsyncSelect defaultOptions={option} placeholder={i18n.t`请选择身份`} width="100%" />
              )}
              </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'setManagerConfig'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Spin spinning={confirmLoading==true?true:false}>
          <Form layout="horizontal">
              <FormItem label={i18n.t`接口名称`} {...formItemLayout}>
                <span>{item.name}</span>
              </FormItem>
              <Tooltip placement="top" title="管理口和镜像口IP段不能相同" arrowPointAtCenter>
                <FormItem label={item.aliasName=='管理口'?i18n.t`管理口IP`:i18n.t`镜像口IP`} {...formItemLayout}>
                {getFieldDecorator('ip', {
                    initialValue: item.ip,
                    rules: [
                    {
                        required: false,
                        message:'ip不能为空'
                    },
                    {
                        pattern:/^(?!^255(\.255){3}$)(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])(\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)){2}\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])$/,
                        message:'ip格式错误'
                    }
                    ],
                })(
                    <Input allowClear onPressEnter={this.handleSubmit} />
                )}
                </FormItem>
              </Tooltip>
              <Tooltip placement="top" title="管理口和镜像口IP段不能相同" arrowPointAtCenter>
                <FormItem label={i18n.t`网关`} {...formItemLayout}>
                {getFieldDecorator('gateway', {
                    initialValue: item.gateway,
                    rules: [
                    {
                        required: true,
                        message:'网关不能为空'
                    },
                    ],
                })(
                    <Input allowClear onPressEnter={this.handleSubmit} />
                )}
                </FormItem>
              </Tooltip>
              <FormItem label={i18n.t`子网掩码`} {...formItemLayout}>
              {getFieldDecorator('netmask', {
                  initialValue: item.netmask,
                  rules: [
                  {
                      required: true,
                      message:'子网掩码不能为空'
                  },
                  {
                      pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/,
                      message:'子网掩码格式错误'
                  }
                  ],
              })(
                  <Input allowClear onPressEnter={this.handleSubmit} />
              )}
              </FormItem>
              <FormItem label={i18n.t`DNS`} {...formItemLayout}>
              {getFieldDecorator('dns', {
                  initialValue: item.dns,
                  rules: [
                  {
                      required: false,
                      message:'DNS不能为空'
                  },
                  ],
              })(
                  <Input allowClear onPressEnter={this.handleSubmit} />
              )}
              </FormItem>
              <FormItem label={i18n.t`接口类型`} {...formItemLayout}>
              {getFieldDecorator('aliasName', {
                  initialValue: item.aliasName,
                  rules: [
                  {
                      required: true,
                      message:'接口类型'
                  },
                  ],
              })(<AsyncSelect defaultOptions={interfaceList} placeholder={i18n.t`请选择接口类型`} width="100%" />)}
              </FormItem>
              <FormItem label={i18n.t`MAC`} {...formItemLayout}>
              {getFieldDecorator('mac', {
                  initialValue: item.mac,
              })(
                  <Input disabled allowClear onPressEnter={this.handleSubmit} />
              )}
              </FormItem>
          </Form>
          </Spin>
          
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
