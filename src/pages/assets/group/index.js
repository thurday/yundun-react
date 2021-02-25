import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Upload, Modal } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Modals from './components/Modal'
const { confirm } = Modal
@withI18n()
@connect(({ assetsGroup, loading }) => ({ assetsGroup, loading }))
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
    const { dispatch, assetsGroup, i18n } = this.props
    const { selectedRowKeys } = assetsGroup

    if (key === '1') {
      dispatch({
        type: 'assetsGroup/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  multiDeleteItems = () => {
    const { dispatch, assetsGroup, i18n } = this.props
    const { list, pagination, selectedRowKeys } = assetsGroup
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'assetsGroup/multiDelete',
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

  get modalProps() {
    const { dispatch, assetsGroup, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType, detailList } = assetsGroup

    return {
      dataSource:detailList,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      modalType:modalType,
      confirmLoading: loading.effects[`assetsGroup/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`添加资产组` :
        modalType === 'update' ? i18n.t`编辑资产组` : i18n.t`查看`
      }`,
      onOk: data => {
        if (modalType === 'detail') {
          dispatch({
            type: 'assetsGroup/hideModal',
          })
          return
        }else if(modalType === 'create'){
          dispatch({
            type: `assetsGroup/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType === 'update'){
          dispatch({
            type: `assetsGroup/${modalType}`,
            payload: {
              id: data.id,
              name: data.assetGroupName
            },
          }).then(() => {
            this.handleRefresh()
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'assetsGroup/hideModal',
        })
      },
      showCancel: modalType !== 'detail',
    }
  }

  get listProps() {
    const { dispatch, assetsGroup, loading } = this.props
    const { list, pagination, selectedRowKeys } = assetsGroup
    return {
      dataSource: list,
      loading: loading.effects['assetsGroup/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          page: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'assetsGroup/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            page:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'assetsGroup/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onViewItem(item) {
        dispatch({
          type: 'assetsGroup/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
        dispatch({
          type: 'assetsGroup/listAssetGroupDetail',
          payload: {
            id: item.id
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'assetsGroup/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
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
        type:'3'
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
          message.error(`${info.file.name} 导入失败,${info.file.response.msg}`).then(() => {
            
          });
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} 导入失败,${info.file.response.msg}`);
        }
      },
    }

    return (
      <Page inner>
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          <Button type="danger" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}><Icon type="delete" />批量删除</Button>
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
          <Upload style={{display:'inline-block'}} {...uploadProps}>
            <Button type="primary" size="small" className="margin-right"><Icon type="vertical-align-bottom" />导入</Button>
          </Upload>
        </div>
        <List {...this.listProps} />
        <Modals {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  assetsGroup: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
