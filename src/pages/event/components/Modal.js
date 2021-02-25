import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Cascader, Descriptions, Tabs, Spin, Table, Tooltip } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, TableFinder, Text } from 'components'
import styles from './List.less'

const FormItem = Form.Item
const { TabPane } = Tabs;

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
      if(modalType === 'update'){
        data.address = data.address.join(' ')
      }
      onOk(data)
    })
  }

  onTabChange = (activeKey) => {
    
  }

  render() {
    const { item = {}, onOk, form, i18n, modalType, onChange, detailLoding, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const tabs = [{label:'数据详情',value:'1'},{label:'关联事件',value:'2'},{label:'威胁描述',value:'3'},{label:'威胁影响',value:'4'},{label:'解决方案',value:'5'},]
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
      // {
      //   title: <Trans>威胁地址</Trans>,
      //   dataIndex: 'detail',
      //   key: 'detail',
      //   sorter: (a, b) => {
      //     var stringA = a.detail.toUpperCase();
      //     var stringB = b.detail.toUpperCase();
      //     if (stringA < stringB) {
      //         return -1;
      //     }
      //     if (stringA > stringB) {
      //         return 1;
      //     }
      //     return 0;
      //   },
      //   render: (text) => <Text data={text==null?'':text} />
      // },
      {
        title: <Trans>频次</Trans>,
        dataIndex: 'freq',
        key: 'freq',
        sorter: (a, b) => a.freq - b.freq,
      },
    ]

    if(modalType === 'update'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`Name`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`NickName`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('nickName', {
                initialValue: item.nickName,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`Gender`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('isMale', {
                initialValue: item.isMale,
                rules: [
                  {
                    required: true,
                    type: 'boolean',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value>
                    <Trans>Male</Trans>
                  </Radio>
                  <Radio value={false}>
                    <Trans>Female</Trans>
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label={i18n.t`Age`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: item.age,
                rules: [
                  {
                    required: true,
                    type: 'number',
                  },
                ],
              })(<InputNumber min={18} max={100} />)}
            </FormItem>
            <FormItem label={i18n.t`Phone`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('phone', {
                initialValue: item.phone,
                rules: [
                  {
                    required: true,
                    pattern: /^1[34578]\d{9}$/,
                    message: i18n.t`The input is not valid phone!`,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`Email`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    required: true,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: i18n.t`The input is not valid E-mail!`,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`Address`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('address', {
                initialValue: item.address && item.address.split(' '),
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Cascader
                  style={{ width: '100%' }}
                  options={[]}
                  placeholder={i18n.t`Pick an address`}
                />
              )}
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'block'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`阻断时长`} {...formItemLayout}>
              {getFieldDecorator('blockTime', {
                initialValue: item.blockTime,
                rules: [
                  {
                    required: true,
                    message:'阻断时长不能为空'
                  },
                  {
                    required:false,
                    pattern: /^[1-9]\d*$/,
                    message: '请输入正整数'
                  },
                  // {
                  //   required:false,
                  //   min:60,
                  //   message:'阻断时长不能少于60'
                  // },
                  // {
                  //   required:false,
                  //   max:3600,
                  //   message:'阻断时长不能多于3600'
                  // }
                ],
              })(<InputNumber style={{ width: 120, marginRight: 10 }} placeholder="(60 - 3600)秒" />)}
              <span>(60-3600)秒</span>
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'follow'){
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
          <Modal {...modalProps} onOk={this.handleOk} showCancel={false} width="1000px" >
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
    }
    
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default UserModal
