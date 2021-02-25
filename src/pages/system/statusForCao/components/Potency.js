
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


@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  handleFields = fields => {
    return fields
  }

  handleChange = (key, values) => {
    const { form, onFirewallChange,firewallSwitch } = this.props
    const { getFieldsValue } = form
    let fields = firewallSwitch
    fields[key] = values
    fields = this.handleFields(fields)
    onFirewallChange(fields)
  }

  render() {
    const {  firewallSwitch, form, i18n } = this.props
    const { getFieldDecorator } = form
    
    return (
      <Form layout="horizontal" className={styles.form}>
        <FormItem label={i18n.t`防火墙联动`} {...formItemLayout}>
          <div>是否开启防火墙联动：<Switch checked={firewallSwitch.value=="1"?true:false} onChange={this.handleChange.bind(this, 'value')} /></div>
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
  firewallSwitch: PropTypes.object,
}

export default Filter
