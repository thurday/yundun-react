import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const {
  batchRemoveRuleSys,
  eventTypeList,
  systemRuleList,
  addSystemRuleList,
  updateSystemRuleList,
  removeSystemRuleList,
  ruleSysCopy,
  ruleSysChangeStatus
} = api

export default modelExtend(pageModel, {
  namespace: 'tacticSystem',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    modalListVisible:false,
    list:[],
    modalList:[],
    listAsset:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/tactic/system', location.pathname)) {
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
      const data = yield call(systemRuleList, payload)
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
      const data = yield call(removeSystemRuleList, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.tacticSystem)
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
      const data = yield call(addSystemRuleList, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateSystemRuleList, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },

    *updateStrategy({ payload }, { call, put }) {
      const data = yield call(ruleSysChangeStatus, payload)
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *eventTypeList({ payload }, { call, put}){
      const data = yield call(eventTypeList, payload)
      if(data.success){
        yield put({
          type: 'showModal',
          payload: {
            listAsset: data.data,
          },
        })
      }
    },

    *ruleSysCopy({ payload }, { call, put}){
      const data = yield call(ruleSysCopy, payload)
      if (data.code==0) {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
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

    showModalList(state, { payload }) {
      return { ...state, ...payload, modalListVisible: true }
    },

    hideModalList(state) {
      return { ...state, modalListVisible: false }
    },
  },
})
