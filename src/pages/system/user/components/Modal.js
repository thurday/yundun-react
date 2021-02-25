import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Avatar, Radio, Tree } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import { Button, Modal, AsyncSelect } from 'components'
import { ROLES } from 'utils/constant'

const FormItem = Form.Item
const { TreeNode } = Tree;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
const detailFormItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
}
@withI18n()
@Form.create()
class UserModal extends PureComponent {
  handleOk = () => {
    const { item = {}, modalType, onOk, form } = this.props
    const { validateFields, getFieldsValue} = form
    validateFields(errors => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        userId: item.userId,
      }
      onOk(data)
    })
  }

  handleConfirmPassword = (rule, value, callback) => {
    const { form, i18n } = this.props
    const { getFieldValue } = form
    if (value && value !== getFieldValue('password')) {
      callback(i18n.t`两次输入密码不一致`)
    }
    callback()
  }
  roles = () => {
    const { systemUser } = this.props
    const { rolesItem } = systemUser
    
    var data2=[];
    rolesItem.map((value,index,arry)=>{
      data2.push({ 'value': (value.role_id), 'label': (value.role_name) })
    })
    return data2
  }

  render() {
    const { systemUser, item = {}, onOk, form, i18n, modalType, ...modalProps } = this.props
    const { getFieldDecorator } = form
    const onSelect = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };
  
    const onCheck = (checkedKeys, info) => {
      console.log('onCheck', checkedKeys, info);
    };

    if(modalType === 'create'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`角色类别`} {...formItemLayout}>
              {getFieldDecorator('roleId', {
                initialValue: item.roleId,
                rules: [
                  {
                    required: true,
                    message:'请选择角色类别'
                  },
                ],
              })(<AsyncSelect defaultOptions={this.roles()} placeholder={i18n.t`请选择角色类别`} width="100%" />)}
            </FormItem>
            <FormItem label={i18n.t`登录账号`} {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue: item.username,
                rules: [
                  {
                    required: true,
                    message:'登录账号不能为空'
                  },
                  {
                    max:20,
                    message: '登录账号不能大于20个字',
                  }
                ],
              })(<Input allowClear placeholder={i18n.t`请输入登录账号`} />)}
            </FormItem>
            <FormItem label={i18n.t`登录密码`} {...formItemLayout}>
              {getFieldDecorator('password', {
                initialValue: item.password,
                rules: [
                  {
                    required: true,
                    pattern: '(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,20}',
                    message:'请输入8-20位密码，由大小写字母、数字、特殊字符组成'
                  },
                  {
                    min: 6,
                    message: '至少输入6位字符',
                  },
                  {
                    max: 20,
                    message: '至多输入20位字符',
                  },
                ],
              })(<Input allowClear type={'password'} autoComplete='new-password' minLength={6} maxLength={20} placeholder={i18n.t`请输入8-20位密码，由字母大小写、数字、特殊字符组成`} />)}
            </FormItem>
            <FormItem label={i18n.t`确认密码`} {...formItemLayout}>
              {getFieldDecorator('newPassword', {
                initialValue: item.newPassword,
                rules: [
                  {
                    required: true,
                    message:'请输入8-20位密码，由大小写字母、数字、特殊字符组成'
                  },
                  {
                    validator: this.handleConfirmPassword,
                  },
                ],
              })(<Input allowClear type={'password'} autoComplete='new-password' minLength={6} maxLength={20} placeholder={i18n.t`请确认密码`} />)}
            </FormItem>
            <FormItem label={i18n.t`姓名`} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    max:20,
                    message: '姓名不能大于20个字',
                  }
                ],
              })(<Input allowClear placeholder={i18n.t`请输入中文名或英文名`} />)}
            </FormItem>
            <FormItem label={i18n.t`手机号码`} {...formItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
                rules: [
                  {
                    required: false,
                    pattern: /^1[34578]\d{9}$/,
                    message: i18n.t`The input is not valid phone!`,
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入手机号码`} />)}
            </FormItem>
            <FormItem label={i18n.t`邮箱`} {...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    // required: true,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: i18n.t`The input is not valid E-mail!`,
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入邮箱地址`} />)}
            </FormItem>
            {/* <FormItem label={i18n.t`是否开启操作日志`} {...formItemLayout}>
              <Radio.Group>
                <Radio value={1}>开启</Radio>
                <Radio value={2}>关闭</Radio>
              </Radio.Group>
            </FormItem> */}
            {/* <FormItem label={i18n.t`可访问起始IP`} {...formItemLayout}>
              {getFieldDecorator('startIp', {
                initialValue: item.startIp,
                rules: [
                  {
                    required: true,
                    message:'起始IP不能为空'
                  },
                  {
                    pattern:/^((25[0-5]|2[0-4]\d|[01]?\d\d?)($|(?!\.$)\.)){4}$/,
                    message:'请输入正确的IP格式'
                  }
                ],
              })(<Input allowClear placeholder={i18n.t`请输入IP地址`} />)}
            </FormItem>
            <FormItem label={i18n.t`可访问结束IP`} {...formItemLayout}>
              {getFieldDecorator('endIp', {
                initialValue: item.endIp,
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
              })(<Input allowClear placeholder={i18n.t`请输入IP地址`} />)}
            </FormItem> */}
            {/* <FormItem label={i18n.t`用户权限`} {...formItemLayout}>
              {getFieldDecorator('jurisdiction', {
                initialValue: item.jurisdiction,
              })(
                <Tree
                  checkable
                  defaultExpandedKeys={['0-0-0', '0-0-1']}
                  defaultSelectedKeys={['0-0-0', '0-0-1']}
                  defaultCheckedKeys={['0-0-0', '0-0-1']}
                  onSelect={onSelect}
                  onCheck={onCheck}
                  treeData={treeData}
                />
              )}
            </FormItem> */}
          </Form>
        </Modal>
      )
    }else if(modalType === 'update'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`角色类别`} {...formItemLayout}>
              {getFieldDecorator('roleId', {
                initialValue: item.roleId,
                rules: [
                  {
                    required: true,
                    message:'请选择角色类别'
                  },
                ],
              })(<AsyncSelect defaultOptions={this.roles()} placeholder={i18n.t`请选择角色类别`} width="100%" />)}
            </FormItem>
            <FormItem label={i18n.t`登录账号`} {...formItemLayout}>
              {getFieldDecorator('username', {
                initialValue: item.username,
                rules: [
                  {
                    required: true,
                    message:'登录账号不能为空'
                  },
                  {
                    max:20,
                    message: '登录账号不能大于20个字',
                  }
                ],
              })(<Input allowClear placeholder={i18n.t`请输入登录账号`} />)}
            </FormItem>
            <FormItem label={i18n.t`姓名`} {...formItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
                rules: [
                  {
                    max:20,
                    message: '姓名不能大于20个字',
                  }
                ],
              })(<Input allowClear placeholder={i18n.t`请输入中文名或英文名`} />)}
            </FormItem>
            <FormItem label={i18n.t`手机号码`} {...formItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
                rules: [
                  {
                    required: false,
                    pattern: /^1[34578]\d{9}$/,
                    message: i18n.t`The input is not valid phone!`,
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入手机号码`} />)}
            </FormItem>
            <FormItem label={i18n.t`邮箱`} {...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    // required: true,
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: i18n.t`The input is not valid E-mail!`,
                  },
                ],
              })(<Input allowClear placeholder={i18n.t`请输入邮箱地址`} />)}
            </FormItem>
          </Form>
        </Modal>
      )
    }else if(modalType === 'detail'){
      return (
        <Modal {...modalProps} onOk={this.handleOk} showCancel={false}>
          <Form layout="horizontal">
            <FormItem label={i18n.t`角色名称`} {...detailFormItemLayout}>
              {getFieldDecorator('roleName', {
                initialValue: item.roleName,
              })(<span>{item.roleName}</span>)}
            </FormItem>
            <FormItem label={i18n.t`登录账号`} {...detailFormItemLayout}>
              {getFieldDecorator('username', {
                initialValue: item.username,
              })(<span>{item.username}</span>)}
            </FormItem>
            <FormItem label={i18n.t`姓名`} {...detailFormItemLayout}>
              {getFieldDecorator('name', {
                initialValue: item.name,
              })(<span>{item.name}</span>)}
            </FormItem>
            <FormItem label={i18n.t`联系邮箱`} {...detailFormItemLayout}>
              {getFieldDecorator('email', {
                initialValue: item.email,
              })(<span>{item.email}</span>)}
            </FormItem>
            <FormItem label={i18n.t`联系手机`} {...detailFormItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
              })(<span>{item.mobile}</span>)}
            </FormItem>
            {/* <FormItem label={i18n.t`可访问起始IP`} {...detailFormItemLayout}>
              {getFieldDecorator('startIp', {
                initialValue: item.startIp,
              })(<span>{item.startIp}</span>)}
            </FormItem>
            <FormItem label={i18n.t`可访问结束IP`} {...detailFormItemLayout}>
              {getFieldDecorator('endIp', {
                initialValue: item.endIp,
              })(<span>{item.endIp}</span>)}
            </FormItem> */}
          </Form>
        </Modal>
      )
    }else if(modalType === 'changePwd'){
      return (
        <Modal {...modalProps} onOk={this.handleOk}>
          <Form layout="horizontal">
            {/* <FormItem label={i18n.t`原密码`} {...formItemLayout}>
              {getFieldDecorator('originPassword', {
                initialValue:'',
                rules: [
                  {
                    required: true,
                    message:'请输入原密码'
                  },
                ],
              })(<Input allowClear type={'password'} autoComplete='old-password' placeholder={i18n.t`请输入原密码`} />)}
            </FormItem> */}
            <FormItem label={i18n.t`登录密码`} {...formItemLayout}>
              {getFieldDecorator('password', {
                initialValue: item.password,
                rules: [
                  {
                    required: true,
                    pattern: '(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,20}',
                    message:'请输入8-20位密码，由大小写字母、数字、特殊字符组成'
                  },
                  {
                    min: 6,
                    message: '至少输入6位字符',
                  },
                  {
                    max: 20,
                    message: '至多输入20位字符',
                  },
                ],
              })(<Input allowClear type={'password'} autoComplete='new-password' minLength={6} maxLength={20} placeholder={i18n.t`请输入8-20位密码，由字母大小写、数字、特殊字符组成`} />)}
            </FormItem>
            <FormItem label={i18n.t`确认密码`} {...formItemLayout}>
              {getFieldDecorator('newPassword', {
                initialValue: item.newPassword,
                rules: [
                  {
                    required: true,
                    message:'请输入8-20位密码，由大小写字母、数字、特殊字符组成'
                  },
                  {
                    validator: this.handleConfirmPassword,
                  },
                ],
              })(<Input allowClear type={'password'} autoComplete='new-password' minLength={6} maxLength={20} placeholder={i18n.t`请确认密码`} />)}
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
}

export default UserModal
