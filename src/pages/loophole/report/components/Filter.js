/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, SearchView, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Input, DatePicker } from 'antd'

const { RangePicker } = DatePicker;

const ColProps = {
  xs: 24,
  sm: 8,
  md: 8,
  xl: 8,
  style: {
    marginTop: 8,
    marginBottom: 8,
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
    const { getFieldsValue } = form

    let fields = getFieldsValue()
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

  handleChange = (key, values) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    onFilterChange(fields)
  }

  render() {
    const { onAdd, filter, form, i18n } = this.props
    const { getFieldDecorator } = form

    let initialCreateTime = []
    if (filter.time && filter.time[0]) {
      initialCreateTime[0] = moment(filter.time[0])
    }
    if (filter.time && filter.time[1]) {
      initialCreateTime[1] = moment(filter.time[1])
    }

    return (
      <Row gutter={24}>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`报表名称`}>
            {getFieldDecorator('reportName', { initialValue: filter.reportName })(
              <Input allowClear onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`查询时间`}>
            {getFieldDecorator('time', { initialValue: initialCreateTime })(
              <RangePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} onChange={this.handleChange.bind(this, 'time')} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
            <Row type="flex" justify="space-between">
              <div></div>
              <div>
                <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                  <Trans>查询</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>重置</Trans>
                </Button>
              </div>
            </Row>
        </Col>
      </Row>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Filter
