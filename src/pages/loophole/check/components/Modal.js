import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input } from 'antd'
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

//ipv4校验
function isIPV4ValidIP(ip) {
  var v4reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return v4reg.test(ip);
} 

//ipv6校验
function isIPV6ValidIP(ip) {
  var v6reg = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/gm;       
  return v6reg.test(ip);
} 

//ip校验
function isIPValid(ip) {
 return isIPV6ValidIP(ip)&&isIPV4ValidIP(ip)
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
    const { item = {}, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator } = form
    if(modalType === 'create'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            {/* <FormItem label={i18n.t`名称`} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
              })(<Input allowClear />)}
            </FormItem>
            <FormItem label={i18n.t`描述`} {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: item.remark,
              })(<Input.TextArea rows={3} />)}
            </FormItem> */}
            <FormItem label={i18n.t`目标`} {...formItemLayout}>
              {getFieldDecorator('host', {
                initialValue: item.host,
                rules: [
                  {
                    required: true,
                    message:'请输入目标ip或域名'
                  },
                  {
                    // pattern: /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/,
                    pattern: /(\d{1,3}\.){3}\d{1,3}((\/\d{1,3})|(\-(\d{1,3}\.){3}\d{1,3}))?/,
                    message: '格式错误',
                  },
                ],
              })(<Input.TextArea rows={5} placeholder={i18n.t`例：192.168.1.1-192.168.1.5，192.168.2.0/24`} />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'update'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`站点名称`} {...formItemLayout}>
              {getFieldDecorator('host', {
                initialValue: item.host,
                rules: [
                  {
                    required: true,
                    message:'请输入站点名称'
                  },
                ],
              })(<Input />)}
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
