import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import moment from 'moment'
const {
  reportList,
  saveReportList,
  updateReportList,
  removeReportList,
  eventWordRecode,
  eventTypeList
} = api

export default modelExtend(pageModel, {
  namespace: 'report',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    listAsset:[],
    defaultSelectDate : {
      startDate: moment().startOf('day').subtract(6, 'days'),
      endDate: moment().endOf('day')
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/report', location.pathname)) {
          const payload = location.query.pageSize?location.query:  { current: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({
            type: 'eventTypeList',
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(reportList, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rows,
            pagination: {
              current: Number(payload.current) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeReportList, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.report)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(saveReportList, payload)
      if (data.code==0) {
        message.success('添加成功');
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateReportList, payload)
      if (data.code==0) {
        message.success('修改成功');
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *eventWordRecode({ payload }, { select, call, put }) {
      const data = yield call(eventWordRecode, payload)
      if (data.success) {
        yield put({ type: 'updateState'})
      } else {
        throw data
      }
    },

    *eventTypeList({ payload }, { call, put}){
      const data = yield call(eventTypeList, payload)
      if(data.code==0){
        yield put({
          type: 'updateState',
          payload: {
            listAsset: data.data,
          },
        })
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
