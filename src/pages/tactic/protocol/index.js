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
@connect(({ tacticProtocol, loading }) => ({ tacticProtocol, loading }))
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
    const { dispatch, tacticProtocol, i18n } = this.props
    const { selectedRowKeys } = tacticProtocol

    if (key === '1') {
      dispatch({
        type: 'tacticProtocol/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }else if(key === '2'){
      window.location.href = window.ip+'/protocol/exportWord';
    }
  }

  multiDeleteItems = () => {
    const { dispatch, tacticProtocol, i18n } = this.props
    const { list, pagination, selectedRowKeys } = tacticProtocol
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'tacticProtocol/multiDelete',
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
    const { dispatch, tacticProtocol, loading } = this.props
    const { list, pagination, selectedRowKeys } = tacticProtocol
    return {
      dataSource: list,
      loading: loading.effects['tacticProtocol/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'tacticProtocol/delete',
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
          type: 'tacticProtocol/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onRuleList(id){
        dispatch({
          type: 'tacticProtocol/getSysRule',
          payload: {
            id:id
          },
        }).then(()=>{
          dispatch({
            type: 'tacticProtocol/showModalList',
            payload: {
              modalType: 'getSysRule',
            },
          })
        })
      },
      onChecked(id,status){
        dispatch({
          type: 'tacticProtocol/updateStrategy',
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
      //       type: 'tacticProtocol/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  get modalProps() {
    const { dispatch, tacticProtocol, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = tacticProtocol

    return {
      modalType:modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`tacticProtocol/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`新增协议` : i18n.t`编辑协议` 
      }`,
      onOk: data => {
        if(data.matchingType!=null){
          data.matchingType = data.matchingType.join(',')
        }
        dispatch({
          type: `tacticProtocol/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'tacticProtocol/hideModal',
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
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-top" />导出</Button>
          {/* <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-bottom" />导入</Button> */}
          {/* <Button type="primary" size="small" onClick={() => this.handleItems('3')}><Icon type="vertical-align-top" />导出</Button> */}
        </div>
        <List {...this.listProps} />
        {/* <ModalList {...this.modalListProps} /> */}
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  tacticProtocol: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
