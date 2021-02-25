/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { SearchView, Button } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Form, Input, Modal, Progress, message, Upload, Icon } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import styles from '../index.less'

const FormItem = Form.Item
const { confirm } = Modal

const formItemLayout = {
  labelCol: {
    span: 24,
  },
  wrapperCol: {
    span: 12,
    offset: 2,
  },
}

@withI18n()
@Form.create()
@SearchView
class Filter extends Component {
  constructor(props) {
    super(props);  
    this.state={
      visible:false,
      percent: 0,
    }
  }

  handleClick = (key,value) => {
    var that = this;
    const { onAdd, version } = this.props;
    if(key=='8'){
      confirm({
        title: '您确定要执行该操作吗？执行后系统将在10秒内重启。',
        onOk() {
          onAdd(key,value);
        },
      })
    }else if(key=='5'){
      confirm({
        title: '确定'+value+'吗?',
        onOk() {
          if(version.engine || version.rule){
            onAdd(key,value);
            that.setState({visible:true})
            setInterval(()=>{
              let percent = that.state.percent + 1;
              if (percent > 100) {
                percent = 100;
              }
              that.setState({ percent });
            },100)
            setTimeout(()=>{
              that.setState({visible:false})
              Modal.success({
                content: '更新完成，系统将10秒内自动重启',
              });
          },10000)
          }else{
            message.warn('当前版本是最新版');
          }
          
        },
      })
    }else{
      confirm({
        title: '确定'+value+'吗?',
        onOk() {
          onAdd(key,value);
        },
      })
    }
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { time, version, dataStatus, form, onAdd, i18n } = this.props

    const uploadProps = {
      name: 'file',
      action: window.ip+'/assetConfig/excelInsert',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done' && info.file.response.code == 0) {
          message.success(`${info.file.name} 导入成功`);
        } else if(info.file.status === 'done' && info.file.response.code != 0) {
          message.error(`${info.file.name} 导入失败,${info.file.response.msg}`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败,${info.file.response.msg}`);
        }
      },
    };
    return (
      <div>
        <Form layout="horizontal" className={styles.form}>
          <FormItem label={i18n.t`时间同步`} {...formItemLayout}>
            <div>{time}</div>
            <div>时间服务器</div>
            <div><Input defaultValue={'cn.ntp.org.cn'} disabled /></div>
            <div>
              <Button type="primary" className="margin-right" onClick={() => this.handleClick('1','同步服务器时间')}>
                <Trans>同步服务器时间</Trans>
              </Button>
              {/* <Button type="primary" onClick={() => this.handleClick('2','同步本机时间')}>
                <Trans>同步本机时间</Trans>
              </Button> */}
            </div>
          </FormItem>
          <FormItem label={i18n.t`更新管理`} {...formItemLayout}>
            <div>软件版本：{version.app || 0}</div>
            <div>分析引擎：{version.engine_version || 0}</div>
            <div>规则库：{version.rule_version || 0}</div>
            <div>
              <Button type={dataStatus=='1'?'default':'primary'} disabled={dataStatus=='1'?true:false} className="margin-right" onClick={() => this.handleClick('3','启用自动更新')}>
                <Trans>启用自动更新</Trans>
              </Button>
              <Button type={dataStatus=='1'?'primary':'default'} disabled={dataStatus=='0'?true:false} className="margin-right" onClick={() => this.handleClick('4','停止自动更新')}>
                <Trans>停止自动更新</Trans>
              </Button>
              <Button className="margin-right" type="primary" onClick={() => this.handleClick('5','立即升级')}>
                <Trans>立即升级</Trans>
              </Button>
              <Button type="primary" className="margin-right" onClick={() => this.handleClick('6','统一升级')}>
                <Trans>统一升级</Trans>
              </Button>
              <Upload {...uploadProps}>
                <Button type="primary"><Icon type="vertical-align-bottom" />手动升级</Button>
              </Upload>
            </div>
          </FormItem>
          <FormItem label={i18n.t`系统自检`} {...formItemLayout}>
            <div>
              <Button type="primary" onClick={() => this.handleClick('7','系统检测')}>
                <Trans>系统检测</Trans>
              </Button>
            </div>
          </FormItem>
          <FormItem label={i18n.t`启停控制`} {...formItemLayout}>
            <div>
              <Button type="primary" className="margin-right" onClick={() => this.handleClick('8','重启设备')}>
                <Trans>重启设备</Trans>
              </Button>
              {/* <Button type="danger" onClick={() => onAdd('9')}>
                <Trans>关机</Trans>
              </Button> */}
            </div>
          </FormItem>
        </Form>
        <Modal visible={this.state.visible} footer={null} onCancel={this.handleCancel}>
          <p>{this.state.percent==100?'更新完成':'系统更新中'}</p>
          <Progress percent={this.state.percent} />
        </Modal>
        {/* <Button onClick={this.success}>Success</Button> */}
      </div>
    )
  }
}

Filter.defaultProps = {
  wrapStyle: { width: '72%', margin: '0 auto', padding: 20 }
}

Filter.propTypes = {
  form: PropTypes.object,
  filter: PropTypes.object,
  onAdd: PropTypes.func,
}

export default Filter
