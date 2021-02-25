import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form,Input, InputNumber} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Page, Button ,SearchView} from 'components'
import store from 'store'


const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 4,
  },
}
@withI18n()
@Form.create()
@SearchView
class PwdCenter extends PureComponent {
  constructor(props) {
    super()
    this.state = {
      translate:false
    }
  }

  handleConfirmPassword = (rule, value, callback) => {
    const { form, i18n } = this.props
    const { getFieldValue } = form
    if (value && value !== getFieldValue('password')) {
      callback(i18n.t`两次输入密码不一致`)
    }
    callback()
  }

  handleSubmit = () => {
    const { filter, onUserInfoChange, form ,item} = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onUserInfoChange(data)
    })
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    const { status } = fields
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue({
      ...fields,
    })
    this.handleSubmit()
  }

  changeTranslate = () => {
    this.setState({
      translate:!this.state.translate
    })
  }


  render() {
    const user = store.get('user') || {}
    const { item , onOk, form, i18n} = this.props
    const { getFieldDecorator } = form
    return (
      <Page>
        <p>修改密码</p>
       <Form layout="horizontal">
        <FormItem label={i18n.t`原密码`} {...formItemLayout}>
        {getFieldDecorator('oldPassword', {
          initialValue:'',
          rules: [
            {
              required: true,
              message:'请输入原密码'
            },
          ],
        })(<Input allowClear type={'password'} autoComplete='old-password' placeholder={i18n.t`请输入原密码`} />)}
        </FormItem>
        <FormItem label={i18n.t`新密码`} {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue:'',
            rules: [
              {
                required: true,
                pattern: '(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,20}',
                message:'请输入8-20位密码，由大小写字母、数字、特殊字符组成'
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
          })(<Input allowClear type={'password'} autoComplete='new-password' minLength={8} maxLength={20} placeholder={i18n.t`请输入8-20位密码，由字母大小写、数字、特殊字符组成`} />)}
        </FormItem>
        <FormItem label={i18n.t`确认密码`} {...formItemLayout}>
          {getFieldDecorator('newPassword', {
            initialValue: item.newPassword,
            rules: [
              {
                required: true,
                message:'请输入8-20位密码，由大小写字母、数字、特殊字符组成'
              },
              {
                validator: this.handleConfirmPassword,
              },
            ],
          })(<Input allowClear type={'password'} autoComplete='new-password' minLength={8} maxLength={20} placeholder={i18n.t`请确认密码`} />)}
        </FormItem>
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
              <Trans>保存</Trans>
          </Button>
          <Button onClick={this.handleReset}>
              <Trans>重置</Trans>
          </Button>
        </div>
        </Form>
      </Page>
    )
  }
}

PwdCenter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  // onFilterChange: PropTypes.func,
}

export default PwdCenter