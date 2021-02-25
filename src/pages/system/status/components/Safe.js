/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import moment from 'moment'
import { SearchView, Button, AsyncSelect } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Switch, Input } from 'antd'
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
const SIGN_DATA = [1,5,10,30,60].map((v) => ({ label: v, value: v }))
const DATA = [5,10,15,30,60].map((v) => ({ label: v, value: v }))
const COUNT_DATA = [3, 5, 10].map((v) => ({ label: v, value: v }))
const SPACE_DATA = [85, 90, 95].map((v) => ({ label: v, value: v }))
const OVER_TIME = [{value:5,label:'5'},{value:30,label:'30'},{value:60,label:'60'},{value:1440,label:'24小时'},{value:0,label:'永久'}].map((v) => ({ label: v.label, value: v.value }))
const IDENTIFY_DATA = [{value:'1',label:'用户名+密码'},{value:'2',label:'证书'}]

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  handleFields = fields => {
    return fields
  }

  handleChange = (key, values) => {
    const { form, onSafeChange,filter } = this.props
    const { getFieldsValue } = form
    let fields = filter
    fields[key] = values
    fields = this.handleFields(fields)
    onSafeChange(fields)
  }

  handleStorageChange = (key, values) => {
    const { form, onStorageChange,storage } = this.props
    const { getFieldsValue } = form
    let fields = storage
    fields[key] = values
    fields = this.handleFields(fields)
    onStorageChange(fields)
  }

  handleIdentifyChange = (key, values) => {
    const { form, onIdentifyChange,identify } = this.props
    const { getFieldsValue } = form
    let fields = identify
    fields[key] = values
    fields = this.handleFields(fields)
    onIdentifyChange(values)
  }

  render() {
    const { filter, storage, identify, form, loading, onAdd, i18n } = this.props
    const { getFieldDecorator } = form
    return (
      <Spin spinning={loading}>
        <Form layout="horizontal" className={styles.form}>
          <FormItem label={i18n.t`系统登录安全设置`} {...formItemLayout}>
            <div><AsyncSelect allowClear={false} defaultOptions={SIGN_DATA} value={filter.sysTime} width={80} onChange={this.handleChange.bind(this, 'sysTime')} /> 秒之内，用户尝试登录的失败次数超过 <AsyncSelect allowClear={false} defaultOptions={COUNT_DATA} value={filter.sysNumber} width={80} onChange={this.handleChange.bind(this, 'sysNumber')} /> 次，锁定该用户 <AsyncSelect allowClear={false} defaultOptions={DATA} value={filter.sysLocktime} width={80} onChange={this.handleChange.bind(this, 'sysLocktime')} /> 分钟</div>
          </FormItem>
          <FormItem label={i18n.t`超时设置`} {...formItemLayout}>
            <div><AsyncSelect allowClear={false} defaultOptions={OVER_TIME} value={filter.timeOut} width={80} onChange={this.handleChange.bind(this, 'timeOut')} /> 分钟之内，用户无任何操作，系统将因超时而自动登出</div>
          </FormItem>
          <FormItem label={i18n.t`事件存储设置`} {...formItemLayout}>
            <div>当使用存储空间超过 <AsyncSelect allowClear={false} defaultOptions={SPACE_DATA} value={storage.value} width={80} onChange={this.handleStorageChange.bind(this, 'value')} /> %，系统产生告警</div>
          </FormItem>
          {/* <FormItem label={i18n.t`服务器资源设置`} {...formItemLayout}>
            <div>当存储空间即将占满，是否开启循环覆盖：<Switch checked={filter.isCover=="1"?true:false} onChange={this.handleChange.bind(this, 'isCover')} /></div>
          </FormItem> */}
          <FormItem label={i18n.t`多重鉴别方式`} {...formItemLayout}>
            <div>鉴权方式 <AsyncSelect allowClear={false} defaultOptions={IDENTIFY_DATA} value={identify.value} width={'30%'} onChange={this.handleIdentifyChange.bind(this, 'value')} /></div>
          </FormItem>
        </Form>
      </Spin>
      
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: '20px 0' }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  storage: PropTypes.object,
  onAdd: PropTypes.func,
  onSafeChange: PropTypes.func,
  onStorageChange: PropTypes.func,
  onIdentifyChange: PropTypes.func,
}

export default Filter
