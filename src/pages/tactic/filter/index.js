import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Modal, Icon } from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'

const { confirm } = Modal

@withI18n()
@connect(({ filter, loading }) => ({ filter, loading }))
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
    const { dispatch, filter, i18n } = this.props
    const { selectedRowKeys } = filter

    if(key === '2'){
      window.location.href = window.ip+'/event/config/page/list/exportWord?type=0'
    }
  }

  multiDeleteItems = () => {
    const { dispatch, filter, i18n } = this.props
    const { list, pagination, selectedRowKeys } = filter
    var that = this;
    if (!selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }else{
      confirm({
        title: i18n.t`你确定要撤销选中过滤事件吗?`,
        onOk() {
          dispatch({
            type: 'filter/multiDelete',
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
    const { dispatch, filter, loading } = this.props
    const { list, pagination, selectedRowKeys } = filter
    return {
      dataSource: list,
      loading: loading.effects['filter/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'filter/delete',
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
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'filter/updateState',
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
          <Button type="primary" size="small" className="margin-right" onClick={() => this.multiDeleteItems()}>批量撤销</Button>
          {/* <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('1')}>添加过滤</Button> */}
          <Button type="primary" size="small" className="margin-right" onClick={() => this.handleItems('2')}><Icon type="vertical-align-top" />导出</Button>
        </div>
        <List {...this.listProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  filter: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
