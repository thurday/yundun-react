import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'

const {
  delDiscover,
  removeUserList,
  assetOperation,
  createAsset,
  pageBugDo,
  bugDoCount
} = api

export default modelExtend(pageModel, {
  namespace: 'assetBug',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    query:{
      list: [],
    },
    editData:{},
    bugDoCount: {
      high:0,
      middle:0,
      low:0,
    },
    host:''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/loophole/assetbug', location.pathname)) {
          const payload = location.query.pageSize?location.query:  { current: 1, pageSize: 10 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({ type: 'bugDoCount' })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(pageBugDo, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'query',
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
    *bugDoCount({ payload = {} }, { call, put }) {
      const data = yield call(bugDoCount, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            bugDoCount: data.data,
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(delDiscover, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.assetBug)
      if (data.code==0) {
        message.success(data.msg);
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
      const data = yield call(removeUserList, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createAsset, payload)
      if (data.code==0) {
        message.success('添加成功');
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      // const id = yield select(({ currentItem }) => currentItem.id)
      // const newUser = { ...payload, id }
      const data = yield call(assetOperation, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'hideModal' })
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
