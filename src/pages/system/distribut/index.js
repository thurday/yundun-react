import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message, Tabs, Icon, Modal } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import Probe from './components/probe'
import Native from './components/native'
import Modals from './components/Modal'
import Distribution from './components/distribution'
import Warning from './components/Warning'
import './index.less'

const { TabPane } = Tabs
const { confirm } = Modal
const TABS_DATA = [
  // {
  //   label: '本机角色',
  //   value: '1',
  // }, 
  {
    label: '探针配置',
    value: '2',
  }, 
  // {
  //   label: '分布结构',
  //   value: '3',
  // }
  {
    label: '全局预警',
    value: '4',
  }, 
]

@withI18n()
@connect(({ systemDistribut, loading }) => ({ systemDistribut, loading }))
class Index extends PureComponent {
  state = {
    tabs: TABS_DATA,
    activeKey: '2',
  }

  handleRefresh = (newQuery,activeKey) => {
    const { systemDistribut, dispatch,loading } = this.props
    const { current, pageSize } = systemDistribut.pagination
    const query = { current, pageSize }
    if(activeKey == '2'){
      dispatch({
        type: 'systemDistribut/query',
        payload: {
          ...query,
          ...newQuery,
        }
      })
    }else if(activeKey == '4'){
      dispatch({
        type: 'systemDistribut/heartbeatWarnList',
        payload: {
          ...query,
          ...newQuery,
        }
      })
    }
  }

  handleItems = (key) => {
    const { dispatch, systemDistribut, i18n } = this.props
    const { selectedRowKeys } = systemDistribut
    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }

    if (key === '1') {
      dispatch({
        type: 'systemDistribut/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  multiDeleteItems = () => {
    const { dispatch, systemDistribut, i18n } = this.props
    const { list, pagination, selectedRowKeys } = systemDistribut
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'systemDistribut/multiDelete',
            payload: [selectedRowKeys].toString(),
          }).then(() => {
            that.handleRefresh({
              current:
                list.length === 1 && pagination.current > 1
                  ? pagination.current - 1
                  : pagination.current,
            },'2')
          })
        },
      })
    }
  }

  get modalProps() {
    const { dispatch, systemDistribut, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = systemDistribut
    const { list = [], pictureList = [], pagination, selectedRowKeys } = systemDistribut.detailEvent
    return {
      modalType:modalType,
      dataSource:list,
      pictureList:pictureList,
      pagination,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`systemDistribut/${modalType}`],
      loading: loading,
      title: `${
        modalType === 'create' ? i18n.t`新增预警` : 
        modalType === 'update' ? i18n.t`编辑探针` : i18n.t`查看详情`
      }`,
      systemDistribut,
      dispatch,
      onChange: page => {
        dispatch({
          type: 'systemDistribut/detailEventList',
          payload:{
            source: currentItem.host,
            current:page.current,
            pageSize:page.pageSize
          }
        })
      },
      onOk: data => {
        if(modalType === 'create'){
          dispatch({
            type: `systemDistribut/addHeartbeatWarnList`,
            payload: {
              name: data.name,
              noticeDirection: [data.noticeDirection].toString(),
              parentIds: [data.parentIds].toString(),
              type: data.type,
            },
          }).then(() => {
            this.handleRefresh('',4)
          })
        }else{
          dispatch({
            type: `systemDistribut/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh('',2)
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'systemDistribut/hideModal',
        })
      },
    }
  }

  get nativeProps() {
    const { dispatch, systemDistribut, loading } = this.props
    const { list, pagination, selectedRowKeys } = systemDistribut
    return {
      dataSource: list,
      loading: loading.effects['systemDistribut/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        },3)
      },
      onChecked(id,status){
        dispatch({
          type: 'systemDistribut/updateStrategy',
          payload: {
            id:id,
            status:status=="1"?'0':'1',
          },
        })
      },
      onDeleteItem: userId => {
        dispatch({
          type: 'systemDistribut/delete',
          payload: userId,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          },3)
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'systemDistribut/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onDetail(item) {
        dispatch({
          type: 'systemDistribut/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
        dispatch({
          type: 'systemDistribut/detailEventList',
          payload:{
            source: item.host,
            current:1,
            pageSize:10
          }
        })
        dispatch({
          type: 'systemDistribut/detailPictureList',
          payload:{
            source: item.host,
          }
        })
      },
      // rowSelection: {
      //   selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'systemDistribut/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  get probeProps() {
    const { dispatch, systemDistribut, loading } = this.props
    const { list, pagination, selectedRowKeys } = systemDistribut
    return {
      onFilterChange(item) {
      
      }
    }

  }

  get warningProps() {
    const { dispatch, systemDistribut, loading } = this.props
    const { warnSelectedRowKeys } = systemDistribut
    const { list = [], pagination } = systemDistribut.warnEvent
    return {
      dataSource: list,
      loading: loading.effects['systemDistribut/heartbeatWarnList'],
      pagination,
      warnSelectedRowKeys:warnSelectedRowKeys,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        },'4')
      },
      onAdd(){
        dispatch({
          type: 'systemDistribut/showModal',
          payload: {
            modalType: 'create',
          },
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'systemDistribut/removeHeartbeatWarnList',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          },'4')
        })
      },
      onbatchDeleteItem: ids => {
        dispatch({
          type: 'systemDistribut/batchRemoveHeartbeatWarnList',
          payload: [ids].toString(),
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          },'4')
        })
      },
      rowSelection: {
        warnSelectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'systemDistribut/updateState',
            payload: {
              warnSelectedRowKeys: keys,
            },
          })
        },
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

    return (
      <Page inner>
        <Tabs activeKey={activeKey} onChange={this.onTabChange}>
          {tabs.map((v) => <TabPane tab={v.label} key={v.value} />)}
        </Tabs>
        {activeKey === '1' ? <Probe {...this.probeProps} /> : null}
        {activeKey === '2' ? <div>
          {/* <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
            <Button type="danger" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}><Icon type="delete" />批量删除</Button>
            <Button type="primary" size="small" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
          </div> */}
          <Native {...this.nativeProps} />
        </div>:null}
        {activeKey === '3' ? <Distribution  {...this.nativeProps}/>:null }
        {activeKey === '4' ? <Warning  {...this.warningProps}/>:null }
        <Modals {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  systemDistribut: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
