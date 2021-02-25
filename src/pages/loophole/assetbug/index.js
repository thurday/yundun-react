import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { message, Icon, Card, Row, Col} from 'antd'
import { withI18n } from '@lingui/react'
import { Page, Button } from 'components'
import { stringify } from 'qs'
import List from './components/List'
// import { apiPrefix } from 'utils/config'
import store from 'store'
import Filter from './components/Filter'
import NumberCard from './components/NumberCard'

// 映射 Map
const numberCardsMap = {
  'low': {
    title: '低危漏洞',
    color: '#1ab394',
    icon: '/icons/success.svg',
  },
  'middle': {
    title: '中危漏洞',
    color: '#f5be5b',
    icon: '/icons/warning.svg',
  },
  'high': {
    title: '高危漏洞',
    color: '#ed5565',
    icon: '/icons/error.svg',
  },
}
/**
 * 数组求和
 */
function sum(arr = []) {
  return arr.reduce((acc, name) => (acc + parseInt(name.num)), 0)
}
@withI18n()
@connect(({ assetBug, loading }) => ({ assetBug, loading }))
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
    const { dispatch, assetBug, i18n } = this.props
    const { selectedRowKeys } = assetBug
    if (key === '0' && !selectedRowKeys.length) {
      message.warn('请选择数据')
      return
    }
    if (key === '1') {
      dispatch({
        type: 'assetBug/showModal',
        payload: {
          modalType: 'create',
        },
      })
    }

  }

  get listProps() {
    const { dispatch, assetBug, loading } = this.props
    const { list=[], pagination, selectedRowKeys } = assetBug.query
    return {
      dataSource: list,
      loading: loading.effects['assetBug/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'assetBug/delete',
          payload: id,
        }).then(() => {
          this.handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
            pageSize: pagination.pageSize,
          })
        })
      },
      onEditItem(item) {
        dispatch({
          type: 'assetBug/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onViewItem(item) {
        dispatch({
          type: 'assetBug/showModal',
          payload: {
            modalType: 'detail',
            currentItem: item,
          },
        })
      },
      // rowSelection: {
      //   // selectedRowKeys,
      //   onChange: keys => {
      //     dispatch({
      //       type: 'assetBug/updateState',
      //       payload: {
      //         selectedRowKeys: keys,
      //       },
      //     })
      //   },
      // },
    }
  }

  
  get filterProps() {
    const { location, dispatch, listAsset } = this.props
    const { query } = location

    return {
      filter: {
        ...query,
      },
      listAsset:listAsset,
      onFilterChange: value => {
        this.handleRefresh({
          ...value,
        })
      },
    }
  }

  get numberCardsProps() {
    const { dispatch, assetBug, loading } = this.props
    const { bugDoCount } = assetBug
    var list = []
    for (let i in bugDoCount) {
      let o = {};
      o.name = i;
      o.number = bugDoCount[i]
      list.push(o)
    }
    const numbers = list.map((v) => ({ ...numberCardsMap[v.name], number: v.number }))
    return {
      numbers,
    }
  }

  render() {
    const { numbers } = this.numberCardsProps
    const numberCards = numbers.map((item, key) => (
      <Col offset={2} key={key} lg={4} md={12}>
        <NumberCard {...item} />
      </Col>
    ))
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <Row style={{margin:'0 auto 0 10%'}} gutter={24}>{numberCards}</Row>
        <List {...this.listProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  assetBug: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
