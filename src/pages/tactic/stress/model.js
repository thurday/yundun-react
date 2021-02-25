import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const {
  batchRemoveRuleSys,
  agreementList,
  addAgreement,
  updateAgreement,
  removeAgreement,

  configFocusInfo,
  configSave,
  configFocusDel,
  eventConfigList,
  eventConfigSave,
  eventConfigUpdate,
  eventConfigRemove,
  eventConfigBatchRemove,
} = api

export default modelExtend(pageModel, {
  namespace: 'stress',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    modalListVisible:false,
    info:"",
    modalList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/tactic/stress', location.pathname)) {
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
      const data = yield call(eventConfigList, payload)
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
      const data = yield call(eventConfigRemove, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.stress)
      if (data.code==0) {
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
      const data = yield call(eventConfigBatchRemove, { 'ids[]': payload })
      if (data.code==0) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(eventConfigSave, payload)
      if (data.code==0) {
        message.success('添加成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *configFocusDel({ payload }, { call, put }) {
      const data = yield call(configFocusDel, payload)
      if (data.code==0) {
        message.success(data.msg)
        yield put({ type: 'query' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(eventConfigUpdate, payload)
      if (data.code==0) {
        message.success(data.msg)
        yield put({ type: 'hideModal' })
      } else {
        message.success(data.msg)
        throw data
      }
    },
  },

  reducers: {
    sysInfo(state,{ payload }){
      return { ...state, ...payload }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
