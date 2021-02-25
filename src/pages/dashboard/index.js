import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Card, Row, Col, Checkbox, message } from 'antd'
import { Page, Operation } from 'components'
import CardList from './components/CardList'
import List from './components/List'
import FollowList from './components/FollowList'
import NumberCard from './components/NumberCard'
import Chart from './components/Chart'
import Modal from './components/Modal'
import styles from './index.less'

// 测试数据
// const numbers = [{
//   number: 123456,
//   title: '威胁事件总数',
//   color: '#1c84c6',
//   icon: '/icons/primary.svg',
// }, {
//   number: 520,
//   title: '高危事件总数',
//   color: '#ed5565',
//   icon: '/icons/error.svg',
// }, {
//   number: 1314,
//   title: '中危事件总数',
//   color: '#f5be5b',
//   icon: '/icons/warning.svg',
// }, {
//   number: 12050,
//   title: '低危事件总数',
//   color: '#1ab394',
//   icon: '/icons/success.svg',
// }]

// 映射 Map
const numberCardsMap = {
  '0': {
    title: '威胁事件总数',
    color: '#1c84c6',
    icon: '/icons/primary.svg',
  },
  '1': {
    title: '低危事件总数',
    color: '#1ab394',
    icon: '/icons/success.svg',
  },
  '2': {
    title: '中危事件总数',
    color: '#f5be5b',
    icon: '/icons/warning.svg',
  },
  '3': {
    title: '高危事件总数',
    color: '#ed5565',
    icon: '/icons/error.svg',
  },
}

/**
 * 数组求和
 */
function sum(arr = []) {
  return arr.reduce((acc, name) => (acc + parseInt(name.num)), 0)
}

