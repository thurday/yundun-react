import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form,Input, InputNumber, Spin} from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Page, Button ,SearchView} from 'components'
import store from 'store'


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
class UserCenter extends PureComponent {
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
        id: item.userId,
        username:item.username
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

  render() {
    const user = store.get('user') || {}
    const { item , onOk, form, loading, i18n} = this.props
    const { getFieldDecorator } = form
    return (
      <Page>
        <p>个人中心</p>
        <Spin spinning={loading}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`用户名`} {...formItemLayout}>
              <Input value={item.username} disabled/>
            </FormItem>
            <FormItem label={i18n.t`真实姓名`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message:'姓名不能为空'
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`手机号`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
                rules: [
                  {
                    required: true,
                    pattern: /^1[34578]\d{9}$/,
                    message: i18n.t`The input is not valid phone!`,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`邮箱`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    required: false,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: i18n.t`The input is not valid E-mail!`,
                  },
                ],
              })(<Input />)}
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
        </Spin>
      </Page>
    )
  }
}

UserCenter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  // onFilterChange: PropTypes.func,
}

export default UserCenter