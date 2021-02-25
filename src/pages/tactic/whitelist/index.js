import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Modal } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Modals from './components/Modal'
const { confirm } = Modal

@withI18n()
@connect(({ whiteList, loading }) => ({ whiteList, loading }))
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
    const { dispatch, whiteList, i18n } = this.props
    const { list, pagination, selectedRowKeys } = whiteList

    if (key === '1') {
      dispatch({
        type: 'whiteList/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  multiDeleteItems = () => {
    const { dispatch, whiteList, i18n } = this.props
    const { list, pagination, selectedRowKeys } = whiteList
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`Are you sure delete this records?`,
        onOk() {
          dispatch({
            type: 'whiteList/multiDelete',
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
    const { dispatch, whiteList, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = whiteList

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`whiteList/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`添加规则` : i18n.t`编辑规则`
      }`,
      onOk: data => {
        dispatch({
          type: `whiteList/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'whiteList/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, whiteList, loading } = this.props
    const { list, pagination, selectedRowKeys } = whiteList

    return {
      dataSource: list,
      loading: loading.effects['whiteList/pageRuleCustomer'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'whiteList/delete',
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
          type: 'whiteList/showModal',
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
            type: 'whiteList/updateState',
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
      </Page>
    )
  }
}

Index.propTypes = {
  whiteList: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
