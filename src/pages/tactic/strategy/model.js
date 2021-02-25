import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const {
  ruleMouldList,
  saveRuleMouldList,
  removeRuleMouldList,
  batchRemoveRuleMouldList,
  updateRuleMouldList,
  strategySystemUpdate,
  strategyTypeList,
  strategyChangeStatus,
  strategySystemList
} = api

export default modelExtend(pageModel, {
  namespace: 'strategy',

  state: {
    list:[],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    systemSelectedRowKeys:[],
    listSelectedRowKeys:[],
    typeList:[],
    systemList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/tactic/strategy', location.pathname)) {
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
      const data = yield call(ruleMouldList, payload)
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

    *strategyTypeList({ payload }, { call, put }) {
      const data = yield call(strategyTypeList, payload)
      if (data.code==0) {
        yield put({
          type: 'updateState',
          payload: {
            typeList: data.data.rows,
            typePagination: {
              current: Number(payload.current) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }
    },

    *strategySystemList({ payload }, { call, put }) {
      const data = yield call(strategySystemList, payload)
      if (data.code==0) {
        yield put({ 
          type: 'updateState',
          payload: {
            systemList: data.data.rows,
            listSelectedRowKeys:data.data.rows.filter(_ => _.status == '1').map(item => item.id),
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
      const data = yield call(removeRuleMouldList, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.strategy)
      if (data.code==0) {
        message.success('删除成功！')
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(batchRemoveRuleMouldList, { 'ids': payload })
      if (data.code==0) {
        message.success('删除成功！')
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(saveRuleMouldList, payload)
      if (data.code==0) {
        message.success('添加成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateRuleMouldList, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *strategyChangeStatus({ payload }, { call, put }) {
      const data = yield call(strategyChangeStatus, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'updateState' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *sysitemUpdate({ payload }, { call, put }) {
      const data = yield call(strategySystemUpdate,  payload )
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'updateState' })
      } else {
        message.error(data.msg)
        throw data
      }
    },
  },

  reducers: {
    // sysType(state,{payload}){
    //   return { ...state, ...payload }
    // },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  },
})
