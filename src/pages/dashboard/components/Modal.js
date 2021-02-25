import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, TableFinder, Text } from 'components'
import { Row, Col, Tabs, Form, Radio, Descriptions, Spin, Input, Tooltip } from 'antd'
import styles from './List.less'

const FormItem = Form.Item

const { TabPane } = Tabs
const TABS_DATA = [{
  label: '威胁描述',
  value: '1',
}, {
  label: '威胁影响',
  value: '2',
}, {
  label: '解决方案',
  value: '3',
}]

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

@withI18n()
@Form.create()
class UserModal extends PureComponent {
	state = {
    tabs: TABS_DATA,
    activeKey: '1',
  }

  handleOk = () => {
    const { item, onOk,modalType, form } = this.props
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

  //激活
  handleRegistOk = () => {
    const { item, onOk,modalType, form } = this.props
    const { validateFields, getFieldsValue } = form
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }

	onTabChange = (activeKey) => {
    this.setState({ activeKey })
  }

  render() {
  	const { activeKey, tabs } = this.state
    const { item = {}, onOk, modalType, onChange, form, i18n, detailLoding, machineCode, loading, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const columns = [
      {
        title: <Trans>时间</Trans>,
        dataIndex: 'time',
        key: 'time',
        fixed: 'left',
        sorter: (a, b) => {
          var stringA = a.time;
          var stringB = b.time;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        }
      },
      {
        title: <Trans>等级</Trans>,
        dataIndex: 'level',
        key: 'level',
        sorter: (a, b) => a.level - b.level,
        render: (text) => text == '3' ? <span style={{ color: '#ed5565' }}>{'高危'}</span> : (text == '2' ? <span>{'中危'}</span>:<span>{'低危'}</span>),
      },
      {
        title: <Trans>事件名称</Trans>,
        dataIndex: 'eventname',
        key: 'eventname',
        sorter: (a, b) => {
          var stringA = a.eventname;
          var stringB = b.eventname;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        },
        render: (text,record) => {
          return <Tooltip placement="top" title={text}>
                  <div style={{maxWidth:180}}>{record.eventname}</div>
                </Tooltip>
        }
      },
      {
        title: <Trans>事件类别</Trans>,
        dataIndex: 'eventtype',
        key: 'eventtype',
        sorter: (a, b) => {
          var stringA = a.eventtype;
          var stringB = b.eventtype;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        }
      },
      {
        title: <Trans>源IP</Trans>,
        dataIndex: 'srcip',
        key: 'srcip',
        sorter: (a, b) => {
          var stringA = a.srcip;
          var stringB = b.srcip;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        },
        render: (text) => <Text data={text==null?'':text} />
      },
      {
        title: <Trans>目标IP</Trans>,
        dataIndex: 'dstip',
        key: 'dstip',
        sorter: (a, b) => {
          var stringA = a.dstip;
          var stringB = b.dstip;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        },
        render: (text,record) => <Text data={text==null?'':text} />
      },
      {
        title: <Trans>频次</Trans>,
        dataIndex: 'freq',
        key: 'freq',
        sorter: (a, b) => a.freq - b.freq,
      },
    ]

    const ipcolumns = [
      {
        title: <Trans>事件名称</Trans>,
        dataIndex: 'eventname',
        key: 'eventname',
        sorter: (a, b) => {
          var stringA = a.eventname;
          var stringB = b.eventname;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        }
      },
      {
        title: <Trans>事件类型</Trans>,
        dataIndex: 'eventtype',
        key: 'eventtype',
        sorter: (a, b) => {
          var stringA = a.eventtype;
          var stringB = b.eventtype;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        }
      },
      {
        title: <Trans>威胁等级</Trans>,
        dataIndex: 'level',
        key: 'level',
        sorter: (a, b) => a.level - b.level,
        render: (text) => text == '3' ? <span style={{ color: '#ed5565' }}>{'高危'}</span> : (text == '2' ? <span>{'中危'}</span>:<span>{'低危'}</span>),
      },
      {
        title: <Trans>时间</Trans>,
        dataIndex: 'time',
        key: 'time',
        fixed: 'left',
        sorter: (a, b) => {
          var stringA = a.time;
          var stringB = b.time;
          if (stringA < stringB) {
              return -1;
          }
          if (stringA > stringB) {
              return 1;
          }
          return 0;
        }
      },
    ]

    if(modalType === 'follow'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem style={{textAlign:'center'}}>
              {getFieldDecorator('followIp', {
                initialValue: item.followIp,
                rules: [
                  {
                    required: true,
                    message:'请选择关注'
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={item.srcip}>
                    <Trans>源IP</Trans>
                  </Radio>
                  <Radio value={item.dstip}>
                    <Trans>目标IP</Trans>
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'detail'){
      return (
        <Modal {...modalProps}
          width='1000px'
          footer={[
          // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
          <Button key="submit" type="primary" onClick={this.handleOk}>
          关闭
          </Button>, ]}
          >
          <Spin spinning={detailLoding}>
            <Descriptions>
              <Descriptions.Item label="事件名称">{item.eventname}</Descriptions.Item>
              <Descriptions.Item label="事件ID">{item.id}</Descriptions.Item>
              <Descriptions.Item label="源IP">{item.yuandizhi}</Descriptions.Item>
              <Descriptions.Item label="源端口">{item.yuanduankou}</Descriptions.Item>
              <Descriptions.Item label="目标IP">{item.mudizhi}</Descriptions.Item>
              <Descriptions.Item label="目标端口">{item.muduankou}</Descriptions.Item>
              <Descriptions.Item label="最近发生">{item.shijian}</Descriptions.Item>
              <Descriptions.Item label="威胁地址">{item.weixie}</Descriptions.Item>
              <Descriptions.Item label="协议类型">{item.protocol}</Descriptions.Item>
              <Descriptions.Item label="源mac">{item.srcmac}</Descriptions.Item>
              <Descriptions.Item label="目标mac">{item.dstmac}</Descriptions.Item>
              <Descriptions.Item label="告警方式">{item.warnType}</Descriptions.Item>
            </Descriptions>
            <Tabs defaultActiveKey="1" onChange={this.onTabChange} style={{minHeight:200}}>
              <TabPane tab="数据详情" key="1">
                {item.data}
              </TabPane>
              <TabPane tab="关联事件" key="2">
                <TableFinder
                  {...modalProps}
                  pagination={{
                    ...modalProps.pagination, 
                    showTotal: total => i18n.t`Total ${total} Items`,
                  }}
                  className={styles.table}
                  columns={columns}
                  onChange={onChange}
                  title={''}
                />
              </TabPane>
              <TabPane tab="威胁描述" key="3">
                {item.shuoming}
              </TabPane>
              <TabPane tab="威胁影响" key="4">
                {item.yingxiang}
                
              </TabPane>
              <TabPane tab="解决方案" key="5">
                {item.jianyi}
              </TabPane>
            </Tabs>
          </Spin>
        </Modal>
      )
    }else if(modalType === 'activation'){
      return (
        <Modal {...modalProps}
          maskStyle={{background:'#ddd'}}
          footer={[
          // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
          <Button key="submit" type="primary" onClick={this.handleRegistOk}>
          激活
          </Button>, ]}>
          <Spin spinning={loading.global}>
            <Form layout="horizontal">
              <FormItem label={i18n.t`您的机器码为`} {...formItemLayout}>
                {machineCode}
              </FormItem>
              <FormItem label={i18n.t`请输入激活码`} {...formItemLayout}>
                {getFieldDecorator('registCode', {
                  initialValue: item.registCode,
                  rules: [
                    {
                      required: true,
                      message:'请输入激活码'
                    },
                  ],
                })(
                  <Input allowClear placeholder={i18n.t`请输入激活码`} />
                )}
              </FormItem>
            </Form>
          </Spin>
        </Modal>
      )
    }else if(modalType === 'ipList'){
      return (
        <Modal {...modalProps}
        footer={[
          // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
          <Button key="submit" type="primary" onClick={this.handleOk}>
          关闭
          </Button> ]}
        >
          <Spin spinning={loading.global}>
            <TableFinder
              {...modalProps}
              pagination={{
                ...modalProps.ipListpagination, 
                showTotal: total => i18n.t`Total ${total} Items`,
              }}
              className={styles.table}
              columns={ipcolumns}
              onChange={onChange}
              title={''}
            />
          </Spin>
        </Modal>
      )
    }
    
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
