import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { router } from 'utils'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import { stringify } from 'qs'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@withI18n()
@connect(({ report, loading }) => ({ report, loading }))
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

  get modalProps() {
    const { dispatch, report, loading, i18n } = this.props
    const { currentItem, modalVisible, modalType, defaultSelectDate } = report

    return {
      item: modalType === 'create' ? {} : currentItem,
      visible: modalVisible,
      type: modalType,
      defaultSelectDate: defaultSelectDate,
      confirmLoading: loading.effects[`report/${modalType}`],
      title: `${
        modalType === 'create' ? i18n.t`报告生成` : i18n.t`报告信息`
      }`,
      onOk: data => {
        if(modalType === 'create'){
          data.startTime = report.filterItem.createTime[0];
          data.endTime = report.filterItem.createTime[1];
          data.level = report.filterItem.level.toString();
          // data.desc = report.filterItem.desc.toString();
          delete data.id;
          dispatch({
            type: `report/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }else{
          dispatch({
            type: `report/${modalType}`,
            payload: data,
          }).then(() => {
            this.handleRefresh()
          })
        }
      },
      onCancel() {
        dispatch({
          type: 'report/hideModal',
        })
      },
      width: '66.66666%',
    }
  }

  get listProps() {
    const { dispatch, report, loading } = this.props
    const { list, pagination, selectedRowKeys } = report

    return {
      dataSource: list,
      loading: loading.effects['report/query'],
      pagination,
      onChange: page => {
        this.handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem: id => {
        dispatch({
          type: 'report/delete',
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
          type: 'report/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        })
      },
      onExportItem(id) {
        console.log('onExportItem', id)
        window.location.href = window.ip+'/eventWordRecode/exportWord?id='+id+'';
        // dispatch({
        //   type: 'report/eventWordRecode',
        //   payload: {
        //     id: id
        //   }
        // })
      },
    }
  }

  get filterProps() {
    const { location, dispatch, report } = this.props
    const { currentItem, log, modalVisible, modalType, listAsset, defaultSelectDate } = report
    const { query } = location

    return {
      filter: {
        ...query,
      },
      listAsset:listAsset,
      defaultSelectDate:defaultSelectDate,
      onFilterChange: value => {
        // dispatch({
        //   type: 'report/query',
        //   payload: {
        //     startTime: value.createTime[0],
        //     endTime: value.createTime[1],
        //     level: value.level.toString(),
        //     current: 1, 
        //     pageSize: 10 
        //   },
        // })
      },
      onAdd(action) {
        dispatch({
          type: 'report/showModal',
          payload: {
            modalType: 'create',
            filterItem: action
          },
        })
      },
      onChangeDate(value, dateString){
        dispatch({
          type:'report/updateState',
          payload:{
            defaultSelectDate:{
              startDate:value[0],
              endDate:value[1]
            }
          }
        })
      }
    }
  }

  render() {
    return (
      <Page inner>
        <Filter {...this.filterProps} />
        <List {...this.listProps} />
        <Modal {...this.modalProps} />
      </Page>
    )
  }
}

Index.propTypes = {
  report: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
