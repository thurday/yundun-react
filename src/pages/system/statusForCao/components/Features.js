/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

const DATA = [60, 90, 120, 180].map((v) => ({ label: v, value: v }))
const COUNT_DATA = [3, 6, 9].map((v) => ({ label: v, value: v }))
const SPACE_DATA = [85, 90, 95].map((v) => ({ label: v, value: v }))

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  handleFields = fields => {
    return fields
  }

  handleChange = (key, values) => {
    const { form, onFirewallChange,filter } = this.props
    const { getFieldsValue } = form
    let fields = filter
    fields[key] = values
    fields = this.handleFields(fields)
    onFirewallChange(fields)
  }

  render() {
    const { filter, form, i18n } = this.props
    const { getFieldDecorator } = form
    
    return (
      <Form layout="horizontal" className={styles.form}>
        <FormItem label={i18n.t`防火墙联动`} {...formItemLayout}>
          <div>是否开启防火墙联动：<Switch checked={filter.isCover=="1"?true:false} onChange={this.handleChange.bind(this, 'isCover')} /></div>
        </FormItem>
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
  onFirewallChange: PropTypes.func,
}

export default Filter
