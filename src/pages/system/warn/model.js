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
  getEmailConfig,
  setEmailConfig,
  warnList,
  addWarnList,
  updateWarnList,
  removeWarnList,
  eventTypeList,
  getSyslog,
  updateSyslog
} = api

export default modelExtend(pageModel, {
  namespace: 'systemWarn',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    listAsset:[],
    log:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/system/warn', location.pathname)) {
          const payload = location.query.pageSize?location.query:{ current: 1, pageSize: 10 }
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
      const data = yield call(warnList, payload)
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
      const data = yield call(removeWarnList, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.systemWarn)
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
      const data = yield call(addWarnList, payload)
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
      const data = yield call(updateWarnList, payload)
      if (data.code==0) {
        message.success('修改成功')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *getEmailConfig({ payload }, { call, put }) {
      const data = yield call(getEmailConfig, payload)
      if (data.code==0) {
        yield put({ 
          type: 'showModal',
          payload:{
            currentItem:data.data
          }
        })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *setEmailConfig({ payload }, { call, put }) {
      const data = yield call(setEmailConfig, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *eventTypeList({ payload }, { call, put}){
      const data = yield call(eventTypeList, payload)
      if(data.code==0){
        yield put({
          type: 'showModal',
          payload: {
            listAsset: data.data,
          },
        })
      }
    },

    *getSyslog({ payload }, { call, put}){
      const data = yield call(getSyslog, payload)
      if(data.code==0){
        yield put({
          type: 'sysLog',
          payload: {
            log:data.data
          }
        })
      }
    },

    *updateSyslog({ payload }, { call, put }) {
      const data = yield call(updateSyslog, payload)
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
    sysLog(state,{payload}){
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
