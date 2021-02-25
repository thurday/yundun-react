import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Modal, Upload } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import ModalList from './components/ModalList'
import ModalSystemList from './components/ModalSystemList'
import Modals from './components/Modal'
const { confirm } = Modal

@withI18n()
@connect(({ strategy, loading }) => ({ strategy, loading }))
class Index extends PureComponent {
  state = {
    activeKey: '1',
    typeItem:{},
    systemItem:{},
    disabled: true
  }

  handleRefresh = (newQuery,activeKey) => {
    const { strategy, dispatch, loading, location } = this.props
    const { query, pathname } = location
    const { current, pageSize } = strategy.pagination
    // const query = { current, pageSize }
    if(activeKey == 2){
      dispatch({
        type: 'strategy/strategyTypeList',
        payload: {
          ...query,
          ...newQuery,
          name:this.state.typeItem.name,
          groupId:this.state.typeItem.groupId
        }
      })
    }else if(activeKey == 1){
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
    }else if(activeKey == 3){
      dispatch({
        type: 'strategy/strategySystemList',
        payload: {
          ...query,
          ...newQuery,
          eventId:this.state.systemItem.eventId,
        }
      })
    }
  }

  handleItems = (key) => {
    const { dispatch, strategy, i18n } = this.props
    const { list, pagination, selectedRowKeys } = strategy

    if (key === '1') {
      dispatch({
        type: 'strategy/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }else if(key === '3'){
      window.location.href = window.ip+'/strategy/export?id='+selectedRowKeys.toString()+'';
    }
  }

  multiDeleteItems = () => {
    const { dispatch, strategy, i18n } = this.props
    const { list, pagination, selectedRowKeys } = strategy
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'strategy/multiDelete',
            payload: [selectedRowKeys].toString(),
          }).then(() => {
            that.handleRefresh({
              current:
                list.length === 1 && pagination.current > 1
                  ? pagination.current - 1
                  : pagination.current,
            })
          })
        },
      })
    }
  }

  getArrDifference = (arr1, arr2) => {
    return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}

  get modalProps() {
    const { dispatch, strategy, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType, list, pagination } = strategy

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`strategy/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`添加规则` : i18n.t`编辑规则`
      }`,
      onOk: data => {
        dispatch({
          type: `strategy/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          },1)
        })
      },
      onCancel() {
        dispatch({
          type: 'strategy/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, strategy, loading } = this.props
    const { list, pagination, selectedRowKeys } = strategy

    return {
      dataSource: list,
      loading: loading.effects['strategy/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        },1)
      },
      onShow: (activeKey,item) => {
        this.setState({
          typeItem:{
            name:item.name,
            groupId:item.id
          }
        })
        this.onTabChange(activeKey);
      },
      onDeleteItem: id => {
        dispatch({
          type: 'strategy/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          },1)
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'strategy/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onRuleChecked: (id,status) => {
        dispatch({
          type: 'strategy/update',
          payload: {
            id:id,
            status:status=='1'?'0':'1'
          },
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          },1)
        })
      },
      rowSelection: {
        selectedRowKeys,
        // type: 'radio',
        onChange: keys => {
          console.log(keys);
          if(keys.length==1){
            this.setState({
              disabled: false
            })
          }else{
            this.setState({
              disabled: true
            })
          }
          dispatch({
            type: 'strategy/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  get typeListProps() {
    const { dispatch, strategy, loading } = this.props
    const { typeList, typePagination } = strategy
    // const { current, pageSize } = strategy.pagination
    // const query = { current, pageSize }
    return {
      dataSource: typeList,
      loading: loading.effects['strategy/strategyTypeList'],
      typePagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        },2)
      },
      onTypeChecked: item => {
        dispatch({
          type: 'strategy/strategyChangeStatus',
          payload: {
            relationId: item.relationId,
            status: item.status=='1'?'0':'1'
          },
        })
        setTimeout(()=>{
          this.handleRefresh({
            current:
            typeList.length === 1 && typePagination.current > 1
                ? typePagination.current - 1
                : typePagination.current,
          },2)
        },100)
      },
      onShowSystem: (activeKey,item) => {
        this.setState({
          systemItem:{
            eventId:item.id
          }
        })
        this.onTabChange(activeKey);
      },
    }
  }

  get systemListProps() {
    const { dispatch, strategy, loading } = this.props
    const { systemList, pagination, systemSelectedRowKeys, listSelectedRowKeys } = strategy
    // const { current, pageSize } = strategy.pagination
    // const query = { current, pageSize }
    console.log(listSelectedRowKeys);
    return {
      dataSource: systemList,
      color: ['#fbb03b', '#ff0000', '#ff0000', '#85DA46', '#fbb03b', '#ff0000'],
      loading: loading.effects['strategy/strategySystemList'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        },3)
      },
      rowSelection: {
        listSelectedRowKeys,
        onChange: (keys,selectedRows) => {
          let arr = selectedRows.map(v=>v.id)
          dispatch({
            type: 'strategy/updateState',
            payload: {
              listSelectedRowKeys: arr,
            },
          })
        },
        getCheckboxProps: record => {
          return {
            defaultChecked: record.status == '1'
          }
        }
      },
    }
  }

  sysitemUpdate = () => {
    const { dispatch, strategy, i18n } = this.props
    const { systemList, pagination, systemSelectedRowKeys, listSelectedRowKeys } = strategy
    const arr = systemList.map(v=>v.id);
    let query = listSelectedRowKeys.toString();
    function arrFn(array,array2){ 
      var arr3 = [];  
      for(var i = 0; i < array.length; i ++){   
          let stra = array[i];  
          let count = 0;  
          for(var j = 0; j < array2.length; j ++){   
              var strb = array2[j];  
              if(stra == strb){   
                  count ++;  
              }   
          }   
          if(count == 0){//表示数组1的这个值没有重复的，放到arr3列表中   
              arr3.push(stra);  
          }   
      }   
      return arr3; 
    }
    let query2 = arrFn(arr,listSelectedRowKeys).toString()
    if(!listSelectedRowKeys.length){
      message.warn('请选择数据')
      return
    }else{
      dispatch({
        type: 'strategy/sysitemUpdate',
        payload: {
          ids:query,
          status:1
        },
      })
      dispatch({
        type: 'strategy/sysitemUpdate',
        payload: {
          ids:query2,
          status:0
        },
      })
    }
  }

  onTabChange = (activeKey) => {
    this.setState({ activeKey }, () => {
      this.handleRefresh({ current: 1, pageSize: 10 },activeKey)
    })
  }

  render() {
    const { activeKey } = this.state
    const uploadProps = {
      name: 'file',
      action: window.ip+'/strategy/excelInsert',
      headers: {
        authorization: 'authorization-text',
      },
      // data:{
      //   type:'1'
      // },
      showUploadList:false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done' && info.file.response.code == 0) {
          message.success(`${info.file.name} 导入成功`).then(() => {
            location.reload();
          });
        } else if(info.file.status === 'done' && info.file.response.code != 0) {
          message.error(`${info.file.name} 导入失败,${info.file.response.msg}`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败,${info.file.response.msg}`);
        }
      },
    }
    return (
      <Page inner>
        {activeKey === '1' ? <div style={{ marginBottom: 20, padding: 4 }}>
          <Button type="danger" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}><Icon type="delete" />批量删除</Button>
          <Button className="margin-right" type="primary" size="small" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
          <Button disabled={this.state.disabled} className="margin-right" type="primary" size="small" onClick={() => this.handleItems('3')}><Icon type="vertical-align-top" />导出</Button>
          <Upload style={{display:'inline-block'}} {...uploadProps}>
            <Button type="primary" size="small" className="margin-right"><Icon type="vertical-align-bottom" />导入</Button>
          </Upload>
        </div> : null}
        {activeKey === '1' ? <List {...this.listProps} /> : null}
        {activeKey === '2' ? <Button onClick={() => this.onTabChange('1')} style={{ marginBottom: 20 }}>返回策略组</Button> : null}
        {activeKey === '2' ? <ModalList {...this.typeListProps} /> : null}
        {activeKey === '3' ? <Button onClick={() => this.onTabChange('2')} style={{ marginBottom: 20 }}>返回策略</Button> : null}
        {activeKey === '3' ? <Button type="primary" onClick={() => this.sysitemUpdate()} style={{ margin:'0 0 20px 20px' }}>保存</Button> : null}
        {activeKey === '3' ? <ModalSystemList {...this.systemListProps} /> : null}
        <Modals {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  strategy: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
