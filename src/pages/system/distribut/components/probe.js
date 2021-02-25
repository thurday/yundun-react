/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Button, AsyncSelect } from 'components'
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

  listData = () => {
    // const { listAsset } = this.props
    var data2=[{value:'1',label:'探针'},{value:'2',label:'管理端'},{value:'3',label:'管理端+探针'}];
    // listAsset.map((value,index,arry)=>{
    //   data2.push({ 'value': (value.id).toString(), 'label': (value.asset_group_name).toString() })
    // })
    return data2
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
        <FormItem label={i18n.t`当前身份`} {...formItemLayout}>
          <span>{'管理端+探针'}</span>
        </FormItem>
        <FormItem label={i18n.t`选择身份`} {...formItemLayout}>
            {getFieldDecorator('ip', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message:'IP不能为空'
                },
              ],
            })(<AsyncSelect defaultOptions={this.listData()} allowClear={false} width={'80%'} onChange={this.handleChange.bind(this, 'days')} />)}
        </FormItem>
        <FormItem label={i18n.t`上级IP`} {...formItemLayout}>
            {getFieldDecorator('ip', {
                // initialValue: filter.mac,
            })(
                <Input allowClear />
            )}
        </FormItem>
        <FormItem {...formItemLayout} style={{textAlign:'center'}}>
            <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                <Trans>确定</Trans>
            </Button>
            <Button onClick={this.handleReset}>
                <Trans>重置</Trans>
            </Button>
        </FormItem>
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
