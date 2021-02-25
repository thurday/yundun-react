import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'

const {
  typeEvent,
  pageEvent,
  delEvent,
  // queryUserList,
  createUser,
  // removeUser,
  updateUser,
  removeUserList,
  exportEvent,
  createBlockingUp,
  configSave,
  getListDetail,
  relationEvent,
  eventTypeList
} = api

export default modelExtend(pageModel, {
  namespace: 'event',

  state: {
    typeEvent: {
      list: [],
    },
    pageEvent:{
      list: [],
      
    },
    currentItem: {},
    modalVisible: false,
    modalType: 'update',
    selectedRowKeys: [],
    detail:{},
    detailLoding:true,
    detailEvent:{
      list:[]
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/event', location.pathname)) {
          // const payload = location.query || { current: 1, pageSize: 10 }
          // const payload = location.query.pageSize?location.query:{ current: 1, pageSize: 10 }
          // dispatch({
          //   type: 'pageEvent',
          //   payload,
          // })
          dispatch({ type: 'typeEvent' })
          // dispatch({ type: 'delete' })
        }
      })
    },
  },

  effects: {
    *typeEvent({ payload = {} }, { call, put }) {
      const data = yield call(eventTypeList, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'typeEvent',
            list: data.data,
          },
        })
      }
    },
    *pageEvent({ payload = {} }, { call, put }) {
      const data = yield call(pageEvent, payload)
      if (data.code == 0) {
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'pageEvent',
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
      const data = yield call(delEvent, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.event)
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

    *createBlockingUp({ payload }, { call, put }) {
      const data = yield call(createBlockingUp, payload)
      if (data.code == 0) {
        message.success(data.msg);
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createUser, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
      } else {
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

    *exportEvent({ payload = {} }, { call, put }) {
      const data = yield call(exportEvent, payload)
      if (data.code==0) {
        yield put({type: 'querySuccess',})
        message.success('导出成功');
      }else{
        message.error(data.msg);
      }
    },

    *configSave({ payload = {} }, { call, put }) {
      const data = yield call(configSave, payload)
      if (data.code==0) {
        yield put({type: 'hideModal'})
        message.success('操作成功');
      }else{
        message.error(data.msg);
      }
    },

    *getListDetail({ payload }, { call, put }){
      const data = yield call(getListDetail, payload)
      if(data.code==0){
        yield put({
          type:'sysDetail',
          payload:{
            detail:data.data,
            detailLoding:false
          }
        })
      }else{
        yield put({
          type:'sysDetail',
          payload:{
            detailLoding:false
          }
        })
        message.error(data.msg)
        throw data
      }
    },

    *relationEvent({ payload }, { call, put }){
      const data = yield call(relationEvent, payload)
      if(data.code==0){
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'detailEvent',
            list: data.data.rows,
            pagination: {
              current: Number(payload.current) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.data.total,
            },
          },
        })
      }else{
        message.error(data.msg)
        throw data
      }
    },
  },

  reducers: {
    sysDetail(state,{payload}){
      return { ...state, ...payload, }
    },
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal(state) {
      return { ...state, modalVisible: false }
    },
  }, 
})
