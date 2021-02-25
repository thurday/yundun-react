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
@connect(({ assetsDiscover, loading }) => ({ assetsDiscover, loading }))
class Filter extends Component {
  state = {
    expandForm: false,
  }

  get eventType() {
    const { dispatch, assetsDiscover, loading } = this.props
    // const { list = [] } = assetsDiscover.listAssetGroup
    // const threat_type = list.map((v) => ({ value: v.id, label: v.desc }))
    // // console.log(threat_type)
    // return {
    //   // data: {
    //     threat_type, // 威胁类型
    //   // },
    //   // onFilterChange: value => {
    //   //   console.log('onFilterChange', value)
    //   // },
    // }
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
    const RECORD = [{
      value: '1',
      label: '是'
    },{
      value: '0',
      label: '否'
    }]

    const SITETYPE = [{
      value: 'ip',
      label: 'IP'
    },{
      value: '域名',
      label: '域名'
    }]
    let ASSETS = [];
    const data = this.props.assetsDiscover.listAsset.map(v=>{ASSETS.push({ 'value': (v.id).toString(), 'label': (v.asset_group_name).toString() })});

    return (
      <Row gutter={24}>
        {/* <Col {...ColProps}>
          <FilterItem label={i18n.t`网站类型`}>
            {getFieldDecorator('level', { initialValue: filter.level })(
              <AsyncSelect defaultOptions={SITETYPE} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col> */}
        <Col {...ColProps}>
          <FilterItem label={i18n.t`网站标题`}>
            {getFieldDecorator('title', { initialValue: filter.title })(
              // <AsyncSelect defaultOptions={[{ value: '', label: '全部' },...EVENT_TYPES]} placeholder={i18n.t`请选择`} width="100%" />
              <Input allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`资产组`}>
            {getFieldDecorator('assetgroupId', { initialValue: filter.assetgroupId })(
              // <AsyncSelect defaultOptions={[{ value: '', label: '全部' },...EVENT_TYPES]} placeholder={i18n.t`请选择`} width="100%" />
              <AsyncSelect defaultOptions={ASSETS} placeholder={i18n.t`请选择`} width="100%" />
              // <AsyncSelect placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`负责人`}>
            {getFieldDecorator('userName', { initialValue: filter.userName })(
              // <AsyncSelect defaultOptions={[{ value: '', label: '全部' },...EVENT_TYPES]} placeholder={i18n.t`请选择`} width="100%" />
              <Input allowClear placeholder={i18n.t`请输入内容`} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`是否备案`}>
            {getFieldDecorator('isBeian', { initialValue: filter.isBeian })(
              <AsyncSelect defaultOptions={RECORD} placeholder={i18n.t`请选择`} width="100%" />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`网站地址`}>
            {getFieldDecorator('host', { initialValue: filter.host })(
              // <AsyncSelect defaultOptions={[{ value: '', label: '全部' },...EVENT_TYPES]} placeholder={i18n.t`请选择`} width="100%" />
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
