/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import moment from 'moment'
import { SearchView, Button, AsyncSelect } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, InputNumber, Checkbox } from 'antd'
import { EVENT_TYPES } from 'utils/constant'
import styles from '../index.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 22,
    offset: 1,
  },
}

// const DATA = ['3天', '1周', '1个月'].map((v) => ({ label: v, value: v }))
const DATA = [{label:'1天',value:1},{label:'3天',value:3},{label:'1周',value:7},{label:'1个月',value:30}].map((v)=>({label:v.label,value:v.value}))
@withI18n()
@Form.create()
@SearchView
class Filter extends Component {

  handleFields = fields => {
    return fields
  }

  handleChange = (key, values) => {
    const { form, onFilterChange,filter } = this.props
    const { getFieldsValue } = form
    let fields = filter
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { filter, loading, form, onAdd, i18n } = this.props
    const { getFieldDecorator } = form

    const optionsWithDisabled = [
      { label: '威胁事件总数', value: '0' },
      { label: '高危事件', value: '1' },
      { label: '中危事件', value: '2' },
      { label: '低危事件', value: '3' },
      { label: '安全趋势', value: '4' },
      { label: '威胁类型', value: '5' },
      { label: '事件源地址', value: '6' },
      { label: '事件目标地址', value: '7' },
      { label: '最新事件', value: '8' },
    ];
    return (
      <Spin spinning={loading}>
        <Form layout="horizontal" className={styles.form}>
          <FormItem label={i18n.t`威胁事件总数设置`} {...formItemLayout}>
            <div>显示时间范围 <AsyncSelect allowClear={false} defaultOptions={DATA} value={filter.dateRange} width={80} onChange={this.handleChange.bind(this, 'dateRange')} /></div>
          </FormItem>
          {/* <FormItem label={i18n.t`威胁类型设置`} {...formItemLayout}>
            <div>
              <Checkbox.Group 
                options={EVENT_TYPES}
                value={filter.warn!=null?filter.warn.split(','):filter.warn}
                onChange={this.handleChange.bind(this, 'warn')}
              />
            </div>
          </FormItem> */}
          <FormItem label={i18n.t`最新事件设置`} {...formItemLayout}>
            <div>显示数量 <InputNumber min={0} value={filter.showLength} onChange={this.handleChange.bind(this, 'showLength')} /></div>
          </FormItem>
          {/* <FormItem label={i18n.t`模块显示设置`} {...formItemLayout}>
          <Checkbox.Group
            options={optionsWithDisabled}
            value={filter.modal!=null?filter.modal.split(','):filter.modal}
            onChange={this.handleChange.bind(this, 'modal')}
          />
          </FormItem> */}
        </Form>
      </Spin>
      
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: '20px 0', minHeight: 520 }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onAdd: PropTypes.func,
  onFilterChange: PropTypes.func,
}

export default Filter
