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

  onChange = (checkedValues) => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form
    if(checkedValues.indexOf('1')>-1){
      this.setState({port:true})
    }else{
      this.setState({port:false})
    }

    if(checkedValues.indexOf('2')>-1){
      this.setState({payload:true})
    }else{
      this.setState({payload:false})
    }
  }

  get matchType() {
    // const { dispatch, event, loading } = this.props
    // const { list = [] } = event.typeEvent
    // const threat_type = list.map((v) => ({ value: v.eventtype, label: v.eventtype }))
    // console.log(threat_type)
    const matchType = [{value:'ip',label:'源地址'},{value:'host',label:'源端口'},{value:'type',label:'协议类型'}]
    return {
        matchType, // 匹配字段

    }
  }

  listContent = () => {
    const { item = {}, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form
    if(getFieldValue('matchingType').indexOf('0')>-1 && getFieldValue('matchingType').indexOf('1')==-1){
      return (
        <FormItem label={i18n.t`端口`} {...formItemLayout}>
          {getFieldDecorator('port', {
            initialValue: item.port,
            rules: [
              {
                  required: true,
                  message:'端口不能为空'
              },
            ],
          })(<Input />)}
        </FormItem>
      )
    }else if(getFieldValue('matchingType').indexOf('1')>-1 && getFieldValue('matchingType').indexOf('0')==-1){
      return (
        <FormItem label={i18n.t`报文规则`} {...formItemLayout}>
          {getFieldDecorator('payload', {
            initialValue: item.payload,
            rules: [
              {
                  required: true,
                  message:'报文规则不能为空'
              },
            ],
          })(<Input placeholder={i18n.t`此处填写会在自定义协议中必定出现的tcp/ip报文信息`} />)}
        </FormItem>
      )
    }else if(getFieldValue('matchingType').indexOf('1')>-1 && getFieldValue('matchingType').indexOf('0')>-1){
      return (
        <div>
          <FormItem label={i18n.t`端口`} {...formItemLayout}>
            {getFieldDecorator('port', {
              initialValue: item.port,
              rules: [
                {
                    required: true,
                    message:'端口不能为空'
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`报文规则`} {...formItemLayout}>
            {getFieldDecorator('payload', {
              initialValue: item.payload,
              rules: [
                {
                    required: true,
                    message:'报文规则不能为空'
                },
              ],
            })(<Input placeholder={i18n.t`此处填写会在自定义协议中必定出现的tcp/ip报文信息`} />)}
          </FormItem>
        </div>
        
      )
    }
  }
  
  render() {
    const { item = {}, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form
    const agreement = [{value:'TCP',label:'TCP'},{value:'UDP',label:'UDP'}]
    const match = [{value:'0',label:'基于端口'},{value:'1',label:'基于报文'}]

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`协议名称`} {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                    required: true,
                    message:'协议名称不能为空'
                },
              ],
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`协议类型`} {...formItemLayout}>
            {getFieldDecorator('type', {
              initialValue: item.type,
              rules: [
                {
                    required: true,
                    message:'请选择协议类型'
                },
              ],
            })(<AsyncSelect defaultOptions={agreement} placeholder={i18n.t`请选择事件类型`} width="100%" />)}
          </FormItem>
          <FormItem label={i18n.t`匹配类型`} {...formItemLayout} name="checkbox-group">
            {getFieldDecorator('matchingType', {
              initialValue: item.matchingType!=null?item.matchingType.split(','):['0','1'],
              rules: [
                {
                    required: true,
                    message:'请选择匹配类型'
                },
              ],
            })(<Checkbox.Group options={match} onChange={this.onChange}></Checkbox.Group>)}
          </FormItem>
          {/* <FormItem label={i18n.t`端口`} {...formItemLayout}>
            {getFieldDecorator('port', {
              initialValue: item.port,
              rules: [
                {
                    required: true,
                    message:'端口不能为空'
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem label={i18n.t`报文规则`} {...formItemLayout}>
            {getFieldDecorator('payload', {
              initialValue: item.payload,
              rules: [
                {
                    required: true,
                    message:'报文规则不能为空'
                },
              ],
            })(<Input />)}
          </FormItem> */}
          {this.listContent()}
          <FormItem label={i18n.t`备注`} {...formItemLayout}>
            {getFieldDecorator('remark', {
              initialValue: item.remark,
            })(<Input.TextArea rows={3} />)}
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
