import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'

const {
  queryUserList,
  createUser,
  removeUser,
  updateUser,
  removeUserList,
  pageHoleScanTask,
  startHoleScan,
  holeScanBreak,
  holeScanPause,
  holeScanContinue,
  changeHostName,
  reStartHoleScan
} = api

export default modelExtend(pageModel, {
  namespace: 'loopholeCheck',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/loophole/check', location.pathname)) {
          const payload = location.query.pageSize?location.query:  { current: 1, pageSize: 10 }
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
      const data = yield call(pageHoleScanTask, payload)
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
      const data = yield call(removeUser, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.user)
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
      const data = yield call(startHoleScan, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(changeHostName, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *holeScanBreak({ payload }, { call, put }) {
      const data = yield call(holeScanBreak, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'query' })
      } else {
        message.error(data.msg);
        throw data
      }
    },
    
    *holeScanPause({ payload }, { call, put }) {
      const data = yield call(holeScanPause, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'query' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *holeScanContinue({ payload }, { call, put }) {
      const data = yield call(holeScanContinue, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'query' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *reStartHoleScan({ payload }, { call, put }) {
      const data = yield call(reStartHoleScan, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'query' })
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
