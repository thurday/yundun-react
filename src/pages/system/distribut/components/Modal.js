import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Avatar, Spin, Checkbox } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect, TableFinder, Text } from 'components'
import { ROLES } from 'utils/constant'
import styles from './List.less'
import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
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
    const { validateFields, getFieldsValue} = form
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

  handleOnCancel = () => {
    const { item = {}, onCancel, form } = this.props
    onCancel();
  }

  handleConfirmPassword = (rule, value, callback) => {
    const { form, i18n } = this.props
    const { getFieldValue } = form
    if (value && value !== getFieldValue('password')) {
      callback(i18n.t`两次输入密码不一致`)
    }
    callback()
  }

  render() {
    const { systemDistribut, item = {}, modalType, pictureList, onOk, form, i18n, onChange, loading, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const { list = [] } = systemDistribut
    const columns = [
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
        title: <Trans>数据类型</Trans>,
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

    var data = pictureList
    const option = {
      tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        
        position: 'top',
        formatter: function(item){
          return 'IP：'+item.data.data.host
        }
    },
    series: [
      {
          type: 'tree',

          data: [data],

          top: '1%',
          left: '20%',
          bottom: '1%',
          right: '20%',

          symbolSize: 7,

          label: {
            backgroundColor: '#fff',
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 14
          },

          leaves: {
              label: {
                  position: 'right',
                  verticalAlign: 'middle',
                  align: 'left'
              }
          },

          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750
      }
  ]
    }
    const selectList = [{value:0,label:'所有系统规则名称'},{value:1,label:'所有用户规则名称'}]
    const checkboxList = list.map(item=>{
      return {value:item.id,label:item.host}
    })
    if(modalType == 'update'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`探针IP地址`} {...formItemLayout}>
              {getFieldDecorator('host', {
                initialValue: item.host,
                rules: [
                  {
                    required: true,
                    message:'结束IP不能为空'
                  },
                  {
                    pattern:/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/,
                    message:'请输入正确的IP格式'
                  }
                ],
              })(<Input allowClear disabled placeholder={i18n.t`请输入IP地址`} />)}
            </FormItem>
            <FormItem label={i18n.t`探针名称`} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                    message:'探针名称不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入探针名称`} />)}
            </FormItem>
            <FormItem label={i18n.t`探针机器码`} {...formItemLayout}>
              {getFieldDecorator('code', {
                initialValue: item.code,
                rules: [
                  {
                    required: true,
                    message:'探针机器码不能为空'
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入探针机器码`} />)}
            </FormItem>
            <FormItem label={i18n.t`端口`} {...formItemLayout}>
              {getFieldDecorator('port', {
                initialValue: item.port,
                rules: [
                  {
                    required: true,
                    message:'端口不能为空'
                  },
                ],
              })(<Input allowClear disabled placeholder={i18n.t`请输入端口`} />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'detail'){
      return (
        <Modal 
          width='800px' 
          footer={[
            // 定义右下角 按钮的地方 可根据需要使用 一个或者 2个按钮
            <Button type="primary" onClick={this.handleOnCancel}>
            关闭
            </Button>, ]}
          {...modalProps}
        >
          <Spin spinning={loading.global}>
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
            <ReactEcharts style={{width:'100%',height:'280px'}} ref="create_day" option={option} />
          </Spin>
        </Modal>
      )
    }else if(modalType === 'create'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
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
              })(<Input allowClear placeholder={i18n.t`请输入名称`} />)}
            </FormItem>
            <FormItem label={i18n.t`事件名称`} {...formItemLayout}>
              {getFieldDecorator('type', {
                initialValue: item.type,
                rules: [
                  {
                    required: true,
                    message:'事件名称不能为空'
                  },
                ],
              })(<AsyncSelect defaultOptions={selectList} placeholder={i18n.t`选择事件名称`} />)}
            </FormItem>
            <FormItem label={i18n.t`通知方向`} {...formItemLayout}>
              {getFieldDecorator('noticeDirection', {
                initialValue: item.noticeDirection,
                rules: [
                  {
                    required: true,
                    message:'请选择通知方向'
                  },
                ],
              })(<Checkbox.Group>
                <Checkbox value="0">上级</Checkbox>
                <Checkbox value="1">下级</Checkbox>
              </Checkbox.Group>)}
            </FormItem>
            <FormItem label={i18n.t`探针集合`} {...formItemLayout}>
              {getFieldDecorator('parentIds', {
                initialValue: item.parentIds,
                rules: [
                  {
                    required: true,
                    message:'请选择探针集合'
                  },
                ],
              })(<Checkbox.Group options={checkboxList}></Checkbox.Group>)}
            </FormItem>
          </Form>
        </Modal>
      )
    }
  }
}

UserModal.propTypes = {
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default UserModal
