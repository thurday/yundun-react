/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, SearchView, AsyncSelect, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Input, Icon, DatePicker } from 'antd'
import { LEVELS, EVENT_TYPES } from 'utils/constant'
import { connect } from 'dva'

const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  md: 8,
  xl: 6,
  style: {
    marginTop: 8,
    marginBottom: 8,
  },
}

const TwoColProps = {
  ...ColProps,
  xm: 24,
  md: 24,
  xl: 24,
}

// const type = [{
//   value: '远程控制',
//   label: '远程控制'
// }]

@withI18n()
@Form.create()
@SearchView
@connect(({ assetBug, loading }) => ({ assetBug, loading }))
class Filter extends Component {
  state = {
    expandForm: false,
  }
  
  handleFields = fields => {
    return fields
  }

  handleSubmit = () => {
    const { onFilterChange, form } = this.props
    const { getFieldsValue } = form

    // let fields = getFieldsValue()

    let fields = {
      ...getFieldsValue(),
      current: 1,
      pageSize:10
    }
    fields = this.handleFields(fields)
    onFilterChange(fields)
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

  // handleChange = (key, values) => {
  //   const { form, onFilterChange } = this.props
  //   const { getFieldsValue } = form

  //   let fields = getFieldsValue()
  //   fields[key] = values
  //   fields = this.handleFields(fields)
  //   onFilterChange(fields)
  // }

  toggleForm = () => {
    const { expandForm } = this.state
    this.setState({
      expandForm: !expandForm,
    })
  }

  renderSimpleForm() {
    const { onAdd, filter, loadOptions, form, i18n } = this.props
    const { getFieldDecorator } = form
    return (
      <Row gutter={24}>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`站点`}>
            {getFieldDecorator('title', { initialValue: filter.title })(
              <Input allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}></Col>
        <Col {...ColProps}></Col>
        <Col {...ColProps}>
            <Row style={{float:'right'}} type="flex" justify="space-between">
              <div>
                <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                  <Trans>查询</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>重置</Trans>
                </Button>
                {/* <a style={{ marginLeft: 10 }} onClick={this.toggleForm}>
                  展开 <Icon type="down" />
                </a> */}
              </div>
            </Row>
        </Col>
      </Row>
    )
  }

  renderForm() {
    const { expandForm } = this.state
    return this.renderSimpleForm()
  }

  render() {
    return <React.Fragment>{this.renderForm()}</React.Fragment>
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
