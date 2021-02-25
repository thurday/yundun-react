import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Form, Input, Checkbox, Radio, Row, Col, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'
import { Trans, withI18n } from '@lingui/react'
import { Modal, Progress } from 'components'
import { REPORT_EVENTS, REPORT_EVENTS_MAP } from 'utils/constant'
import styles from '../index.less'

const ButtonGroup = Button.Group
const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const layout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 22,
    offset: 1,
  },
}

const source = [{
  title: '10.255.252.251（局域网）',
  percent: 100,
  value: '35562',
  strokeColor: '#ed5565',
}, {
  title: '202.120.222.26（上海市.上海理工大学）',
  percent: 80,
  value: '31121',
  strokeColor: '#f5be5b',
}, {
  title: '202.120.222.26（上海市.上海理工大学）',
  percent: 60,
  value: '21066',
  strokeColor: '#1c84c6',
}, {
  title: '10.255.252.251（局域网）',
  percent: 40,
  value: '10269',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}, {
  title: '10.255.252.251（局域网）',
  percent: 20,
  value: '4006',
  strokeColor: '#71bfb4',
}]

const data = [{
  value: 1140,
  name: '远程控制'
}, {
  value: 1210,
  name: '僵尸网络'
}, {
  value: 1000,
  name: '网站后门'
}, {
  value: 1860,
  name: '网页篡改'
}, {
  value: 1000,
  name: '网络欺诈'
}, {
  value: 1479,
  name: '数据泄露'
}, {
  value: 1000,
  name: '设备安全'
}, {
  value: 1440,
  name: '其他威胁'
}, {
  value: 1100,
  name: 'DDOS攻击'
}, {
  value: 1100,
  name: '网络盗号'
}, {
  value: 1143,
  name: '漏洞利用'
}, {
  value: 25185,
  name: '攻击事件'
}]

const threat_type = {
  // legend: {
  //   textStyle: {
  //     fontSize: 11,
  //   },
  //   selectedMode: false,
  //   orient: 'vertical',
  //   x: 'left',
  //   bottom: 30,
  //   itemWidth: 12,
  //   itemHeight: 12,
  //   data: data.map((v) => ({ ...v, icon: 'none' })),
  // },
  tooltip: {
    trigger: 'item',
    formatter: "{b} : {d}%",
  },
  series: [{
    name: '威胁事件类型',
    type: 'pie',
    radius: ['40%', '60%'],
    // center: ['50%', '45%'],
    avoidLabelOverlap: false,
    label: {
      normal: {
        show: true,
        formatter: '{b}: {c} ({d}%)',
        fontSize: 10,
      },
      emphasis: {
        show: true,
        textStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
      },
    },
    data: data,
  }],
  color: ['#de4e4c', '#e5674c', '#f6833a', '#edcd45', '#4aa3e4', '#5ba4d1', '#d1529e', '#4aa3e4', '#5ec270', '#54bac5', '#6773c7', '#8556b7'],
}

const create_day = {
  color: ['#acb4c3', '#71bfb4'],
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: 10,
  },
  xAxis: {
    boundaryGap: false,
    axisLabel: {
      rotate: -45,
    },
    data: ['1 12:07', '2 12:07', '3 12:07', '4 12:07', '5 12:07', '6 12:07', '7 12:07'],
  },
  yAxis: {
    axisTick: {
      show: false
    },
    splitLine: {
      show: true
    },
  },
  series: [{
    name: '远程控制',
    type: 'line',
    smooth: true,
    data: [48000, 23000, 42000, 48000, 35000, 30000, 32000],
  }],
}

@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      }
      onOk(data)
    })
  }

  render() {
    const { item = {}, type, onOk, form, i18n, defaultSelectDate, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const getStyle = (bgColor) => ({ background: bgColor, color: '#fff', borderColor: bgColor })
    // const defaultSelectDate = {
    //   startDate: moment().startOf('day').subtract(6, 'days').format('YYYY-MM-DD'),
    //   endDate: moment().endOf('day').format('YYYY-MM-DD')
    // }

    return (
      <Modal {...modalProps} onOk={this.handleOk}>
        <Form layout="horizontal">
          <FormItem label={i18n.t`报告名称`} {...formItemLayout}>
            {getFieldDecorator('name', {
              initialValue: item.name,
              rules: [
                {
                    required: true,
                    message:'报告名称不能为空'
                },
                ],
            })(<Input allowClear />)}
          </FormItem>
          <FormItem label={i18n.t`报告描述`} {...formItemLayout}>
            {getFieldDecorator('desc', {
              initialValue: item.desc || '本次报告监测范围是从'+defaultSelectDate.startDate.format('YYYY-MM-DD')+'到'+defaultSelectDate.endDate.format('YYYY-MM-DD'),
            })(<Input allowClear />)}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
