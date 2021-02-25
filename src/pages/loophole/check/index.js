import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Modal from './components/Modal'
import store from 'store'
@withI18n()
@connect(({ loopholeCheck, loading }) => ({ loopholeCheck, loading }))
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
    const { dispatch, loopholeCheck, i18n } = this.props
    const { selectedRowKeys } = loopholeCheck

    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }

    if (key === '1') {
      dispatch({
        type: 'loopholeCheck/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  get modalProps() {
    const { dispatch, loopholeCheck, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = loopholeCheck

    return {
      modalType: modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`loopholeCheck/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`添加任务` : i18n.t`编辑站点`
      }`,
      onOk: data => {
        var str = /(\d{1,3}\.){3}\d{1,3}((\/\d{1,3})|(\-(\d{1,3}\.){3}\d{1,3}))/;
        var str2 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
        if(data.host.match(str) || data.host.match(str2)){
          if(modalType === 'create'){
            dispatch({
              type: `loopholeCheck/create`,
              payload: {
                username:store.get('user').username,
                host:data.host
              },
            }).then(() => {
              this.handleRefresh()
            })
          }else if(modalType === 'update'){
            dispatch({
              type: `loopholeCheck/update`,
              payload: {
                id:data.id,
                host:data.host
              },
            }).then(() => {
              this.handleRefresh()
            })
          }
        }else{
          message.error('格式错误');
        }
      },
      onCancel() {
        dispatch({
          type: 'loopholeCheck/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, loopholeCheck, loading } = this.props
    const { list, pagination, selectedRowKeys } = loopholeCheck
    return {
      dataSource: list,
      loading: loading.effects['loopholeCheck/query'],
      globalLoading:loading.global,
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'loopholeCheck/delete',
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
          type: 'loopholeCheck/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onExport(id) {
        window.location.href = window.ip+'/exportHoleReport?id='+id+'';
      },
      onInterrupt(id) {
        dispatch({
          type: 'loopholeCheck/holeScanBreak',
          payload: {
            id: id
          },
        })
      },
      onStart(id){
        dispatch({
          type: 'loopholeCheck/holeScanContinue',
          payload: {
            id: id
          },
        })
      },
      onStop(id){
        dispatch({
          type: 'loopholeCheck/holeScanPause',
          payload: {
            id: id
          },
        })
      },
      onScanAgain(id){
        dispatch({
          type: 'loopholeCheck/reStartHoleScan',
          payload: {
            id: id
          },
        })
      }
      // rowSelection: {
      //   selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'loopholeCheck/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  render() {
    return (
      <Page inner>
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          {/* <Button type="danger" size="small" className="margin-right" onClick={() => this.handleItems('0')}><Icon type="delete" />批量删除</Button> */}
          <Button type="primary" size="small" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
        </div>
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  loopholeCheck: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
