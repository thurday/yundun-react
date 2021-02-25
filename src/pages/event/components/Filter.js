/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, SearchView, AsyncSelect, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Input, Icon, DatePicker, InputNumber  } from 'antd'
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
@connect(({ event, loading }) => ({ event, loading }))
class Filter extends Component {
  state = {
    expandForm: false,
  }

  get eventType() {
    const { dispatch, event, loading } = this.props
    const { list = [] } = event.typeEvent
    const threat_type = list.map((v) => ({ value: v.desc, label: v.desc }))
    // console.log(threat_type)
    return {
      // data: {
        threat_type, // 威胁类型
      // },
      // onFilterChange: value => {
      //   console.log('onFilterChange', value)
      // },
    }
  }
  

  handleFields = fields => {
    const { time } = fields
    if (time.length) {
      fields.time = [
        moment(time[0]).format('YYYY-MM-DD'),
        moment(time[1]).format('YYYY-MM-DD'),
      ]
    }
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
          <FilterItem label={i18n.t`风险等级`}>
            {getFieldDecorator('level', { initialValue: filter.level })(
              <AsyncSelect defaultOptions={LEVELS} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`事件类型`}>
            {getFieldDecorator('eventtype', { initialValue: filter.eventtype })(
              // <AsyncSelect defaultOptions={[{ value: '', label: '全部' },...EVENT_TYPES]} placeholder={i18n.t`请选择`} width="100%" />
              <AsyncSelect defaultOptions={this.eventType.threat_type} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`查询时间`}>
            {getFieldDecorator('time', { initialValue: initialCreateTime })(
              <RangePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} />
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
                <a style={{ marginLeft: 10 }} onClick={this.toggleForm}>
                  展开 <Icon type="down" />
                </a>
              </div>
            </Row>
        </Col>
      </Row>
    )
  }

  renderAdvancedForm() {
    const { onAdd, filter, loadOptions, form, i18n } = this.props
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
          <FilterItem label={i18n.t`风险等级`}>
            {getFieldDecorator('level', { initialValue: filter.level })(
              <AsyncSelect defaultOptions={LEVELS} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`事件类型`}>
            {getFieldDecorator('eventtype', { initialValue: filter.eventtype })(
              // <AsyncSelect defaultOptions={[{ value: '', label: '全部' }, ...EVENT_TYPES]} placeholder={i18n.t`请选择`} width="100%" />
              <AsyncSelect defaultOptions={this.eventType.threat_type} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`查询时间`}>
            {getFieldDecorator('time', { initialValue: initialCreateTime })(
              <RangePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`事件名称`}>
            {getFieldDecorator('eventname', { initialValue: filter.eventname })(
              <Input allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`源IP`}>
            {getFieldDecorator('srcip', { initialValue: filter.srcip })(
              <Input allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`源端口`}>
            {getFieldDecorator('srcport', { initialValue: filter.source_port })(
              <InputNumber style={{width:'100%'}} allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`目标IP`}>
            {getFieldDecorator('dstip', { initialValue: filter.target_ip })(
              <Input allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`目标端口`}>
            {getFieldDecorator('dstport', { initialValue: filter.target_port })(
              <InputNumber style={{width:'100%'}} allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`威胁地址`}>
            {getFieldDecorator('detail', { initialValue: filter.detail })(
              <Input allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...TwoColProps}>
            <Row type="flex" justify="space-between">
              <div></div>
              <div>
                <Button type="primary" className="margin-right" onClick={this.handleSubmit}>
                  <Trans>查询</Trans>
                </Button>
                <Button onClick={this.handleReset}>
                  <Trans>重置</Trans>
                </Button>
                <a style={{ marginLeft: 10 }} onClick={this.toggleForm}>
                  收起 <Icon type="up" />
                </a>
              </div>
            </Row>
        </Col>
      </Row>
    )
  }

  renderForm() {
    const { expandForm } = this.state
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()
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
