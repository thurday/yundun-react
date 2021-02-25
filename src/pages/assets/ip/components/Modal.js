import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect, Operation } from 'components'
import {Form,Input,Icon, Row, Col,InputNumber, Radio, Popconfirm, Spin } from 'antd'
import store from 'store'

const FormItem = Form.Item

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
    const { item = {}, onOk, form } = this.props
    const { validateFields, getFieldsValue } = form
    
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
        type:1,
      }
      onOk(data)
    })
  }

  listData = () => {
    const { listAsset } = this.props
    var data2=[];
    listAsset.map((value,index,arry)=>{
      data2.push({ 'value': (value.id).toString(), 'label': (value.asset_group_name).toString() })
    })
    return data2
  }

  confirm = () => {
    const { host, onConfirm } = this.props
    const data = {
      username:store.get('user').username,
      host:host
    }
    onConfirm(data)
  }

  cancel = () => {

  }

  render() {
    const { assetsIp,item = {}, modalType, loading, host, onOk, onConfirm, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    if (modalType === 'create') {
      return(
        <Modal {...modalProps} onOk={this.handleOk}>
          <Spin spinning={loading.global}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`名称`} {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: item.title,
                rules: [
                  {
                    required: true,
                    message:'名称不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem>
            <FormItem label={i18n.t`IP`} {...formItemLayout}>
              {getFieldDecorator('ip', {
                initialValue: item.ip,
                rules: [
                  {
                    required: true,
                    message:'ip不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem>
            {/* <FormItem label={i18n.t`端口`} {...formItemLayout}>
              {getFieldDecorator('port', {
                initialValue: item.port,
                rules: [
                  {
                    required: true,
                    pattern: /^[0-9]+$/,
                    message:'请输入整数！'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem>
            <FormItem label={i18n.t`域名`} {...formItemLayout}>
              {getFieldDecorator('host', {
                initialValue: item.host,
                rules: [
                  {
                    required: false,
                    message:'域名不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem> */}

            <FormItem label={i18n.t`资产组`} {...formItemLayout}>
              {getFieldDecorator('assetgroupId', {
                initialValue: item.assetgroupId,
                rules: [
                  {
                    required: false,
                    message:'请选择资产组'
                  },
                ],
              })(<AsyncSelect defaultOptions={this.listData()} placeholder={i18n.t`请选择资产组类别`} width="100%" />)}
            </FormItem>
            <FormItem label={i18n.t`单位`} {...formItemLayout}>
              {getFieldDecorator('company', {
                initialValue: item.company,
                rules: [
                  {
                    required: false,
                    message:'单位不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
            <FormItem label={i18n.t`负责人`} {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: item.userName,
                rules: [
                  {
                    required: false,
                    message:'负责人不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
            <FormItem label={i18n.t`负责人电话`} {...formItemLayout}>
              {getFieldDecorator('userPhone', {
                initialValue: item.userPhone,
                rules: [
                  {
                    required: false,
                    pattern: /^1[34578]\d{9}$/,
                    message: i18n.t`The input is not valid phone!`,
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
            <FormItem label={i18n.t`负责人邮箱`} {...formItemLayout}>
              {getFieldDecorator('userEmail', {
                initialValue: item.userEmail,
                rules: [
                  {
                    required: false,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: i18n.t`The input is not valid E-mail!`,
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
            {/* <FormItem label={i18n.t`是否备案`} {...formItemLayout}>
              {getFieldDecorator('isBeian', {
                initialValue: item.isBeian,
                rules: [
                  {
                    required: false,
                    message:'是否备案'
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>
                    <Trans>是</Trans>
                  </Radio>
                  <Radio value={0}>
                    <Trans>否</Trans>
                  </Radio>
                </Radio.Group>
              )}
            </FormItem> */}
          </Form>
          </Spin>
        </Modal>
      )
    }else if(modalType === 'update'){
      return(
        <Modal {...modalProps} onOk={this.handleOk}>
          <Spin spinning={loading.global}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`名称`} {...formItemLayout}>
              {getFieldDecorator('title', {
                initialValue: item.title,
                rules: [
                  {
                    required: true,
                    message:'名称不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem>
            <FormItem label={i18n.t`IP`} {...formItemLayout}>
              {getFieldDecorator('ip', {
                initialValue: item.ip,
                rules: [
                  {
                    required: true,
                    message:'ip不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} disabled/>)}
            </FormItem>
            {/* <FormItem label={i18n.t`端口`} {...formItemLayout}>
              {getFieldDecorator('port', {
                initialValue: item.port,
                rules: [
                  {
                    required: true,
                    pattern: /^[0-9]+$/,
                    message:'请输入整数！'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} disabled/>)}
            </FormItem> */}
            {/* <FormItem label={i18n.t`域名`} {...formItemLayout}>
              {getFieldDecorator('host', {
                initialValue: item.host,
                rules: [
                  {
                    required: true,
                    message:'域名不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem> */}

            <FormItem label={i18n.t`资产组`} {...formItemLayout}>
              {getFieldDecorator('assetgroupId', {
                initialValue: item.assetgroupId,
                rules: [
                  {
                    required: false,
                    message:'请选择资产组'
                  },
                ],
              })(<AsyncSelect defaultOptions={this.listData()} placeholder={i18n.t`请选择资产组类别`} width="100%" />)}
            </FormItem>
            <FormItem label={i18n.t`单位`} {...formItemLayout}>
              {getFieldDecorator('company', {
                initialValue: item.company,
                rules: [
                  {
                    required: false,
                    message:'单位不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
            <FormItem label={i18n.t`负责人`} {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: item.userName,
                rules: [
                  {
                    required: false,
                    message:'负责人不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
            <FormItem label={i18n.t`负责人电话`} {...formItemLayout}>
              {getFieldDecorator('userPhone', {
                initialValue: item.userPhone,
                rules: [
                  {
                    required: false,
                    pattern: /^1[34578]\d{9}$/,
                    message: i18n.t`The input is not valid phone!`,
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
            <FormItem label={i18n.t`负责人邮箱`} {...formItemLayout}>
              {getFieldDecorator('userEmail', {
                initialValue: item.userEmail,
                rules: [
                  {
                    required: false,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: i18n.t`The input is not valid E-mail!`,
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`} />)}
            </FormItem>
            {/* <FormItem label={i18n.t`是否备案`} {...formItemLayout}>
              {getFieldDecorator('isBeian', {
                initialValue: item.isBeian,
                rules: [
                  {
                    required: true,
                    message:'是否备案'
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>
                    <Trans>是</Trans>
                  </Radio>
                  <Radio value={0}>
                    <Trans>否</Trans>
                  </Radio>
                </Radio.Group>
              )}
            </FormItem> */}
          </Form>
          </Spin>
        </Modal>
      )
    }else if (modalType === 'asset'){
      return(
        <Modal {...modalProps} onOk={this.handleOk}>
          <Spin spinning={loading.global}>
            <Form layout="horizontal">
              <FormItem label={i18n.t`IP段`} {...formItemLayout}>
                {getFieldDecorator('host', {
                  initialValue: host,
                  rules: [
                    {
                      required: true,
                      message:'IP段不能为空'
                    },
                    {
                      pattern:/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\/([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/,
                      message:'请输入正确的IP段格式'
                    }
                  ],
                })(
                  <Input 
                    addonAfter={host!=''?
                    <Popconfirm
                    title="是否确认终止任务?"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="是"
                    cancelText="否"
                    >
                      <Operation data={['termination']}/>
                    </Popconfirm>:null} 
                    // value={host} 
                    allowClear 
                    placeholder={i18n.t`请输入`} 
                    disabled={host==''?false:true} />
                )}
              </FormItem>
            </Form>
          </Spin>
        </Modal>
      )
    }

    // return (
    //   <Modal {...modalProps} onOk={onOk}>
    //     <Row gutter={40}>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">资产名称</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>中国周边经济研究</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">域名个数</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>1</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">IP</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>202.120.223.182</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">域名</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>icne.usst.edu.cn</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">物理位置</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>中国上海教育网</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">发现时间</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>2018.12.27</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">资产组</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>默认资产组</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">网站分类</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>已确定</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">是否已治理</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>已加入治理</Col>
    //       <Col style={{ marginBottom: 10 }} span={10} className="text-right">外网</Col>
    //       <Col style={{ marginBottom: 10 }} span={14}>已开通</Col>
    //     </Row>
    //   </Modal>
    // )
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onConfirm: PropTypes.func,
}

export default UserModal
