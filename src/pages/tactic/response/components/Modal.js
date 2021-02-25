import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Checkbox, Select } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect } from 'components'

const FormItem = Form.Item

const SearchInput = Input.Search

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

  listContent = () => {
    const { item = {}, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form
    if(getFieldValue('responseMethod')==0){
      return (
        <FormItem label={i18n.t`事件名称`} {...formItemLayout}>
          {getFieldDecorator('methodName', {
            initialValue: this.props.item.methodName,
            rules: [
              {
                  required: true,
                  message:'请选择事件名称'
              },
            ],
          })(
            <Input allowClear />
            // <SearchInput placeholder="input search text" />
          )}
        </FormItem>
      );
    }else if(getFieldValue('responseMethod')==1){
      return (
        <FormItem label={i18n.t`IP`} {...formItemLayout}>
          {getFieldDecorator('methodName', {
            initialValue: this.props.item.methodName,
            rules: [
              {
                  required: true,
                  message:'ip不能为空'
              },
            ],
          })(<Input allowClear />)}
        </FormItem>
      )
    }
  }
  

  render() {
    const { item = {}, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form

    const options = [
      { label: '声音提示', value: 'voice' },
      { label: '弹框提示', value: 'window' },
      { label: '邮件', value: 'email' },
    ];
    

    if(modalType === 'create'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`响应方式`} {...formItemLayout}>
              {getFieldDecorator('responseMethod', {
                initialValue: item.responseMethod,
                rules: [
                  {
                      required: true,
                      message:'请选择响应方式'
                  },
                ],
              })(<AsyncSelect defaultOptions={[{value:0,label:'基于事件'},{value:1,label:'基于主机'}]} placeholder={i18n.t`请选择响应方式`} width="100%" />)}
            </FormItem>
            {this.listContent()}
            <FormItem label={i18n.t`告警方式`} {...formItemLayout}>
              <div>
                {getFieldDecorator('warn', {
                  initialValue: item.warn,
                })(<Checkbox.Group options={options}></Checkbox.Group>)}
              </div>
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'update'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`响应方式`} {...formItemLayout}>
              {getFieldDecorator('responseMethod', {
                initialValue: item.responseMethod,
                rules: [
                  {
                      required: true,
                      message:'请选择响应方式'
                  },
                ],
              })(<AsyncSelect defaultOptions={[{value:0,label:'基于事件'},{value:1,label:'基于主机'}]} placeholder={i18n.t`请选择响应方式`} width="100%" />)}
            </FormItem>
            {this.listContent()}
            <FormItem label={i18n.t`告警方式`} {...formItemLayout}>
              <div>
                {getFieldDecorator('warn', {
                  initialValue: item.warn!=null?item.warn.split(','):item.warn
                })(<Checkbox.Group options={options}></Checkbox.Group>)}
              </div>
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
