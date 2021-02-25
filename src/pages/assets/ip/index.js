import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Card, Row, Col, Upload} from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Modal from './components/Modal'
// import { apiPrefix } from 'utils/config'
import store from 'store'
import Filter from './components/Filter'


@withI18n()
@connect(({ assetsIp, loading }) => ({ assetsIp, loading }))
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
    const { dispatch, assetsIp, i18n } = this.props
    const { selectedRowKeys } = assetsIp
    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }
    if (key === '1') {
      dispatch({
        type: 'assetsIp/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }else if(key === '3'){
      window.location.href = window.ip+'/exportAsset';
    }else if(key === "4"){
      dispatch({
        type: 'assetsIp/getAssetStatus',
        payload: {
          username:store.get('user').username
        }
      })
      dispatch({
        type: 'assetsIp/showModal',
        payload: {
          modalType: 'asset',
        },
      })
    }

  }

  get modalProps() {
    const { dispatch, assetsIp, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType, listAsset,host } = assetsIp
    return {
      modalType:modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`assetsIp/${modalType}`],
      loading:loading,
      title: `${
        modalType === 'create' ? i18n.t`添加资产` :
        modalType === 'update' ? i18n.t`编辑资产` : 
        modalType === 'asset' ? i18n.t`资产发现` : i18n.t`资产详情`
      }`,
      listAsset:listAsset,
      host:host,
      onOk: data => {
        if (modalType === 'detail') {
          dispatch({
            type: 'assetsIp/hideModal',
          })
          return
        }
        if(modalType == 'update'){
          dispatch({
            type: `assetsIp/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType == 'create'){
          dispatch({
            type: `assetsIp/${modalType}`,
            payload: data
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType == 'asset'){
          dispatch({
            type: 'assetsIp/disAsset',
            payload:{
              username:store.get('user').username,
              host:data.host
            }
          })
        }
        
        // dispatch({
        //   type: 'assetsIp/update',
        //   payload: {
        //     id:data.id,
        //     assetgroupId:data.assetgroupId,
        //     company:data.company,
        //   },
        // }).then(() => {
        //   this.handleRefresh()
        // })
      },
      onCancel() {
        dispatch({
          type: 'assetsIp/hideModal',
        })
      },
      onConfirm(data){
        dispatch({
          type: 'assetsIp/endAssetDiscover',
          payload:data
        })
      },
      showCancel: modalType !== 'detail',
    }
  }

  get listProps() {
    const { dispatch, assetsIp, loading } = this.props
    const { list=[], pagination, selectedRowKeys } = assetsIp.query
    return {
      dataSource: list,
      loading: loading.effects['assetsIp/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
          type:1
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'assetsIp/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
            pageSize: pagination.pageSize,
            type:1
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'assetsIp/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onViewItem(item) {
        dispatch({
          type: 'assetsIp/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
      onStartHoleScan(item){
        
        dispatch({
          type: 'assetsIp/startHoleScan',
          payload: {
            username:store.get('user').username,
            host:item.ip
          },
        })
      }
      // rowSelection: {
      //   // selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'assetsIp/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  
  get filterProps() {
    const { location, dispatch, listAsset } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      listAsset:listAsset,
      onFilterChange: value => {
        // dispatch({
        //   type: 'assetsIp/query',
        //   payload: {
        //     ...value
        //   }
        // })
        this.handleRefresh({
          ...value,
          type:1
        })
      },
    }
  }

  render() {
    const uploadProps = {
      name: 'file',
      action: window.ip+'/assetConfig/excelInsert',
      headers: {
        authorization: 'authorization-text',
      },
      data:{
        type:'2'
      },
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
        <Filter {...this.filterProps} />
        <div style={{ marginBottom: 10, padding: 4 }}>
          {/* <Button type="danger" size="small" className="margin-right" onClick={() => this.handleItems('0')}><Icon type="delete" />批量删除</Button> */}
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
          {/* <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-bottom" />导入</Button> */}
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('4')}>资产发现</Button>
          {/* <Button type="primary" size="small" className="margin-right"><Icon type="plus-circle" /></Button> */}
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('3')}><Icon type="vertical-align-top" />导出</Button>
          <Upload style={{display:'inline-block'}} {...uploadProps}>
            <Button type="primary" size="small" className="margin-right"><Icon type="vertical-align-bottom" />导入</Button>
          </Upload>
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  assetsIp: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
