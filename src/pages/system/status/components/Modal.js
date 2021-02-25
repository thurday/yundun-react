import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form  } from 'antd'
import { withI18n } from '@lingui/react'
import { Modal } from 'components'
import { CheckCircleOutlined, SyncOutlined, CloseCircleOutlined  } from '@ant-design/icons';

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
  constructor(props) {
    super(props);  
    this.state={
      ping:'1',
      sys_time:'1',
      sys:'1',
      warn:'1',
      log:'1',
      resource:'1',
      tezheng_v:'1',
      tance_v:'1',
      xitong_v:'1',
      hardware:'1'
    }
  }
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
    const { item = {}, onOk, form, i18n, modalType, pingFlag, ...modalProps } = this.props
    const { getFieldDecorator, getFieldValue  } = form
    const fontStyle = {
        margin:'10px 0 10px 24%',
        fontSize:'14px',
    }

    if(pingFlag){
      if(item.sys_time){
        setTimeout(()=>{
          this.setState({sys_time:'2'})
        },1000)
      }else{
        setTimeout(()=>{
          this.setState({sys_time:'3'})
        },1000)
      }

      if(item.sys){
        setTimeout(()=>{
          this.setState({sys:'2'})
        },2000)
      }else{
        setTimeout(()=>{
          this.setState({sys:'3'})
        },2000)
      }

      if(item.warn){
        setTimeout(()=>{
          this.setState({warn:'2'})
        },3000)
      }else{
        setTimeout(()=>{
          this.setState({warn:'3'})
        },3000)
      }

      if(item.log){
        setTimeout(()=>{
          this.setState({log:'2'})
        },4000)
      }else{
        setTimeout(()=>{
          this.setState({log:'3'})
        },4000)
      }

      if(item.ping){
        setTimeout(()=>{
          this.setState({ping:'2'})
        },5000)
      }else{
        setTimeout(()=>{
          this.setState({ping:'3'})
        },5000)
      }

      if(item.resource){
        setTimeout(()=>{
          this.setState({resource:'2'})
        },6000)
      }else{
        setTimeout(()=>{
          this.setState({resource:'3'})
        },6000)
      }
      
      if(item.tezheng_v){
        setTimeout(()=>{
          this.setState({tezheng_v:'2'})
        },7000)
      }else{
        setTimeout(()=>{
          this.setState({tezheng_v:'3'})
        },7000)
      }

      if(item.tance_v){
        setTimeout(()=>{
          this.setState({tance_v:'2'})
        },8000)
      }else{
        setTimeout(()=>{
          this.setState({tance_v:'3'})
        },8000)
      }
      
      if(item.xitong_v){
        setTimeout(()=>{
          this.setState({xitong_v:'2'})
        },9000)
      }else{
        setTimeout(()=>{
          this.setState({xitong_v:'3'})
        },9000)
      }

      if(item.hardware){
        setTimeout(()=>{
          this.setState({hardware:'2'})
        },10000)
      }else{
        setTimeout(()=>{
          this.setState({hardware:'3'})
        },10000)
      }
    }else{
      this.setState({
        ping:'1',
        sys_time:'1',
        sys:'1',
        warn:'1',
        log:'1',
        resource:'1',
        tezheng_v:'1',
        tance_v:'1',
        xitong_v:'1',
        hardware:'1'
      })
    }
    return (
      <Modal {...modalProps} onOk={this.handleOk} showCancel={false}>
          {this.state.sys_time=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10 }} spin />
            <span>检测系统时间</span>
          </div>:
          this.state.sys_time=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测系统时间</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测系统时间</span>
          </div>}


          {this.state.sys=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10}} spin />
            <span>检测系统是否正常开启</span>
          </div>:
          this.state.sys=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测系统是否正常开启</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测系统是否正常开启</span>
          </div>}

          {this.state.warn=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10}} spin />
            <span>检测告警功能是否正常</span>
          </div>:
          this.state.warn=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测告警功能是否正常</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测告警功能是否正常</span>
          </div>}

          {this.state.log=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10}} spin/>
            <span>检测系统日志是否正常</span>
          </div>:
          this.state.log=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测系统日志是否正常</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测系统日志是否正常</span>
          </div>}

          {this.state.ping=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10 }} spin />
            <span>检测系统组件通信</span>
          </div>:
          this.state.ping=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测系统组件通信</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测系统组件通信</span>
          </div>}

          {this.state.resource=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10}} spin />
            <span>检测设备资源分配是否正常</span>
          </div>:
          this.state.resource=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测设备资源分配是否正常</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测设备资源分配是否正常</span>
          </div>}

          {this.state.tezheng_v=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10}} spin />
            <span>检测特征库是否是最新版本</span>
          </div>:
          this.state.tezheng_v=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测特征库是否是最新版本</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测特征库是否是最新版本</span>
          </div>}

          {this.state.tance_v=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10}} spin />
            <span>检测探测器版本是否是最新版本</span>
          </div>:
          this.state.tance_v=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测探测器版本是否是最新版本</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测探测器版本是否是最新版本</span>
          </div>}

          {this.state.xitong_v=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10}} spin />
            <span>检测系统是否是最新版本</span>
          </div>:
          this.state.xitong_v=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测系统是否是最新版本</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测系统是否是最新版本</span>
          </div>}

          {this.state.hardware=='1'?
          <div style={fontStyle}>
            <SyncOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10}} spin />
            <span>检测系统硬件是否正常</span>
          </div>:
          this.state.hardware=='2'?
          <div style={fontStyle}>
            <CheckCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#71bfb4'}} />
            <span style={{color:'#71bfb4'}}>检测系统硬件是否正常</span>
          </div>:
          <div style={fontStyle}>
            <CloseCircleOutlined style={{fontSize:16,verticalAlign:'sub',marginRight:10, color:'#f00'}} />
            <span style={{color:'#f00'}}>检测系统硬件是否正常</span>
          </div>}
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
