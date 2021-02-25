import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const {
  queryUserList,
  createUser,
  getManagerConfig,
  setManagerConfig,
  userList,
  hotstandby,
  setManager,
  hotstandbyRemove
} = api

export default modelExtend(pageModel, {
  namespace: 'systemNetwork',

  state: {
    managerConfig:{},
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    rolesItem:[],
    hotstandbyEvent:{
      list:[]
    },
    list:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/system/network', location.pathname)) {
          const payload = location.query
          dispatch({
            type: 'query',
            payload,
          })
          // dispatch({ type: 'getManagerConfig' })

        }{
        }
      })
    },
  },

  effects: {
    *query({ payload }, { call, put }) {
      const data = yield call(getManagerConfig, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      }
    },

    *hotstandby({ payload }, { call, put }) {
      const data = yield call(hotstandby, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'hotstandbyEvent',
            list: data.data.rows,
          },
        })
      }
    },

    *create({ payload }, { call, put }){
      const data = yield call(setManager, payload)
      if(data.code==0){
        message.success('设置成功');
        yield put({ type: 'hideModal' })
        // return data.data
      }else{
        message.error(data.msg);
        throw data
      }
    },

    *getManagerConfig({ payload }, { call, put }) {
      const data = yield call(getManagerConfig, payload)
      if (data.code == 0) {
        yield put({
          type: 'managerConfig',
          payload: {
            managerConfig:data.data
          },
        })
      }
    },

    *setManagerConfig({ payload }, { call, put }){
      const data = yield call(setManagerConfig, payload)
      if(data.code==0){
        message.success('设置成功');
        yield put({ type: 'hideModal' })
        // return data.data
      }else{
        message.error(data.msg);
        throw data
      }
    },

    *save({ payload }, { call, put }) {
      const data = yield call(setManagerConfig, payload)
      if (data.success) {
        return data.data
      } else {
        throw data
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(hotstandbyRemove, payload )
      const { selectedRowKeys } = yield select(_ => _.systemNetwork)
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

  },

  reducers: {
    managerConfig(state,{payload}){
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
