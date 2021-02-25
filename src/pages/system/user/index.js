import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Tabs } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Modal from './components/Modal'
import md5 from 'md5'
const { TabPane } = Tabs
const TABS_DATA = [{
  label: '用户管理',
  value: '1',
}]

@withI18n()
@connect(({ systemUser, loading }) => ({ systemUser, loading }))
class Index extends PureComponent {
  state = {
    tabs: TABS_DATA,
    activeKey: '1',
  }

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
    const { dispatch, systemUser, i18n } = this.props
    const { selectedRowKeys } = systemUser
    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }
    if (key === '1') {
      dispatch({
        type:'systemUser/roles',
      })
      dispatch({
        type: 'systemUser/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  get modalProps() {
    const { dispatch, systemUser, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = systemUser

    return {
      modalType: modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`systemUser/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`添加用户` : 
        modalType === 'detail' ? i18n.t`查看用户` :
        modalType === 'changePwd' ? i18n.t`修改密码` : i18n.t`编辑用户`
      }`,
      systemUser,
      dispatch,
      onOk: data => {
        console.log(data);
        if(modalType === 'detail'){
          dispatch({
            type: 'systemUser/hideModal',
          })
        }else if(modalType === 'create'){
          data.password = md5(data.password)
          delete data.newPassword
          dispatch({
            type: `systemUser/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType === 'update'){
          dispatch({
            type: `systemUser/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else if(modalType === 'changePwd'){
          dispatch({
            type: 'systemUser/resetUserPwd',
            payload: {
              password:md5(data.password),
              userId:data.userId,
              username:currentItem.username,
            },
          }).then(() => {
            this.handleRefresh()
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'systemUser/hideModal',
        })
      },
    }
  }

  get listProps() {
    const { dispatch, systemUser, loading } = this.props
    const { list, pagination, selectedRowKeys } = systemUser

    return {
      dataSource: list,
      loading: loading.effects['systemUser/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: userId => {
        dispatch({
          type: 'systemUser/delete',
          payload: userId,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem: item => {
        dispatch({
          type:'systemUser/roles',
        }).then(() =>{
          dispatch({
            type: 'systemUser/showModal',
            payload: {
              modalType: 'update',
              currentItem: item,
            },
          })
        })
      },
      onChecked(userId,status,roleId){
        dispatch({
          type: 'systemUser/update',
          payload: {
            userId:userId,
            roleId:roleId,
            status:status=="1"?0:1,
          },
        }).then(() => {
          dispatch({
            type: 'systemUser/query',
          })
        })
      },
      onViewItem: item => {
        dispatch({
          type: 'systemUser/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
      onChangePwd: item => {
        dispatch({
          type: 'systemUser/showModal',
          payload: {
            modalType: 'changePwd',
            currentItem: item,
          },
        })
      }
      // rowSelection: {
      //   selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'systemUser/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  onTabChange = (activeKey) => {
    this.setState({ activeKey })
  }

  render() {
    const { activeKey, tabs } = this.state
    
    return (
      <Page inner>
        <Tabs activeKey={activeKey} onChange={this.onTabChange}>
          {tabs.map((v) => <TabPane tab={v.label} key={v.value} />)}
        </Tabs>
        {activeKey === '1' ? <div>
          <div style={{ marginBottom: 20, padding: 4, borderBottom: '1px solid #e6e6e6' }}>
            {/* <Button type="danger" size="small" className="margin-right" onClick={() => this.handleItems('0')}><Icon type="delete" />批量删除</Button> */}
            <Button type="primary" size="small" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />添加</Button>
          </div>
          <List {...this.listProps} />
          <Modal {...this.modalProps} />
        </div> : null}
      </Page>
    )
  }
}

Index.propTypes = {
  systemUser: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
