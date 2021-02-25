/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spin, Modal, Form, Input } from 'antd'
import moment from 'moment'
import { SearchView, Progress, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import styles from '../index.less'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    sm: {
      span: 12,
      offset: 6,
    }
  },
}

const formItemLayout2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  state = { visible: false };
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  //激活
  handleRegistOk = () => {
    const { item, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
      setTimeout(()=>{
        this.setState({
          visible: false,
        });
      },2000)

    })
  }
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }
  render() {
    const { item = {}, filter, timeData, timeLimitData, loading, form, onAdd, onOk, i18n } = this.props
    const { getFieldDecorator } = form
    return (
      <div>
        <Spin spinning={loading}>
          <Form layout="horizontal" className={styles.form}>
            <FormItem label={i18n.t`服务器状态`} {...formItemLayout}>
              <div>持续运行时间</div>
              <div style={{ paddingLeft: 30 }}>{timeData?timeData:''}</div>
              <div>授权期限</div>
              <div style={{ paddingLeft: 30 }}>到期时间：{timeLimitData?timeLimitData.dateLimit:''}，剩余可用{timeLimitData?timeLimitData.dateLeft:''}天<Button type="primary" onClick={this.showModal} style={{ marginLeft: 30 }}>重新激活</Button></div>
              <div>CPU使用</div>
              <div style={{ paddingLeft: 30 }}>
              <div>核心数量{filter?filter.cpuinfo.cpuNum:0}，使用率{filter?filter.cpuinfo.use_rate:0}%</div>
                <Progress percent={filter?Number(filter.cpuinfo.use_rate):0} showInfo strokeColor={'#ed5565'} />
              </div>
              <div>硬盘状况</div>
              <div style={{ paddingLeft: 30 }}>
              <div>总空间{filter?filter.diskInfo.total:0}，已使用{filter?filter.diskInfo.used:0}，剩余{filter?filter.diskInfo.free:0}</div>
                <Progress percent={filter?Number(filter.diskInfo.use_rate):0} showInfo />
              </div>
              <div>内存状况</div>
              <div style={{ paddingLeft: 30 }}>
              <div>物理内存{filter?filter.memoryInfo.total:0}，已经使用{filter?filter.memoryInfo.used:0}，剩余{filter?filter.memoryInfo.free:0}</div>
                <Progress percent={filter?Number(filter.memoryInfo.use_rate):0} showInfo strokeColor={'#f5be5b'} />
              </div>
            </FormItem>
          </Form>
        </Spin>
        <Modal
          title="重新激活"
          visible={this.state.visible}
          width={'60%'}
          closable={false}
          centered={true}
          maskClosable={false}
          footer={[
            // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
            <Button key="submit" type="primary" onClick={this.handleRegistOk}>
            激活
            </Button>,<Button onClick={this.handleCancel}>
            取消
            </Button> ]}
        >
          <Spin spinning={loading}>
            <Form layout="horizontal">
              <FormItem label={i18n.t`重新激活请输入激活码`} {...formItemLayout2}>
                {getFieldDecorator('registCode', {
                  initialValue: item.registCode,
                  rules: [
                    {
                      required: true,
                      message:'重新激活请输入激活码'
                    },
                  ],
                })(
                  <Input allowClear placeholder={i18n.t`重新激活请输入激活码`} />
                )}
              </FormItem>
            </Form>
          </Spin>
        </Modal>
      </div>
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: '20px 0' }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onAdd: PropTypes.func,
  onOk: PropTypes.func,
}

export default Filter
