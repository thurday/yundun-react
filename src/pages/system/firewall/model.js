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
  pingAgreement
} = api

export default modelExtend(pageModel, {
  namespace: 'firewall',

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
        if (pathMatchRegexp('/system/firewall', location.pathname)) {
          // const payload = location.query || { current: 1, pageSize: 10 }
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
      const data = yield call(agreementList, payload)
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
      const data = yield call(removeAgreement, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.firewall)
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
      const data = yield call(batchRemoveRuleSys, { 'ids[]': payload })
      if (data.code==0) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(addAgreement, payload)
      if (data.code==0) {
        message.success('添加成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      // const id = yield select(({ user }) => user.currentItem.id)
      // const newUser = { ...payload, id }
      const data = yield call(updateAgreement, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *ping({ payload }, { call, put }) {
      const data = yield call(pingAgreement, payload)
      if (data.code==0) {
        message.success(data.msg)
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
