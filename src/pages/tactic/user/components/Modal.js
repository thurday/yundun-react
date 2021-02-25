import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Checkbox, InputNumber, Radio } from 'antd'
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

  listData = () => {
    const { listAsset } = this.props
    var data2=[];
    listAsset.map((value,index,arry)=>{
      data2.push({ 'value': (value.id).toString(), 'label': value.desc!=null?(value.desc).toString():value.desc })
    })
    return data2
  }

  onCheckChange = (checkedValues) => {
    console.log(checkedValues);
  }
  

  render() {
    const { item = {}, onOk, form, i18n, modalType, onMailSetting, onSysLog, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form
    const data = [{ value: '1', label: '每日' }, { value: '7', label: '每周' }, { value: '30', label: '每月' }]
    const dataSysLog = [{ value: 'udp', label: 'UDP' }, { value: 'tcp', label: 'TCP' }]
    const agreementList = [{value:'IP',label:'IP'},{value:'TCP',label:'TCP'},{value:'UDP',label:'UDP'},{value:'ICMP',label:'ICMP'},{value:'ARP',label:'ARP'},{value:'RIP',label:'RIP'},{value:'RPC',label:'RPC'},{value:'HTTP',label:'HTTP'},{value:'FTP',label:'FTP'},{value:'TFTP',label:'TFTP'},{value:'IMAP',label:'IMAP'},{value:'SNMP',label:'SNMP'},{value:'TELNET',label:'TELNET'},{value:'DNS',label:'DNS'},{value:'SMTP',label:'SMTP'},{value:'POP3',label:'POP3'},{value:'NETBIOS',label:'NETBIOS'},{value:'NFS',label:'NFS'}]
    if(modalType === 'create'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`名称`} {...formItemLayout}>
              {getFieldDecorator('ruleName', {
                initialValue: item.ruleName,
                rules: [
                  {
                      required: true,
                      message:'名称不能为空'
                  },
                ],
              })(<Input allowClear />)}
            </FormItem>
            <FormItem label={i18n.t`事件类型`} {...formItemLayout}>
              {getFieldDecorator('eventType', {
                initialValue: item.eventType,
                rules: [
                  {
                      required: true,
                      message:'请选择事件类型'
                  },
                ],
              })(<AsyncSelect defaultOptions={this.listData()} placeholder={i18n.t`请选择事件类型`} width="100%" />)}
            </FormItem>
            <FormItem label={i18n.t`添加规则`} {...formItemLayout}>
              {getFieldDecorator('ruleDetail', {
                initialValue: item.ruleDetail,
                rules: [
                  {
                      required: true,
                      message:'规则不能为空'
                  },
                ],
              })(<Input.TextArea placeholder={i18n.t`此处填写tcp/ip报文信息，将自动根据特征生成规则`} rows={3} />)}
            </FormItem>
            <FormItem label={i18n.t`添加协议`} {...formItemLayout}>
              {getFieldDecorator('protocolType', {
                initialValue: item.protocolType,
                rules: [
                  {
                      required: true,
                      message:'协议不能为空'
                  },
                ],
              })(<AsyncSelect defaultOptions={agreementList} placeholder={i18n.t`请选择协议类型`} width="100%" />)}
            </FormItem>
            <FormItem label={i18n.t`漏洞详情`} {...formItemLayout}>
              {getFieldDecorator('ruleDes', {
                initialValue: item.ruleDes,
              })(<Input.TextArea rows={3} />)}
            </FormItem>
            <FormItem label={i18n.t`解决方案`} {...formItemLayout}>
              {getFieldDecorator('solution', {
                initialValue: item.solution,
              })(<Input.TextArea rows={3} />)}
            </FormItem>
            <FormItem label={i18n.t`备注`} {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: item.remark,
              })(<Input.TextArea rows={4} />)}
            </FormItem>
            <FormItem label={i18n.t`告警方式`} {...formItemLayout}>
              <div>
                {getFieldDecorator('warnningType', {
                  initialValue: item.warnningType,
                })(<Checkbox.Group>
                  {/* <Checkbox value="voice">声音提示</Checkbox>
                  <Checkbox style={{marginLeft:10}} value="windows">弹框提示</Checkbox> */}
                  <Checkbox style={{marginLeft:10}} value="email">邮件</Checkbox>
                  <a style={{ color: '#71bfb4' }} onClick={onMailSetting}>（发送邮件配置）</a>
                  <Checkbox style={{marginLeft:10}} value="syslog">syslog</Checkbox>
                  <a style={{ color: '#71bfb4' }} onClick={onSysLog}>（SYSLOG配置）</a>
                </Checkbox.Group>)}
              </div>
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'update'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`名称`} {...formItemLayout}>
              {getFieldDecorator('ruleName', {
                initialValue: item.ruleName,
                rules: [
                  {
                      required: true,
                      message:'名称不能为空'
                  },
                ],
              })(<Input allowClear />)}
            </FormItem>
            <FormItem label={i18n.t`事件类型`} {...formItemLayout}>
              {getFieldDecorator('eventType', {
                initialValue: item.eventType,
                rules: [
                  {
                      required: true,
                      message:'请选择事件类型'
                  },
                ],
              })(<AsyncSelect defaultOptions={this.listData()} placeholder={i18n.t`请选择事件类型`} width="100%" />)}
            </FormItem>
            <FormItem label={i18n.t`添加规则`} {...formItemLayout}>
              {getFieldDecorator('ruleDetail', {
                initialValue: item.ruleDetail,
                rules: [
                  {
                      required: true,
                      message:'添加规则不能为空'
                  },
                ],
              })(<Input.TextArea placeholder={i18n.t`此处填写tcp/ip报文信息，将自动根据特征生成规则`} rows={3} />)}
            </FormItem>
            <FormItem label={i18n.t`添加协议`} {...formItemLayout}>
              {getFieldDecorator('protocolType', {
                initialValue: item.protocolType,
                rules: [
                  {
                      required: true,
                      message:'协议不能为空'
                  },
                ],
              })(<AsyncSelect defaultOptions={agreementList} placeholder={i18n.t`请选择协议类型`} width="100%" />)}
            </FormItem>
            <FormItem label={i18n.t`漏洞详情`} {...formItemLayout}>
              {getFieldDecorator('ruleDes', {
                initialValue: item.ruleDes,
              })(<Input.TextArea rows={3} />)}
            </FormItem>
            <FormItem label={i18n.t`解决方案`} {...formItemLayout}>
              {getFieldDecorator('solution', {
                initialValue: item.solution,
              })(<Input.TextArea rows={3} />)}
            </FormItem>
            <FormItem label={i18n.t`备注`} {...formItemLayout}>
              {getFieldDecorator('remark', {
                initialValue: item.remark,
              })(<Input.TextArea rows={4} />)}
            </FormItem>
            <FormItem label={i18n.t`告警方式`} {...formItemLayout}>
              <div>
                {getFieldDecorator('warnningType', {
                  initialValue: item.warnningType!=null?item.warnningType.split(','):item.warnningType,
                })(<Checkbox.Group>
                  {/* <Checkbox value="voice">声音提示</Checkbox>
                  <Checkbox style={{marginLeft:10}} value="windows">弹框提示</Checkbox> */}
                  <Checkbox style={{marginLeft:10}} value="email">邮件</Checkbox>
                  <a style={{ color: '#71bfb4' }} onClick={onMailSetting}>（发送邮件配置）</a>
                  <Checkbox style={{marginLeft:10}} value="syslog">syslog</Checkbox>
                  <a style={{ color: '#71bfb4' }} onClick={onSysLog}>（SYSLOG配置）</a>
                </Checkbox.Group>)}
              </div>
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'email'){
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
    }else if(modalType === 'sysLog'){
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
              })(<Radio.Group options={dataSysLog} />)}
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
