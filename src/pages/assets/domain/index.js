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
import NumberCard from './components/NumberCard'

// 映射 Map
const numberCardsMap = {
  'total': {
    title: '资产总数总数',
    color: '#1c84c6',
    icon: '/icons/primary.svg',
  },
  'beian': {
    title: '备案资产',
    color: '#1ab394',
    icon: '/icons/success.svg',
  },
  'weifenzu': {
    title: '未分组资产',
    color: '#f5be5b',
    icon: '/icons/warning.svg',
  },
  'weilousao': {
    title: '未漏扫资产',
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
@withI18n()
@connect(({ assetsDiscover, loading }) => ({ assetsDiscover, loading }))
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
    const { dispatch, assetsDiscover, i18n } = this.props
    const { selectedRowKeys } = assetsDiscover
    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }
    if (key === '1') {
      dispatch({
        type: 'assetsDiscover/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }else if(key === '3'){
      window.location.href = window.ip+'/exportAsset';
    }else if(key === "4"){
      dispatch({
        type: 'assetsDiscover/getAssetStatus',
        payload: {
          username:store.get('user').username
        }
      })
      dispatch({
        type: 'assetsDiscover/showModal',
        payload: {
          modalType: 'asset',
        },
      })
    }

  }

  get modalProps() {
    const { dispatch, assetsDiscover, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType, listAsset,host } = assetsDiscover
    return {
      modalType:modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`assetsDiscover/${modalType}`],
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
            type: 'assetsDiscover/hideModal',
          })
          return
        }
        if(modalType == 'update'){
          dispatch({
            type: `assetsDiscover/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType == 'create'){
          dispatch({
            type: `assetsDiscover/${modalType}`,
            payload: data
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType == 'asset'){
          dispatch({
            type: 'assetsDiscover/disAsset',
            payload:{
              username:store.get('user').username,
              host:data.host
            }
          })
        }
        
        // dispatch({
        //   type: 'assetsDiscover/update',
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
          type: 'assetsDiscover/hideModal',
        })
      },
      onConfirm(data){
        dispatch({
          type: 'assetsDiscover/endAssetDiscover',
          payload:data
        })
      },
      showCancel: modalType !== 'detail',
    }
  }

  get listProps() {
    const { dispatch, assetsDiscover, loading } = this.props
    const { list=[], pagination, selectedRowKeys } = assetsDiscover.query
    return {
      dataSource: list,
      loading: loading.effects['assetsDiscover/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
          type:0
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'assetsDiscover/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
            pageSize: pagination.pageSize,
            type:0
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'assetsDiscover/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onViewItem(item) {
        dispatch({
          type: 'assetsDiscover/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
      onStartHoleScan(item){
        
        dispatch({
          type: 'assetsDiscover/startHoleScan',
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
      //       type: 'assetsDiscover/updateState',
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
        //   type: 'assetsDiscover/query',
        //   payload: {
        //     ...value
        //   }
        // })
        this.handleRefresh({
          ...value,
          type:0
        })
      },
    }
  }

  get numberCardsProps() {
    const { dispatch, assetsDiscover, loading } = this.props
    const { totalAsset } = assetsDiscover
    var list = []
    for (let i in totalAsset) {
      let o = {};
      o.name = i;
      o.number = totalAsset[i]
      list.push(o)
    }
    let arr1 = list[1];
    let arr2 = list[2];
    list[1] = arr2;
    list[2] = arr1
    const numbers = list.map((v) => ({ ...numberCardsMap[v.name], number: v.number }))
    return {
      numbers,
    }
  }

  render() {
    const { numbers } = this.numberCardsProps
    const numberCards = numbers.map((item, key) => (
      <Col offset={1} key={key} lg={4} md={12}>
        <NumberCard {...item} />
      </Col>
    ))

    const uploadProps = {
      name: 'file',
      action: window.ip+'/assetConfig/excelInsert',
      headers: {
        authorization: 'authorization-text',
      },
      data:{
        type:'1'
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
        <Row style={{margin:'0 auto 0 10%'}} gutter={24}>{numberCards}</Row>
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
  assetsDiscover: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
