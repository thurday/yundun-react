import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const {
  batchRemoveRuleSys,
  responseList,
  addResponseList,
  updateResponseList,
  removeResponseList,
  methodListAll,
} = api

export default modelExtend(pageModel, {
  namespace: 'tacticResponse',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    modalListVisible:false,
    list:[],
    modalList:[],
    listAsset:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/tactic/response', location.pathname)) {
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
      const data = yield call(responseList, payload)
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
      const data = yield call(removeResponseList, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.tacticResponse)
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
      const data = yield call(batchRemoveRuleSys, { 'ids[]': payload })
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(addResponseList, payload)
      if (data.success) {
        message.success('添加成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateResponseList, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *methodListAll({ payload }, { call, put}){
      const data = yield call(methodListAll, payload)
      if(data.success){
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

    showModalList(state, { payload }) {
      return { ...state, ...payload, modalListVisible: true }
    },

    hideModalList(state) {
      return { ...state, modalListVisible: false }
    },
  },
})