@connect(({ app, dashboard, loading }) => ({
  dashboard,
  loading,
}))
class Dashboard extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      collapsed:false,
      level:'1,2,3'
    }
  }
  get cardListProps() {
    const { dispatch, dashboard, loading } = this.props
    const { currentItem, modalType, modalVisible } = dashboard
    const { list, pagination } = dashboard.ipListEvent
    const sourceSum = sum(dashboard.srcipEvent.list)
    const sourceSum2 = sum(dashboard.dstipEvent.list)
    const source = dashboard.srcipEvent.list.map((v) => ({
      title: v.srcip,
      value: String(v.num),
      percent: v.num / sourceSum * 100, // 计算比例，乘以 100
      ipType:'srcip'
    }))
    const target = dashboard.dstipEvent.list.map((v) => ({
      title: v.dstip,
      value: String(v.num),
      percent: v.num / sourceSum2 * 100, // 计算比例，乘以 100
      ipType:'dstip'
    }))
    return {
      source,
      target,
      loading: loading.effects['dashboard/srcipEvent'] || loading.effects['dashboard/dstipEvent'],
      onShowIpList:data => {
        dispatch({
          type: 'dashboard/ipListEvent',
          payload: {
            current:1,
            pageSize:10,
            [data.props.ipType]:data.props.title
          }
        })
        dispatch({
          type: 'dashboard/showModal',
          payload: {
            modalType: 'ipList',
            currentItem: data,
          },
        })
      }
    }
  }

  get followListProps() {
    const { dispatch, dashboard, loading } = this.props
    const { list = [] } = dashboard.configFocus

    return {
      dataSource: list,
      loading: loading.effects['dashboard/configFocusList'],
      onFilterSave(item) {
        dispatch({
          type: 'dashboard/configSave',
          payload: {
            eventId:item.id,
            type:'0',
            followIp:item.dstip,
            ruleId:''
          },
        })
      },
      onExceptionSave(item) {
        dispatch({
          type: 'dashboard/configSave',
          payload: {
            eventId:item.id,
            type:'1',
            followIp:item.dstip,
            ruleId:''
          },
        })
      },
      onShowDetail(item) {
        dispatch({
          type: 'dashboard/getListDetail',
          payload:{
            id: item.id
          }
        })
        dispatch({
          type: 'dashboard/relationEvent',
          payload:{
            id: item.id,
            current:1,
            pageSize:10
          }
        })
        dispatch({
          type: 'dashboard/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
    }
  }

  get listProps() {
    const { dispatch, dashboard, loading } = this.props
    const { list = [] } = dashboard.listEvent

    return {
      dataSource: list,
      loading: loading.effects['dashboard/listEvent'],
      // onDeleteItem: id => {},
      onDeleteItem: id => {
        dispatch({
          type: 'dashboard/delete',
          payload: id,
        }).then(() => {
          dispatch({
            type:'dashboard/listEvent',
          })
        })
      },
      onEditItem(item) {},
      onViewItem(item) {
        dispatch({
          type: 'dashboard/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
      onFilterSave(item) {
        dispatch({
          type: 'dashboard/configSave',
          payload: {
            eventId:item.id,
            type:'0',
            followIp:item.dstip,
            ruleId:''
          },
        })
      },
      onExceptionSave(item) {
        dispatch({
          type: 'dashboard/configSave',
          payload: {
            eventId:item.id,
            type:'1',
            followIp:item.dstip,
            ruleId:''
          },
        })
      },
      onFollow(item){
        dispatch({
          type: 'dashboard/showModal',
          payload: {
            modalType: 'follow',
            currentItem: item,
          },
        })
      },
      onShowDetail(item) {
        dispatch({
          type: 'dashboard/getListDetail',
          payload:{
            id: item.id
          }
        })
        dispatch({
          type: 'dashboard/relationEvent',
          payload:{
            id: item.id,
            current:1,
            pageSize:10
          }
        })
        dispatch({
          type: 'dashboard/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
    }
  }

  get chartProps() {
    const { dispatch, dashboard, loading } = this.props
    const { chartType } = dashboard
    const { list = [] } = dashboard.typeEvent
    const threat_type = list.map((v) => ({ value: v.num, name: v.eventtype }))
    const safety_Trend = dashboard.safetyTrend.list.map((v) => ({ name:v.day, '高危': v.high, '中危': v.middle, '低危': v.low }))
    // const safety_Trend = dashboard.safetyTrend.list.map((v) => ({ name:v.day, '高危': '10', '中危': '8', '低危': 5 }))

    return {
      data: {
        threat_type, // 威胁类型
        safety_Trend,//安全趋势
      },
      onFilterChange: value => {

        let date = '';
        if(chartType == 'month'){
          date = 'year';
          dispatch({
            type: 'dashboard/updateState',
            payload: {
              chartType: 'year'
            }
          })
        }else if(chartType == 'year'){
          date = 'hour';
          dispatch({
            type: 'dashboard/updateState',
            payload: {
              chartType: 'hour'
            }
          })
        }else if(chartType == 'hour'){
          date = 'day';
          dispatch({
            type: 'dashboard/updateState',
            payload: {
              chartType: 'day'
            }
          })
        }else if(chartType == 'day'){
          date = 'week';
          dispatch({
            type: 'dashboard/updateState',
            payload: {
              chartType: 'week'
            }
          })
        }else if(chartType == 'week'){
          date = 'month';
          dispatch({
            type: 'dashboard/updateState',
            payload: {
              chartType: 'month'
            }
          })
        }
        
        dispatch({
          type: 'dashboard/safetyTrend',
          payload: {
            type: date
          }
        })
      },
    }
  }

  get modalProps() {
    const { dispatch, dashboard, loading, i18n } = this.props
    const { currentItem, detail, modalVisible, modalType, detailLoding, machineCode } = dashboard
    const { list = [], pagination } = dashboard.detailEvent
    const { ipList = [], ipListpagination } = dashboard.ipListEvent
    console.log(this.props);
    return {
      modalType:modalType,
      detailLoding:detailLoding,
      machineCode:machineCode,
      item: modalType === 'detail' ? detail : currentItem,
      dataSource:modalType === 'detail' ? list : ipList,
      visible: modalVisible,
      confirmLoading: loading.effects[`dashboard/${modalType}`],
      loading: loading,
      pagination,
      ipListpagination,
      title: modalType === 'detail'?'详细信息':modalType === 'activation'?'激活':modalType === 'ipList'?currentItem.props.title:'提示',
      onChange: page => {
        if(modalType === 'detail'){
          dispatch({
            type: 'dashboard/relationEvent',
            payload:{
              id: currentItem.id,
              current:page.current,
              pageSize:page.pageSize
            }
          })
        }else if(modalType === 'ipList'){
          dispatch({
            type: 'dashboard/ipListEvent',
            payload: {
              current:page.current,
              pageSize:page.pageSize,
              srcip:currentItem.props.title
            }
          })
        }
      },
      onOk: data => {
        if(modalType == 'follow'){
          dispatch({
            type: 'dashboard/configSave',
            payload: {
              eventId: data.id,
              type: '2',
              followIp: data.followIp,
              ruleId: ''
            },
          }).then(
            dispatch({
              type:'dashboard/configFocusList',
              payload: {
                current:1,
                pageSize:10
              },
            })
          )
        }else if(modalType === 'detail'){
          dispatch({
            type:'dashboard/hideModal'
          })
          dispatch({
            type:'dashboard/sysDetail',
            payload:{
              detailLoding:true
            }
          })
        }else if(modalType === 'activation'){
          dispatch({
            type:'dashboard/activation',
            payload: data
          })
        }else if(modalType === 'ipList'){
          dispatch({
            type: 'dashboard/hideModal',
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'dashboard/hideModal',
        })
      },
      // showCancel: false,
      // width: '20%',
    }
  }

  get numberCardsProps() {
    const { dispatch, dashboard, loading } = this.props
    const { list = [] } = dashboard.totalEvent
    // const counts = sum(list)
    // const numbers = [{ level: 0, num: counts },...list].map((v) => ({ ...numberCardsMap[v.level], number: v.num }))
    const numbers = list.map((v) => ({ ...numberCardsMap[v.level], number: v.num }))
    return {
      numbers,
    }
  }

  handleClientW = (width,num)=>{
    if(width < num){
      this.setState({
        collapsed:true
      })
    }else{
      this.setState({
        collapsed:false
      })
    }
  }
  componentDidMount() {
    const { dispatch } = this.props
    window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    let clientW = document.documentElement.clientWidth;
    this.handleClientW(clientW,992);
    dispatch({
      type: 'dashboard/listEvent',
      payload: {
        level: this.state.level,
      }
    })
    this.reLoad = setInterval(this.Refresh,60000)
  }
  Refresh = () => {
    const { dispatch } = this.props
    dispatch({ type: 'dashboard/totalEvent' })
    dispatch({ type: 'dashboard/typeEvent' })
    dispatch({ type: 'dashboard/srcipEvent' })
    dispatch({ type: 'dashboard/dstipEvent' })
    dispatch({ type: 'dashboard/listEvent', payload: {level: this.state.level} })
    dispatch({ type: 'dashboard/safetyTrend', payload:{type:'month'} })
    dispatch({ type: 'dashboard/totalAsset' })
    dispatch({ type: 'dashboard/configFocusList',payload:{current: 1, pageSize: 10} })
  }
  handleResize = e => {
    let e_width = e.target.innerWidth;
    this.handleClientW(e_width,992);
    // console.log('浏览器窗口大小改变事件', e.target.innerWidth);
  }
  componentWillUnmount() {       
    window.removeEventListener('resize', this.handleResize.bind(this));
    clearInterval(this.reLoad)
  }

  onChangeLevel = (checkedValues) => {
    console.log('checked = ', checkedValues);
    if(checkedValues == ''){
      message.warn('至少选择一种风险等级');
      return
    }else{
      this.setState({
        level: checkedValues.toString()
      },()=>{
        this.componentDidMount();
      })
    }
  }

  render() {
    const bodyStyle = {
      padding: 0,
    }
    const titleStyle = {
      fontSize: 20,
      color: '#4d4d4d',
      fontWeight: 'normal',
    }
    let colStyle
    if(this.state.collapsed){
      colStyle = ''
    }else{
      colStyle = {
        width:'20%'
      }
    }

    const { numbers } = this.numberCardsProps
    numbers.unshift({color:"#1c84c6",icon:"/icons/u67.png",number:this.props.dashboard.totalAsset,title:"资产漏洞总数",href:"/assets/domain"})
    numbers.unshift({color:"#1c84c6",icon:"/icons/assets.png",number:this.props.dashboard.totalAsset,title:"资产总数",href:"/loophole/assetbug"})
    for(let i=0;i<numbers.length;i++){
      numbers[0].href = "/assets/domain"
      numbers[1].href = "/loophole/check"
      numbers[2].href = "/event?level=3"
      numbers[3].href = "/event?level=2"
      numbers[4].href = "/event?level=1"
    }
    const numberCards = numbers.map((item, key) => (
      <Col style={colStyle} key={key} lg={5} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

    const plainOptions = [{value:'1',label:'低危'},{value:'2',label:'中危'},{value:'3',label:'高危'}];

    return (
      <Page inner>
        <Row gutter={24}>{numberCards}</Row>
        <Chart {...this.chartProps} />
        <CardList {...this.cardListProps} />
        <Card bodyStyle={bodyStyle} title={<div style={titleStyle}>重点关注事件（当前24小时内）</div>}>
          <FollowList  {...this.followListProps} />
        </Card>
        <Card bodyStyle={bodyStyle} title={<div style={titleStyle}>最新事件</div>} extra={<div><span>风险等级：</span><Checkbox.Group options={plainOptions} defaultValue={['1','2','3']} onChange={this.onChangeLevel} /></div>}>
          <List {...this.listProps} />
        </Card>
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Dashboard
