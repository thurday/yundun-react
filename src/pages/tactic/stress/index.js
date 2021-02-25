import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Table,Modal } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import Stress from './components/Stress'
import List from './components/List'
import Modals from './components/Modal'
const { confirm } = Modal
// import ModalList from './components/ModalList'
// const { confirm } = Modal

@withI18n()
@connect(({ stress, loading }) => ({ stress, loading }))
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
    const { dispatch, stress, i18n } = this.props
    const { list, pagination, selectedRowKeys } = stress

    if (key === '1') {
      dispatch({
        type: 'stress/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  multiDeleteItems = () => {
    const { dispatch, stress, i18n } = this.props
    const { list, pagination, selectedRowKeys } = stress
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'stress/multiDelete',
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

  get stressProps() {
    const { dispatch,stress,loading,i18n } = this.props
    const { info } = stress
    return {
      loading: loading.effects['stress/query'],
      filter: info,
      onFilterChange: value => {
        let aaa = value.followIp.replace(/\ +/g,",").replace(/[ ]/g,",").replace(/[\r\n]/g,",").replace(/，/ig,',').replace(new RegExp(',+',"gm"),',').replace(/,$/gi,"");
        if(aaa.match(/,/g).length>4){
          message.error('最多添加5个ip');
        }else{
          dispatch({
            type:'stress/configFocusDel',
            payload:{
              type:0,
              followIp:aaa,
            }
          })
        }
      },
      onReset: value => {
        dispatch({
          type:'stress/configFocusDel',
          payload:{
            type:1
          }
        })
      }
    }
  }

  get modalProps() {
    const { dispatch, stress, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = stress

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`stress/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`添加重点关注IP` : i18n.t`修改`
      }`,
      onOk: data => {
        dispatch({
          type: `stress/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'stress/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, stress, loading } = this.props
    const { list, pagination, selectedRowKeys } = stress
    return {
      dataSource: list,
      loading: loading.effects['stress/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'stress/delete',
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
          type: 'stress/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'stress/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }
  }

  render() {
    return (
      <Page inner>
        <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
          <Button type="danger" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}><Icon type="delete" />批量删除</Button>
          <Button type="primary" size="small" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
        </div>
        <List {...this.listProps} />
        <Modals {...this.modalProps} />
        {/* <Stress {...this.stressProps} /> */}
      </Page>
    )
  }
}

Index.propTypes = {
  stress: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
