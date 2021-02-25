import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Table } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Modal from './components/Modal'
// import ModalList from './components/ModalList'
// const { confirm } = Modal

@withI18n()
@connect(({ tacticSystem, loading }) => ({ tacticSystem, loading }))
class Index extends PureComponent {
  handleRefresh = newQuery => {
    const { location } = this.props
    const { query, pathname } = location

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

  handleItems = (key) => {
    const { dispatch, tacticSystem, i18n } = this.props
    const { selectedRowKeys } = tacticSystem

    if (key === '1') {
      dispatch({
        type:'tacticSystem/eventTypeList',
      }).then(
        dispatch({
          type: 'tacticSystem/showModal',
          payload: {
            modalType: 'create',
          },
        })
      )
    }else if(key === '3'){
      window.location.href = window.ip+'/ruleSys/export';
    }
  }

  multiDeleteItems = () => {
    const { dispatch, tacticSystem, i18n } = this.props
    const { list, pagination, selectedRowKeys } = tacticSystem
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'tacticSystem/multiDelete',
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

  get listProps() {
    const { dispatch, tacticSystem, loading } = this.props
    const { list, pagination, selectedRowKeys } = tacticSystem
    return {
      dataSource: list,
      loading: loading.effects['tacticSystem/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'tacticSystem/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'tacticSystem/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onCopyItem: id => {
        dispatch({
          type: 'tacticSystem/ruleSysCopy',
          payload: {
            id: id
          },
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onChecked(id,status){
        dispatch({
          type: 'tacticSystem/updateStrategy',
          payload: {
            id:id,
            status:status=="1"?'0':'1',
          },
        })
      },
      // rowSelection: {
      //   selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'tacticSystem/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  get modalProps() {
    const { dispatch, tacticSystem, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType, listAsset } = tacticSystem

    return {
      modalType:modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`tacticSystem/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`新增事件` : 
        modalType === 'update' ? i18n.t`编辑事件` : 
        modalType === 'details' ? i18n.t`事件详情` : i18n.t`事件详情`
      }`,
      listAsset:listAsset,
      onOk: data => {
        // if(data.warnningType!=null){
        //   data.warnningType = data.warnningType.join(',')
        // }
        // dispatch({
        //   type: `tacticSystem/${modalType}`,
        //   payload: data,
        // }).then(() => {
        //   this.handleRefresh()
        // })
        dispatch({
          type: 'tacticSystem/hideModal',
        })
      },
      onCancel() {
        dispatch({
          type: 'tacticSystem/hideModal',
        })
      },
    }
  }

  get modalListProps() {
    const { dispatch, tacticSystem, loading, i18n } = this.props
    const { modalList, pagination, selectedRowKeys, modalListVisible } = tacticSystem
    return {
      dataSource: modalList,
      loading: loading.effects['tacticSystem/getSysRule'],
      visible:modalListVisible,
      // title:`${
      //   i18n.t`规则列表`
      // }`,
      pagination,
      onCancel() {
        dispatch({
          type: 'tacticSystem/hideModalList',
        })
      },
      onChecked(id,status,strategyId){
        dispatch({
          type: 'tacticSystem/updateSysRule',
          payload: {
            id:id,
            status:status=="1"?'0':'1',
          },
        }).then(()=>{
          dispatch({
            type: 'tacticSystem/getSysRule',
            payload: {
              id:strategyId,
            },
          })
        })
        
      },
    }
  }

  render() {
    return (
      <Page inner>
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          {/* <Button type="danger" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}><Icon type="delete" />批量删除</Button> */}
          {/* <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button> */}
          {/* <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-bottom" />导入</Button> */}
          <Button type="primary" size="small" onClick={() => this.handleItems('3')}><Icon type="vertical-align-top" />导出</Button>
        </div>
        <List {...this.listProps} />
        {/* <ModalList {...this.modalListProps} /> */}
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  tacticSystem: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
