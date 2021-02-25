import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const {
  configPageList,
  removeConfig,
  batchRemoveConfig,
} = api

export default modelExtend(pageModel, {
  namespace: 'exception',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    modalListVisible:false,
    list:[],
    modalList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/tactic/exception', location.pathname)) {
          // const payload = location.query || { current: 1, pageSize: 10 }
          const payload = location.query.pageSize?location.query:  { current: 1, pageSize: 10, type: '1' }
          dispatch({
            type: 'query',
            payload,
          })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(configPageList, payload)
      if (data.code==0) {
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
      const data = yield call(removeConfig, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.exception)
      if (data.code==0) {
        message.success('操作成功');
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(batchRemoveConfig, { 'ids': payload })
      if (data.code==0) {
        message.success('操作成功');
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        message.error(data.msg);
        throw data
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
