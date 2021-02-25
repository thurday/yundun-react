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
@connect(({ tacticResponse, loading }) => ({ tacticResponse, loading }))
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
    const { dispatch, tacticResponse, i18n } = this.props
    const { selectedRowKeys } = tacticResponse

    if (key === '1') {
      dispatch({
        type:'tacticResponse/methodListAll',
      }).then(
        dispatch({
          type: 'tacticResponse/showModal',
          payload: {
            modalType: 'create',
          },
        })
      )
      
    }
  }

  get listProps() {
    const { dispatch, tacticResponse, loading } = this.props
    const { list, pagination, selectedRowKeys } = tacticResponse
    return {
      dataSource: list,
      loading: loading.effects['tacticResponse/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'tacticResponse/delete',
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
          type:'tacticResponse/eventTypeList',
        })
        dispatch({
          type: 'tacticResponse/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onChecked(id,status){
        dispatch({
          type: 'tacticResponse/updateStrategy',
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
      //       type: 'tacticResponse/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  get modalProps() {
    const { dispatch, tacticResponse, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType, listAsset } = tacticResponse

    return {
      modalType:modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`tacticResponse/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`新增规则` : 
        modalType === 'update' ? i18n.t`编辑规则` : 
        modalType === 'details' ? i18n.t`规则详情` : i18n.t`规则详情`
      }`,
      listAsset:listAsset,
      onOk: data => {
        if(data.warn!=null){
          data.warn = data.warn.join(',')
        }
        delete(data['list']);
        dispatch({
          type: `tacticResponse/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'tacticResponse/hideModal',
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          {/* <Button type="danger" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}><Icon type="delete" />批量删除</Button> */}
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
          {/* <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-bottom" />导入</Button> */}
          {/* <Button type="primary" size="small" onClick={() => this.handleItems('3')}><Icon type="vertical-align-top" />导出</Button> */}
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  tacticResponse: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
