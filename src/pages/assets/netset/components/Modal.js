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
        style:''
      }
      onOk(data)
    })
  }

  render() {
    const { assetsNetset,item = {}, modalType, loading, host, onOk, form, i18n, ...modalProps } = this.props
    const { getFieldDecorator } = form
    if (modalType === 'create') {
      return(
        <Modal {...modalProps} onOk={this.handleOk}>
          <Spin spinning={loading.global}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`名称`} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message:'名称不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem>
            <FormItem label={i18n.t`网段`} {...formItemLayout}>
              {getFieldDecorator('host', {
                initialValue: item.host,
                rules: [
                  {
                    required: true,
                    message:'网段不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem>
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
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message:'名称不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
            </FormItem>
            <FormItem label={i18n.t`网段`} {...formItemLayout}>
              {getFieldDecorator('host', {
                initialValue: item.host,
                rules: [
                  {
                    required: true,
                    message:'网段不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入`}/>)}
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
}

export default UserModal
