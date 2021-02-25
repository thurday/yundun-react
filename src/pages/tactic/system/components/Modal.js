import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Checkbox } from 'antd'
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
    const { item = {}, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form

    const options = [
      // { label: '声音提示', value: 'voice' },
      // { label: '弹框提示', value: 'window' },
      { label: '邮件', value: 'email' },
      { label: 'syslog', value: 'syslog' },
    ];
    const agreementList = [{value:'IP',label:'IP'},{value:'TCP',label:'TCP'},{value:'UDP',label:'UDP'},{value:'ICMP',label:'ICMP'},{value:'ARP',label:'ARP'},{value:'RIP',label:'RIP'},{value:'RPC',label:'RPC'},{value:'HTTP',label:'HTTP'},{value:'FTP',label:'FTP'},{value:'TFTP',label:'TFTP'},{value:'IMAP',label:'IMAP'},{value:'SNMP',label:'SNMP'},{value:'TELNET',label:'TELNET'},{value:'DNS',label:'DNS'},{value:'SMTP',label:'SMTP'},{value:'POP3',label:'POP3'},{value:'NETBIOS',label:'NETBIOS'},{value:'NFS',label:'NFS'}]
    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`名称`} {...formItemLayout}>
            {getFieldDecorator('cnRuleName', {
              initialValue: item.cnRuleName || item.ruleName,
            })(<Input allowClear disabled />)}
          </FormItem>
          <FormItem label={i18n.t`事件类型`} {...formItemLayout}>
            {getFieldDecorator('eventTypeName', {
              initialValue: item.eventTypeName,
            })(<AsyncSelect disabled defaultOptions={this.listData()} width="100%" />)}
          </FormItem>
          <FormItem label={i18n.t`添加规则`} {...formItemLayout}>
            {getFieldDecorator('ruleDetail', {
              initialValue: item.ruleDetail,
            })(<Input.TextArea disabled rows={3} />)}
          </FormItem>
          <FormItem label={i18n.t`添加协议`} {...formItemLayout}>
              {getFieldDecorator('protocolType', {
                initialValue: item.protocolType,
              })(<Input allowClear disabled />)}
            </FormItem>
          <FormItem label={i18n.t`漏洞详情`} {...formItemLayout}>
            {getFieldDecorator('ruleDes', {
              initialValue: item.ruleDes,
            })(<Input.TextArea disabled rows={3} />)}
          </FormItem>
          <FormItem label={i18n.t`解决方案`} {...formItemLayout}>
            {getFieldDecorator('solution', {
              initialValue: item.solution,
            })(<Input.TextArea disabled rows={3} />)}
          </FormItem>
          <FormItem label={i18n.t`备注`} {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
            })(<Input.TextArea disabled rows={4} />)}
          </FormItem>
          <FormItem label={i18n.t`告警方式`} {...formItemLayout}>
            <div>
              {getFieldDecorator('warnningType', {
                initialValue: item.warnningType!=null?item.warnningType.split(','):item.warnningType,
              })(<Checkbox.Group disabled options={options}></Checkbox.Group>)}
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
