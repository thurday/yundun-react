import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'
const {
  removeUserList,
  distributionList,
  addDistributionList,
  updateDistributionList,
  removeDistributionList,
  distributionChangeStatus,
  batchRemoveDistributionList,
  detailEventList,
  detailPictureList,
  heartbeatWarnList,
  removeHeartbeatWarnList,
  addHeartbeatWarnList,
  batchRemoveHeartbeatWarnList
} = api

export default modelExtend(pageModel, {
  namespace: 'systemDistribut',

  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    warnSelectedRowKeys:[],
    detailEvent:{
      list:[],
      pictureList:[]
    },
    warnEvent:{
      list:[],
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/system/distribut', location.pathname)) {
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
      const data = yield call(distributionList, payload)
      if (data) {
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
      const data = yield call(removeDistributionList, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.systemDistribut)
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
      const data = yield call(batchRemoveDistributionList, { 'ids[]': payload })
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(addDistributionList, payload)
      if (data.code==0) {
        message.success('添加成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateDistributionList, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *updateStrategy({ payload }, { call, put }) {
      const data = yield call(distributionChangeStatus, payload)
      if (data.code==0) {
        message.success('修改成功！')
        yield put({ type: 'query' })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *detailEventList({ payload }, { call, put }){
      const data = yield call(detailEventList, payload)
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

    *detailPictureList({ payload }, { call, put }){
      const data = yield call(detailPictureList, payload)
      if(data.code==0){
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'detailEvent',
            pictureList: data.data,
          },
        })
      }else{
        message.error(data.msg)
        throw data
      }
    },

    *heartbeatWarnList({ payload }, { call, put }){
      const data = yield call(heartbeatWarnList, payload)
      if(data.code==0){
        yield put({
          type: 'querySuccess',
          payload: {
            $$type: 'warnEvent',
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

    *removeHeartbeatWarnList({ payload }, { call, put, select }) {
      const data = yield call(removeHeartbeatWarnList, { id: payload })
      const { warnSelectedRowKeys } = yield select(_ => _.systemDistribut)
      if (data.code == 0) {
        message.success(data.msg)
        yield put({
          type: 'updateState',
          payload: {
            warnSelectedRowKeys: warnSelectedRowKeys.filter(_ => _ !== payload),
          },
        })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *batchRemoveHeartbeatWarnList({ payload }, { call, put }) {
      const data = yield call(batchRemoveHeartbeatWarnList, { 'ids[]': payload })
      if (data.code == 0) {
        message.success(data.msg);
        yield put({ type: 'updateState', payload: { warnSelectedRowKeys: [] } })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *addHeartbeatWarnList({ payload }, { call, put }) {
      const data = yield call(addHeartbeatWarnList, payload)
      if (data.code==0) {
        message.success('添加成功！')
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
  },
})
