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
  pageBlockingUp,
  deleteBlockingUp,
  addBlockingUp
} = api

export default modelExtend(pageModel, {
  namespace: 'protectIp',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/protect/ip', location.pathname)) {
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
      const data = yield call(pageBlockingUp, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data.rows,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(deleteBlockingUp, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.protectIp)
      if (data.code==0) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
        message.success('删除成功');
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(removeUserList, payload)
      if (data.code==0) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        message.success('删除成功');
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(addBlockingUp, payload)
      if (data.code==0) {
        yield put({ type: 'hideModal' })
        message.success('添加成功');
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const id = yield select(({ user }) => user.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(updateUser, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
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
