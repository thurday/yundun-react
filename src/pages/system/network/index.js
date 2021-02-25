import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { message, Tabs, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import StandbyList from './components/StandbyList'
import './index.less'

const { TabPane } = Tabs

@withI18n()
@connect(({ systemNetwork, loading }) => ({ systemNetwork, loading }))
class Index extends PureComponent {
  state = {
    activeKey: '1',
  }

  handleRefresh = newQuery => {
    const { systemNetwork, dispatch } = this.props
    const { current: page, pageSize } = systemNetwork.pagination
    const query = { page, pageSize }

    dispatch({
      type: 'systemNetwork/query',
      type: 'systemNetwork/hotstandby',
      // payload: {
      //   ...query,
      //   ...newQuery,
      // }
    })
  }

  handleItems = (key) => {
    const { dispatch, systemNetwork, i18n } = this.props
    const { selectedRowKeys } = systemNetwork

    if(key === '1'){
      dispatch({
        type: 'systemNetwork/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }
  }

  get listProps() {
    const { dispatch, systemNetwork, loading } = this.props
    const { list, pagination } = systemNetwork
 
    return {
      dataSource: list,
      loading: loading.effects['systemNetwork/query'],
      // pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'systemNetwork/showModal',
          payload: {
            modalType: 'setManagerConfig',
            currentItem: item,
          },
        })
      },
    }
  }

  get standbyListProps() {
    const { dispatch, systemNetwork, loading } = this.props
    const { hotstandbyEvent } = systemNetwork
    const { list, pagination } = hotstandbyEvent

    return {
      dataSource: list,
      loading: loading.effects['systemNetwork/hotstandby'],
      // pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'systemNetwork/showModal',
          payload: {
            modalType: 'create',
            currentItem: item,
          },
        })
      },
      onDeleteItem: record => {
        dispatch({
          type: 'systemNetwork/delete',
          payload: {
            id: record.id,
            type: record.type,
          },
        }).then(() => {
          this.handleRefresh();
        })
      },
      onIdentity(item) {
        dispatch({
          type: 'systemNetwork/showModal',
          payload: {
            modalType: 'identity',
            currentItem: item,
          },
        })
      },
    }
  }

  get modalProps() {
    const { dispatch, systemNetwork, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType } = systemNetwork
    return {
      modalType:modalType,
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      confirmLoading: loading.effects[`systemNetwork/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`双机热备` : 
        modalType === 'identity' ? i18n.t`身份设置` : i18n.t`网络配置`
      }`,
      systemNetwork,
      dispatch,
      onOk: data => {
        if(modalType === 'setManagerConfig'){
          message.warning('重启网络会暂停流量监测功能');
        }
        dispatch({
          type: `systemNetwork/${modalType}`,
          payload: data,
        }).then(() => {
          this.handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'systemNetwork/hideModal',
        })
      },
    }
  }

  get filterProps() {
    const { dispatch, systemNetwork, loading } = this.props
    const { managerConfig } = systemNetwork
    return {
      loading: loading.effects['systemNetwork/getManagerConfig'],
      filter: managerConfig,
      onFilterChange: value => {
        dispatch({
          type: 'systemNetwork/setManagerConfig',
          payload: value,
        })
      },
    }
  }

  onTabChange = (activeKey) => {
    const { dispatch, systemNetwork, loading } = this.props
    this.setState({ activeKey }, () => {
      if (activeKey === '2') {
        dispatch({
          type:'systemNetwork/hotstandby'
        })
      }
    })
  }

  render() {
    const { activeKey } = this.state

    return (
      <Page inner>
        <Tabs activeKey={activeKey} onChange={this.onTabChange}>
          <TabPane tab="网口状态" key="1" />
          {/* <TabPane tab="网口状态" key="2" /> */}
          <TabPane tab="双机热备" key="2" />
        </Tabs>
        {/* {activeKey === '1' ? <Filter {...this.filterProps} /> : null} */}
        {activeKey === '1' ? <div>
          <List {...this.listProps} />
        </div> : null}
        {activeKey === '2' ? <div>
          <Button style={{marginBottom: 10}} type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}><Icon type="plus-circle" />主机设置</Button>
          <StandbyList {...this.standbyListProps} />
        </div> : null}
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  systemNetwork: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
