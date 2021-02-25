import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Radio, InputNumber, Checkbox, Switch } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal } from 'components'
import { EVENT_TYPES } from 'utils/constant'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const formSysLayout = {
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
        // eventTypeId:item.eventTypeId
      }
      onOk(data)
    })
  }

  onSwitchChange = (checked) => {
    console.log(checked);
  }

  listData = () => {
    const { listAsset } = this.props
    var data2=[];
    listAsset.map((value,index,arry)=>{
      data2.push({ 'value': (value.id).toString(), 'label': value.desc!=null?(value.desc).toString():value.desc })
    })
    return data2
  }

  renderEmail() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const data = [{ value: '1', label: '每日' }, { value: '7', label: '每周' }, { value: '30', label: '每月' }]
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`SMTP服务器`} {...formItemLayout}>
            {getFieldDecorator('smtpServer', {
              initialValue: item.smtpServer,
              rules: [
                {
                  required: true,
                  message:'SMTP服务器不能为空'
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入SMTP服务器地址，例如：smtp.example.com`} />)}
          </FormItem>
          <FormItem label={i18n.t`SMTP端口`} {...formItemLayout}>
            {getFieldDecorator('smtpPort', {
              initialValue: item.smtpPort,
              rules: [
                {
                  required: true,
                  pattern: /^[0-9]+$/,
                  message:'请输入整数！'
                },
              ],
            })(<InputNumber style={{ width: '100%' }} allowClear placeholder={i18n.t`请输入0~65535之间的整数`} maxLength={5} />)}
          </FormItem>
          <FormItem label={i18n.t`发件方邮件账号`} {...formItemLayout}>
            {getFieldDecorator('sender', {
              initialValue: item.sender,
              rules: [
                {
                  required: true,
                  message:'发件方邮件账号不能为空'
                },
                {
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                  message: i18n.t`The input is not valid E-mail!`,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入邮箱，例如：example@163.com`} />)}
          </FormItem>
          <FormItem label={i18n.t`发件方邮件密码`} {...formItemLayout}>
            {getFieldDecorator('senderPassword', {
              initialValue: item.senderPassword,
              rules: [
                {
                  required: true,
                  message:'发件方邮件密码不能为空'
                },
                {
                  min: 8,
                  message: '至少输入8位字符',
                },
                {
                  max: 20,
                  message: '至多输入20位字符',
                },
              ],
            })(<Input.Password  allowClear placeholder={i18n.t`请输入发件方邮件密码`} />)}
          </FormItem>
          <FormItem label={i18n.t`收件方邮件账号`} {...formItemLayout}>
            {getFieldDecorator('receiver', {
              initialValue: item.receiver,
              rules: [
                {
                  required: true,
                  message:'收件方邮件账号不能为空'
                },
                {
                  pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                  message: i18n.t`The input is not valid E-mail!`,
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入收件方邮件账号`} />)}
          </FormItem>
          <FormItem label={i18n.t`邮件标题`} {...formItemLayout}>
            {getFieldDecorator('mailTitle', {
              initialValue: item.mailTitle,
              rules: [
                {
                  required: true,
                  message:'邮件标题不能为空'
                },
              ],
            })(<Input allowClear placeholder={i18n.t`请输入邮件标题`} />)}
          </FormItem>
          <FormItem label={i18n.t`告警频率`} {...formItemLayout}>
            {getFieldDecorator('freq', {
              initialValue: item.freq,
              rules: [
                {
                  required: true,
                  message:'请选择告警频率'
                },
              ],
            })(<Radio.Group options={data} />)}
          </FormItem>
          <FormItem label={i18n.t`事件数量`} {...formItemLayout}>
            {getFieldDecorator('eventNum', {
              initialValue: item.eventNum,
              rules: [
                {
                  required: true,
                  pattern: /^[0-9]+$/,
                  message:'请输入整数'
                },
              ],
            })(<InputNumber style={{ width: '100%' }} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  renderEdit() {
    const { item = {}, onOk, onMailSetting, onSysLog, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const levels = [{ value: 3, label: '高危' }, { value: 2, label: '中危' }, { value: 1, label: '低危' }]
    const notices = [{ value: 'voice', label: '声音提示' },{ value: 'windows ', label: '弹框提示' },{ value: 'email', label: '邮件' },{ value: 'syslog', label: 'syslog' }]

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`风险等级`} {...formSysLayout}>
            {getFieldDecorator('level', {
              initialValue: item.level,
              rules: [
                {
                  required: true,
                  message:'请选择风险等级'
                },
              ],
            })(<Radio.Group options={levels} />)}
          </FormItem>
          <FormItem label={i18n.t`事件类型`} {...formSysLayout}>
            {getFieldDecorator('eventTypeId', {
              initialValue: item.eventTypeId,
              rules: [
                {
                  required: true,
                  message:'请选择事件类型'
                },
              ],
            })(<Radio.Group options={this.listData()} />)}
          </FormItem>
          <FormItem label={i18n.t`通知类型`} {...formSysLayout}>
            <div>
              {getFieldDecorator('warnningType', {
                initialValue: item.warnningType!=null?item.warnningType.split(','):item.warnningType,
                rules: [
                  {
                    required: true,
                    message:'请选择通知类型'
                  },
                ],
              })(<Checkbox.Group>
                <Checkbox value="voice">声音提示</Checkbox>
                <Checkbox style={{marginLeft:10}} value="windows">弹框提示</Checkbox>
                <Checkbox style={{marginLeft:10}} value="email">邮件</Checkbox>
                <a style={{ color: '#71bfb4' }} onClick={onMailSetting}>(发送邮件配置)</a>
                <Checkbox style={{marginLeft:10}} value="syslog">syslog</Checkbox>
                <a style={{ color: '#71bfb4' }} onClick={onSysLog}>(SYSLOG配置)</a>
              </Checkbox.Group>)}
            </div>
          </FormItem>
        </Form>
      </Modal>
    )
  }

  renderSysLog() {
    const { item = {}, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const data = [{ value: 'udp', label: 'UDP' }, { value: 'tcp', label: 'TCP' }]
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`配置IP`} {...formItemLayout}>
            {getFieldDecorator('ip', {
              initialValue: item.ip,
              rules: [
                {
                  required: true,
                  message:'配置IP不能为空'
                },
              ],
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`端口`} {...formItemLayout}>
            {getFieldDecorator('port', {
              initialValue: item.port,
              rules: [
                {
                  required: true,
                  pattern: /^[0-9]+$/,
                  message:'请输入整数！'
                },
              ],
            })(<InputNumber style={{ width: '100%' }} allowClear placeholder={i18n.t`请输入0~65535之间的整数`} maxLength={5} />)}
          </FormItem>
          {/* <FormItem label={i18n.t`运维信息`} {...formItemLayout}>
            {getFieldDecorator('status', {
              initialValue: item.status,
            })(<Switch onChange={this.onSwitchChange} />)}
          </FormItem> */}
          <FormItem label={i18n.t`协议类型`} {...formItemLayout}>
            {getFieldDecorator('protocol', {
              initialValue: item.protocol,
            })(<Radio.Group options={data} />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }

  render() {
    const { type } = this.props
    const view = type === 'email' ? this.renderEmail() : type === 'sysLog' ? this.renderSysLog() : this.renderEdit()

    return (
      <React.Fragment>{view}</React.Fragment>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
