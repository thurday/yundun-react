import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message, Tabs, Button } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import SysLog from './components/SysLog'
import OptLog from './components/OptLog'
import Safe from './components/Safe'
import Features from './components/Features'
import Auth from './components/Auth'
import Maintain from './components/Maintain'
import Status from './components/Status'
import Display from './components/Display'
import Potency from './components/Potency'
import './index.less'
import Modal from './components/Modal'
import ModalInfo from './components/ModalInfo'
// const { confirm } = Modal
const { TabPane } = Tabs
const TABS_DATA = [{
  label: '设备状态',
  value: '1',
}, {
  label: '系统日志',
  value: '2',
}, {
  label: '操作日志',
  value: '3',
}, 
// {
//   label: '系统授权',
//   value: '4',
// }, 
{
  label: '本机维护',
  value: '5',
}, {
  label: '显示设置',
  value: '6',
}, {
  label: '安全设置',
  value: '7',
}, {
  label: '功能设置',
  value: '8',
}]

@withI18n()
@connect(({ systemStatus, loading }) => ({ systemStatus, loading }))
class Index extends PureComponent {
  state = {
    tabs: TABS_DATA,
    activeKey: '1',
    pingFlag:false
  }

  handleRefresh = (newQuery,activeKey) => {
    const { systemStatus, dispatch,loading } = this.props
    const { current, pageSize } = systemStatus.pagination
    const query = { current, pageSize }
    if(activeKey==3){
      dispatch({
        type: 'systemStatus/query',
        payload: {
          ...query,
          ...newQuery,
        }
      })
    }else if(activeKey==2){
      dispatch({
        type: 'systemStatus/pageSysLog',
        payload: {
          ...query,
          ...newQuery,
        }
      })
    }else if(activeKey==6){
      dispatch({
        type: 'systemStatus/configShow',
      })
    }else if(activeKey==7){
      dispatch({
        type: 'systemStatus/safeSysLog',
      })
      dispatch({
        type: 'systemStatus/configQueryInfo',
        payload:{
          key:'storageControl'
        }
      })
      dispatch({
        type: 'systemStatus/getIdentifyMode'
      })
    }else if(activeKey==5){
      this.timer = setInterval(()=>{
        dispatch({
          type: 'systemStatus/nowTime',
        })
      },1000)
      
      dispatch({
        type: 'systemStatus/getVersion',
      })
      dispatch({
        type: 'systemStatus/aotuUpgradeStatus',
      })
    }else if(activeKey==8){
      dispatch({
        type: 'systemStatus/configQueryInfo',
        payload: {
          key:'firewallSwitch'
        }
      })
    }
    if(activeKey!=5){
      clearInterval(this.timer)
    }
  }

  componentWillUnmount(){
    clearInterval(this.timer)
  }

  
  //设备状态
  get filterProps() {
    const { dispatch,systemStatus,loading,i18n } = this.props
    const { devData, timeData, timeLimitData, limitTime, machineCode } = systemStatus

    return {
      loading: loading.effects['systemStatus/getSysInfo'],
      filter: devData,
      timeData: timeData,
      machineCode: machineCode,
      timeLimitData: timeLimitData,
      limitTime: limitTime,
      onAdd: (key,value) => {
        
      },
      onOk:(data) => {
        dispatch({
          type:'systemStatus/activation',
          payload: data
        })
      }
    }
  }

  //操作日志
  get listSystemProps() {
    const { dispatch, systemStatus, loading } = this.props
    const { list, pagination } = systemStatus

    return {
      dataSource: list,
      loading: loading.effects['systemStatus/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        },3)
      },
      onSearch: value => {
        this.handleRefresh({
          ...value,
        },3)
      },
    }
  }

