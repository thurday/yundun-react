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
@connect(({ assetsNetset, loading }) => ({ assetsNetset, loading }))
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
    const { dispatch, assetsNetset, i18n } = this.props
    const { selectedRowKeys } = assetsNetset
    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }
    if (key === '1') {
      dispatch({
        type: 'assetsNetset/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }

  }

  get modalProps() {
    const { dispatch, assetsNetset, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType, listAsset,host } = assetsNetset
    return {
      modalType:modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`assetsNetset/${modalType}`],
      loading:loading,
      title: `${
        modalType === 'create' ? i18n.t`添加网段` :
        modalType === 'update' ? i18n.t`编辑网段` : ''
      }`,
      listAsset:listAsset,
      host:host,
      onOk: data => {
        if(modalType == 'update'){
          dispatch({
            type: `assetsNetset/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType == 'create'){
          dispatch({
            type: `assetsNetset/${modalType}`,
            payload: data
          }).then(() => {
            this.handleRefresh()
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'assetsNetset/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, assetsNetset, loading } = this.props
    const { list=[], pagination, selectedRowKeys } = assetsNetset.query
    return {
      dataSource: list,
      loading: loading.effects['assetsNetset/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'assetsNetset/delete',
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
          type: 'assetsNetset/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onViewItem(item) {
        dispatch({
          type: 'assetsNetset/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
      // rowSelection: {
      //   // selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'assetsNetset/updateState',
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
        //   type: 'assetsNetset/query',
        //   payload: {
        //     ...value
        //   }
        // })
        this.handleRefresh({
          ...value,
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
        type:'4'
      },
      showUploadList:false,
      onChange(info) {
        console.log(info);
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
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
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
  assetsNetset: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
