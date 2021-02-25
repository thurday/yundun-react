import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'

const {
  removeUserList,
  assetConfigList,
  assetConfigSave,
  assetConfigRemove,
  assetConfigUpdate
} = api

export default modelExtend(pageModel, {
  namespace: 'assetsNetset',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    query:{
      list: [],
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/assets/netset', location.pathname)) {
          const payload = location.query.pageSize?location.query:  { current: 1, pageSize: 10, name:'' }
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
      const data = yield call(assetConfigList, payload)
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

    *delete({ payload }, { call, put, select }) {
      const data = yield call(assetConfigRemove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.assetsNetset)
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
      const data = yield call(assetConfigSave, payload)
      if (data.code==0) {
        message.success('添加成功');
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(assetConfigUpdate, payload)
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
