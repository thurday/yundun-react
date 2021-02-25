/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem, SearchView, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Row, Col, Input, Radio, Checkbox, DatePicker } from 'antd'
import { EVENT_TYPES, REPORT_TPLS } from 'utils/constant'

const { RangePicker } = DatePicker
const CheckboxGroup = Checkbox.Group;
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

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  state = {
    tpl:0
  };

  handleFields = fields => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
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

  handleAdd = () => {
    const { onAdd, form } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields = this.handleFields(fields)
    onAdd(fields)
  }

  tplChange = (e) => {
    if(e.target.value=='1'){
      this.setState({tpl:1})
    }else if(e.target.value=='0'){
      this.setState({tpl:0})
    }
  }

  changeDate = (value, dateString) => {
    const { onChangeDate } = this.props
    onChangeDate(value, dateString);
  }

  render() {
    const { onAdd, filter, loadOptions, form, i18n, listAsset, defaultSelectDate } = this.props
    const { getFieldDecorator, getFieldValue } = form
    // const preview = getFieldValue('tpl') !== '2' ? 'preview' : 'custom'

    const dateFormat = 'YYYY-MM-DD'
    // 默认选择时间为最近7天
    // const defaultSelectDate = {
    //   startDate: moment().startOf('day').subtract(6, 'days'),
    //   endDate: moment().endOf('day')
    // }

    const level_type = [{value:1,label:'低危'},{value:2,label:'中危'},{value:3,label:'高危'}]
    let options = listAsset.map(value => {
      return (
        {value:value.id,label:value.desc}
      )
    })
    return (
      <Row gutter={24}>
        <Col {...TwoColProps}>
          <FilterItem label={i18n.t`威胁类型`}>
              {/* <Checkbox.Group defaultValue={['146']} options={options} /> */}
              {options.map((item,key) => {
                return(
                  <span key={key} style={{marginRight:10}}>
                    <Checkbox disabled={this.state.tpl==1?true:false} defaultChecked={item.value}>{item.label}</Checkbox>
                    <Checkbox.Group options={item.value} value={options}/>
                  </span>
                )
              })}
          </FilterItem>
        </Col>
        
        <Col {...ColProps}>
          <FilterItem label={i18n.t`选择时间`}>
            {getFieldDecorator('createTime', { initialValue: [defaultSelectDate.startDate, defaultSelectDate.endDate] })(
              <RangePicker allowClear format="YYYY-MM-DD" style={{ width: '100%' }} onChange={this.changeDate}/>
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`威胁等级`}>
            <div>
              {getFieldDecorator('level', { initialValue: [1,2,3] })(
                <Checkbox.Group disabled={this.state.tpl==1?true:false} options={level_type} />
              )}
            </div>
            {/* {level_type.map((item,key) => {
              return(
                <span>
                  {getFieldDecorator('level', { initialValue: filter.level })(
                    <span key={key} style={{marginRight:10}}>
                    <Checkbox defaultChecked={item.value} onChange={this.levelChange}>{item.label}</Checkbox>
                    <Checkbox.Group options={item.value} value={options}/>
                  </span>
                  )}
                </span>
              )
            })} */}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`报告模板`}>
            <div>
              {getFieldDecorator('tpl', { initialValue: filter.tpl || '0' })(
                <Radio.Group options={REPORT_TPLS} onChange={this.tplChange}/>
              )}
              {/* <Button type="primary" className="margin-right" onClick={() => onAdd(preview)}>
                <Trans>预览</Trans>
              </Button> */}
              <Button type="primary" onClick={this.handleAdd}>
                <Trans>生成</Trans>
              </Button>
            </div>
          </FilterItem>
        </Col>
        {/* <Col {...ColProps}>
          <FilterItem label={i18n.t`源IP`}>
            {getFieldDecorator('source_ip', { initialValue: filter.source_ip })(
              <Input allowClear placeholder={i18n.t`请输入IP，例如：192.168.1.1`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col>
        <Col {...ColProps}>
          <FilterItem label={i18n.t`目标IP`}>
            {getFieldDecorator('target_ip', { initialValue: filter.target_ip })(
              <Input allowClear placeholder={i18n.t`请输入IP，例如：192.168.1.1`} onPressEnter={this.handleSubmit} />
            )}
          </FilterItem>
        </Col> */}
        {/* <Col {...TwoColProps}>
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
        </Col> */}
      </Row>
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  onChangeDate: PropTypes.func,
}

export default Filter
