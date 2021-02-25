/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Progress, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Input } from 'antd'

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
@SearchView
class Filter extends Component {
    handleFields = fields => {
        return fields
      }
    
      handleSubmit = () => {
        const { filter, onFilterChange, form } = this.props
        const { validateFields, getFieldsValue } = form
    
        validateFields(errors => {
          if (errors) {
            return
          }
          const data = {
            ...getFieldsValue(),
            // id: filter.id,
          }
          onFilterChange(data)
        })
      }
    
      handleReset = () => {
        const { filter, onReset, form } = this.props
        const { validateFields, getFieldsValue } = form
    
        validateFields(errors => {
          if (errors) {
            return
          }
          const data = {
            ...getFieldsValue(),
          }
          onReset(data)
        })
      }

  render() {
    const { filter, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form

    return (
        <Form layout="horizontal">
            <FormItem label={i18n.t`设置重点关注事件(域名或IP)`} {...formItemLayout}>
              {getFieldDecorator('followIp', {
                initialValue: filter!=null?filter.replace(/[,，]/g,"\n"):'',
                rules: [
                  {
                      required: true,
                      message:'ip不能为空'
                  },
                  // {
                  //     pattern:/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/,
                  //     message:'请输入正确的IP格式'
                  // }
                ],
              })(<Input.TextArea rows={5} />)}
            </FormItem>
            <div style={{ textAlign: 'center' }}>
                <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                    <Trans>保存</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                    <Trans>重置</Trans>
                </Button>
            </div>
            <div style={{background:'#E1F0FF',padding:'20px',marginTop:'20px'}}>
                <h1>提示</h1>
                <p>IP地址（注：每行只能填写一个IP地址，请严格按照如下格式填写：</p>
                {/* <p>1. 域名：domain.com</p> */}
                <p>IP地址：10.10.1.123</p>
                {/* <p>2. IP地址段：10.10.1.1-10.10.1.90</p> */}
            </div>
        </Form>
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: '20px 0' }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onReset: PropTypes.func,
}

export default Filter