  //系统日志
  get listOperationProps() {
    const { dispatch,systemStatus,loading } = this.props
    const { logList,logPagination, } = systemStatus

    return {
      dataSource: logList,
      loading: loading.effects['systemStatus/pageSysLog'],
      logPagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        },2)
      },
      onSearch: value => {
        this.handleRefresh({
          ...value,
        },2)
      },
      onEditItem(item){
        dispatch({
          type: 'systemStatus/showModalInfo',
          payload: {
            modalInfoType: 'update',
            currentItem: item
          }
        })
      },
      onViewItem(item){
        dispatch({
          type: 'systemStatus/showModalInfo',
          payload: {
            modalInfoType: 'block',
            currentItem: item
          }
        })
      }
    }
  }

  //显示设置
  get displayProps() {
    const { dispatch,systemStatus,loading } = this.props
    const { displayData } = systemStatus
    return {
      loading: loading.effects['systemStatus/configShow'],
      filter:displayData,
      // handleChange:(key, values)=>{

      // },
      onFilterChange: value => {
        if(value.warn.constructor == Array){
          value.warn = value.warn.join(',')
        }
        if(value.modal.constructor == Array){
          value.modal = value.modal.join(',')
        }
        dispatch({
          type:'systemStatus/updateConfigShow',
          payload:{
            ...value,
          }
        })
      },
    }
  }

  //弹窗
  get modalProps() {
    const { dispatch, systemStatus, loading, i18n } = this.props
    const { modalVisible, modalType, test, pingFlag } = systemStatus
    return {
      pingFlag:this.state.pingFlag,
      modalType:modalType,
      item: test,
      visible: modalVisible,
      title: `${'系统检测'}`,
      onOk: data => { 
        dispatch({
          type: 'systemStatus/hideModal',
          payload:{
            modalType:'hide',
          }
        })
        this.setState({pingFlag:false})
      },
    }
  }

  //安全设置
  get safeProps() {
    const { dispatch,systemStatus,loading } = this.props
    const { safeData,storage,identify } = systemStatus

    return {
      loading: loading.effects['systemStatus/safeSysLog'],
      filter:safeData,
      storage:storage,
      identify:identify,
      onSafeChange: value => {
        value.isCover==true?value.isCover=1:value.isCover=0
        dispatch({
          type:'systemStatus/updateConfigSafe',
          payload:{
            ...value,
          }
        })
      },
      onStorageChange: value => {
        dispatch({
          type:'systemStatus/configSaveGlobal',
          payload:{
            value:value.value,
            key:value.key
          }
        })
      },
      onIdentifyChange: value => {
        dispatch({
          type:'systemStatus/setIdentifyMode',
          payload:{
            value: value
          }
        })
      }
    }
  }

  //本机维护
  get maintainProps() {
    const { dispatch,systemStatus,loading,i18n } = this.props
    const { time, version, dataStatus, modalType, test, pingFlag } = systemStatus
    return {
      time:time,
      version:version,
      dataStatus:dataStatus,
      onAdd: (key,value) => {
        if(key === '1'){
          dispatch({
            type: 'systemStatus/syncTime',
          })
        }else if(key === '8'){
          dispatch({
            type: 'systemStatus/reboot',
          })
        }else if(key === '3'){
          dispatch({
            type: 'systemStatus/aotuUpgradeStart',
          })
        }else if(key === '4'){
          dispatch({
            type: 'systemStatus/aotuUpgradeStop',
          })
        }else if(key === '5'){
          dispatch({
            type: 'systemStatus/upgradeNow',
          })
        }else if(key === '7'){
          dispatch({
            type: 'systemStatus/testing',
          })
          dispatch({
            type: 'systemStatus/showModal',
            payload:{
              modalType:'create',
            }
          })
          this.setState({pingFlag:true})
        }else if(key === '6'){
          dispatch({
            type: 'systemStatus/upgradeAll',
          })
        }
        
      },
    }
  }

  //功能设置
  get potencyProps(){
    const { dispatch,systemStatus,loading } = this.props
    const { storage } = systemStatus
    return {
      firewallSwitch:storage,
      onFirewallChange: value => {
        value.value==true?value.value=1:value.value=0
        dispatch({
          type:'systemStatus/configSaveGlobal',
          payload:{
            value:value.value,
            key:value.key
          }
        })
      },
    }
  }

  get modalInfoProps() {
    const { dispatch, systemStatus, loading, i18n } = this.props
    const { currentItem, modalInfoVisible, modalInfoType } = systemStatus
    const { current, pageSize } = systemStatus.pagination
    const query = { current, pageSize }
    return {
      modalInfoType: modalInfoType,
      item: currentItem,
      visible: modalInfoVisible,
      confirmLoading: loading.effects[`systemStatus/${modalInfoType}`],
      title: `${
        modalInfoType === 'update' ? i18n.t`命名` : i18n.t`日志查看`
      }`,
      systemStatus,
      dispatch,
      onOk: data => {
        if(modalInfoType === 'update'){
          dispatch({
            type: `systemStatus/${modalInfoType}`,
            payload: {
              id: data.id,
              name: data.name
            },
          }).then(() => {
            this.handleRefresh(query,2)
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'systemStatus/hideModalInfo',
        })
      },
    }
  }
  
  onTabChange = (activeKey) => {
    this.setState({ activeKey }, () => {
      this.handleRefresh({ current: 1, pageSize: 10 },activeKey)
    })
  }

  render() {
    const { activeKey, tabs } = this.state
    const defaultProps = {
      destroyOnClose: true,
      maskClosable: false,
      closable: false,
      centered: false,
      width: '25%',
    }
    return (
      <Page inner>
        <Tabs activeKey={activeKey} onChange={this.onTabChange}>
          {tabs.map((v) => <TabPane tab={v.label} key={v.value} />)}
        </Tabs>
        {activeKey === '1' ? <Status {...this.filterProps} /> : null}
        {activeKey === '2' ? <SysLog {...this.listOperationProps} /> : null}
        {activeKey === '3' ? <OptLog {...this.listSystemProps} /> : null}
        {activeKey === '4' ? <Auth {...this.filterProps} /> : null}
        {activeKey === '5' ? <Maintain {...this.maintainProps} /> : null}
        {activeKey === '6' ? <Display {...this.displayProps} /> : null}
        {activeKey === '7' ? <Safe {...this.safeProps} /> : null}
        {activeKey === '8' ? <Potency {...this.potencyProps} /> : null}
        {this.state.pingFlag?<Modal {...this.modalProps} {...defaultProps} />:null}
        <ModalInfo {...this.modalInfoProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  systemStatus: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
