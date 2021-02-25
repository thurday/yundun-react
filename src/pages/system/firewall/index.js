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
@connect(({ firewall, loading }) => ({ firewall, loading }))
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
    const { dispatch, firewall, i18n } = this.props
    const { selectedRowKeys } = firewall

    if (key === '1') {
      dispatch({
        type: 'firewall/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }else if(key === '2'){
      window.location.href = window.ip+'/firewall/export';
    }
  }

  multiDeleteItems = () => {
    const { dispatch, firewall, i18n } = this.props
    const { list, pagination, selectedRowKeys } = firewall
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'firewall/multiDelete',
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
    const { dispatch, firewall, loading } = this.props
    const { list, pagination, selectedRowKeys } = firewall
    return {
      dataSource: list,
      loading: loading.effects['firewall/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'firewall/delete',
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
          type: 'firewall/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onRuleList(id){
        dispatch({
          type: 'firewall/getSysRule',
          payload: {
            id:id
          },
        }).then(()=>{
          dispatch({
            type: 'firewall/showModalList',
            payload: {
              modalType: 'getSysRule',
            },
          })
        })
      },
      onChecked(id,status){
        dispatch({
          type: 'firewall/updateStrategy',
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
      //       type: 'firewall/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  get modalProps() {
    const { dispatch, firewall, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = firewall

    return {
      modalType:modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`firewall/${modalType}`],
      loading:loading,
      title: `${
        modalType === 'create' ? i18n.t`防火墙新增` : i18n.t`防火墙编辑` 
      }`,
      onOk: data => {
        dispatch({
          type: `firewall/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onPing(data){
        dispatch({
          type: 'firewall/ping',
          payload: data
        })
      },
      onCancel() {
        dispatch({
          type: 'firewall/hideModal',
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
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-bottom" />下载黑名单</Button>
          {/* <Button type="primary" size="small" onClick={() => this.handleItems('3')}><Icon type="vertical-align-top" />导出</Button> */}
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  firewall: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
