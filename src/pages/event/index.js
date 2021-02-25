import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message } from 'antd'
import { withI18n,Trans} from '@lingui/react'
import { Page, Button ,Text,Operation} from 'components'
import { stringify } from 'qs'
// import { Button, Operation, Text } from 'components'
// import { Trans, withI18n } from '@lingui/react'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import exportExcel from './exportExcel'
// import { apiPrefix } from 'utils/config'


@withI18n()
@connect(({ event, loading }) => ({ event, loading }))
class Index extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      level : props.location.search.split('&')[0].split('level=')[1],
      disabled:true,
      eventtype:'',
      startTime:'',
      endTime:'',
      order:'',
      sort:'',
      filterFrom:{
        level : props.location.search.split('&')[0].split('level=')[1],
      }
    }
  }

  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location
    if(Number(newQuery.current)==Number(query.current) && Number(newQuery.pageSize)==Number(query.pageSize)){
      return
    }else{
      router.replace({
        pathname,
        search: stringify(
          {
            ...query,
            ...newQuery,
          },
          { arrayFormat: 'repeat' }
        ),
      })
    }

  }

  componentDidMount(){
    const { dispatch } = this.props
    dispatch({
      type: 'event/pageEvent',
      payload: {
        level: this.state.level,
        current: '1',
        pageSize: '10',
      }
    })
  }

  removeEmptyField = (obj) => {
    var newObj = {};
    if(typeof obj == "string"){
        obj = JSON.parse(obj);
    }
    if(obj instanceof Array){
        newObj = [];
    }
    if(obj instanceof Object){
        for(var attr in obj){
            if(obj.hasOwnProperty(attr) && obj[attr] !== "" && obj[attr] !== null && obj[attr] !== undefined){
                if(obj[attr] instanceof Object){
                    newObj[attr] = removeEmptyField(obj[attr]);
                }else if(typeof obj[attr] == "string" && ((obj[attr].indexOf("{") > -1 && obj[attr].indexOf("}") > -1) || (obj[attr].indexOf("[") > -1 && obj[attr].indexOf("]") > -1))){
                    try{
                        var attrObj = JSON.parse(obj[attr]);
                        if(attrObj instanceof Object){
                            newObj[attr] = removeEmptyField(attrObj);
                        }
                    }catch (e){
                        newObj[attr] = obj[attr];
                    }
                }else{
                    newObj[attr] = obj[attr];
                }
            }
        }
    }
    return newObj;
}

  handleItems = (key) => {
    const { dispatch, event, i18n } = this.props
    const { selectedRowKeys } = event

    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    } else if (key === '0' && selectedRowKeys.length) {
      window.location.href = window.ip + '/exportEventBatch?ids[]=' + selectedRowKeys.toString() + '';
    }

    if (key === '1') {
      delete this.state.filterFrom.current;
      delete this.state.filterFrom.pageSize;
      var json = this.removeEmptyField(this.state.filterFrom)
      var params = Object.keys(json).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);

      }).join("&");
      console.log(params);
      // window.location.href = window.ip + '/exportEvent?level='+this.level+'&eventtype='+this.eventtype+'&startTime='+this.startTime+'&endTime='+this.endTime+'&detail='+this.detail+'&srcip='+this.srcip+'&srcport='+this.srcport+'';
      window.location.href = window.ip + '/exportEvent?'+params+'';
    }
  }

  get modalProps() {
    const { dispatch, event, loading, i18n } = this.props
    const { currentItem, detail, modalVisible, modalType, detailLoding } = event
    const { list = [], pagination, selectedRowKeys } = event.detailEvent
    
    return {
      modalType: modalType,
      detailLoding: detailLoding,
      item: modalType === 'detail' ? detail : currentItem,
      dataSource:list,
      visible: modalVisible,
      confirmLoading: loading.effects[`event/${modalType}`],
      loading: loading.effects['event/relationEvent'],
      pagination,
      title: `${
        modalType === 'update' ? i18n.t`编辑事件` :
        modalType === 'block' ? i18n.t`阻断的IP配置` : 
        modalType === 'detail' ? i18n.t`详细信息` : i18n.t`提示`
        }`,
      onChange: page => {
        dispatch({
          type: 'event/relationEvent',
          payload:{
            id: currentItem.id,
            current:page.current,
            pageSize:page.pageSize
          }
        })
      },
      onOk: data => {
        if (modalType == 'block') {
          dispatch({
            type: 'event/createBlockingUp',
            payload: {
              id: data.id,
              blockTime: data.blockTime
            }
          })
        } else if (modalType == 'follow') {
          dispatch({
            type: 'event/configSave',
            payload: {
              eventId: data.id,
              type: '2',
              followIp: data.followIp,
              ruleId: ''
            },
          })
        } else if (modalType == 'detail') {
          dispatch({
            type: 'event/hideModal',
          })
          dispatch({
            type: 'event/sysDetail',
            payload:{
              detailLoding:true
            }
          })
        } else {
          dispatch({
            type: `event/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'event/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, event, loading } = this.props
    const { list = [], pagination, selectedRowKeys } = event.pageEvent
    if(list.length>0){
      this.setState({ disabled:false })
    }else{
      this.setState({ disabled:true })
    }
    return {
      dataSource: list,
      loading: loading.effects['event/pageEvent'],
      pagination,
      onChange: (page, filters, sorter, extra) => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
        dispatch({
          type: 'event/pageEvent',
          payload: {
            level: this.state.level,
            eventtype: this.state.eventtype,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            current: page.current,
            pageSize: page.pageSize,
            order:sorter.order=="ascend"?'asc':sorter.order=="descend"?'desc':'',
            sort:sorter.columnKey
          }
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'event/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
            pageSize: pagination.pageSize,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'event/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onViewItem(item) {
        dispatch({
          type: 'event/showModal',
          payload: {
            modalType: 'block',
            currentItem: item,
          },
        })
      },
      onFilterSave(item) {
        dispatch({
          type: 'event/configSave',
          payload: {
            eventId: item.id,
            type: '0',
            followIp: item.dstip,
            ruleId: ''
          },
        })
      },
      onExceptionSave(item) {
        dispatch({
          type: 'event/configSave',
          payload: {
            eventId: item.id,
            type: '1',
            followIp: item.dstip,
            ruleId: ''
          },
        })
      },
      onFollow(item) {
        dispatch({
          type: 'event/showModal',
          payload: {
            modalType: 'follow',
            currentItem: item,
          },
        })
      },
      onShowDetail(item) {
        dispatch({
          type: 'event/getListDetail',
          payload:{
            id: item.id
          }
        })
        dispatch({
          type: 'event/relationEvent',
          payload:{
            id: item.id,
            current:1,
            pageSize:10
          }
        })
        dispatch({
          type: 'event/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        // selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'event/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  get filterProps() {
    const { location, dispatch } = this.props
    const { query } = location
    return {
      filter: {
        // ...query,
        level: query.level,
        current: query.current,
        pageSize: query.pageSize,
      },
      onFilterChange: value => {
        console.log(value);
        this.setState({
          filterFrom: value
        })
        if(value.time.length==2){
          value.startTime = value.time[0],
          value.endTime = value.time[1],
          this.setState({
            startTime: value.time[0],
            endTime: value.time[1],
          })
          delete value.time
        }else{
          this.setState({
            level: value.level,
            eventtype: value.eventtype,
          })
          delete value.time
        }
        dispatch({
          type: 'event/pageEvent',
          payload: {
            ...value
          }
          // payload: {
          //   level: value.level,
          //   eventtype: value.eventtype,
          //   startTime: value.time[0],
          //   endTime: value.time[1],
          //   current: value.current,
          //   pageSize: value.pageSize,
          // }
        })
        this.handleRefresh({
          ...value,
        });
      },
      onAdd() {
        dispatch({
          type: 'event/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('0')}>批量导出</Button>
          <Button type="primary" disabled={this.state.disabled} size="small" onClick={() => this.handleItems('1')}>全部导出</Button>
          {/* <Button type="primary" size="small" onClick={() => exportExcel(columns,this.listProps.dataSource)}>全部导出</Button> */}
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  event: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
