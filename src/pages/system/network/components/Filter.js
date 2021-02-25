/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Input } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
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
    const { onFilterChange, form } = this.props
    const { validateFields, getFieldsValue } = form

    validateFields(errors => {
      if (errors) {
        return
      }
      let fields = getFieldsValue()
      fields = this.handleFields(fields)
      onFilterChange(fields)
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

  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { filter, form, i18n } = this.props
    const { getFieldDecorator } = form
    return (
      <Form layout="horizontal">
        <FormItem label={i18n.t`管理口IP`} {...formItemLayout}>
          {getFieldDecorator('ip', {
            initialValue: filter.ip,
            rules: [
              {
                required: true,
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
        <FormItem label={i18n.t`网关`} {...formItemLayout}>
          {getFieldDecorator('gateway', {
            initialValue: filter.gateway,
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
        <FormItem label={i18n.t`子网掩码`} {...formItemLayout}>
          {getFieldDecorator('netmask', {
            initialValue: filter.netmask,
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
            initialValue: filter.dns,
            rules: [
              {
                required: true,
                message:'DNS不能为空'
              },
            ],
          })(
            <Input allowClear onPressEnter={this.handleSubmit} />
          )}
        </FormItem>
        <FormItem label={i18n.t`MAC`} {...formItemLayout}>
          {getFieldDecorator('mac', {
            initialValue: filter.mac,
          })(
            <Input allowClear onPressEnter={this.handleSubmit} />
          )}
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
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: 20 }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
