import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'

const {
  pageDiscover,
  delDiscover,
  // queryUserList,
  createUser,
  // removeUser,
  updateUser,
  removeUserList,
  listAssetGroup,
  assetOperation,
  createAsset,
  startAssetDiscover,
  startHoleScan,
  eventTypeList,
  getAssetStatus,
  endAssetDiscover,
} = api

export default modelExtend(pageModel, {
  namespace: 'assetsIp',

  state: {
    typeEvent: {
      list: [],
    },
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    query:{
      list: [],
    },
    listAsset:[],
    editData:{},
    host:''
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/assets/ip', location.pathname)) {
          const payload = location.query.pageSize?location.query:  { current: 1, pageSize: 10, type:1 }
          dispatch({
            type: 'query',
            payload,
          })
          dispatch({ type: 'listAssetGroup' })
        }
      })
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(pageDiscover, payload)
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

    *listAssetGroup({ payload }, { call, put}){
      const data = yield call(listAssetGroup, payload)
      if(data.code==0){
        yield put({
          type: 'querySuccess',
          payload: {
            listAsset: data.data,
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(delDiscover, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.assetsIp)
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
      const data = yield call(removeUserList, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createAsset, payload)
      if (data.code==0) {
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *disAsset({ payload }, { call, put }) {
      const data = yield call(startAssetDiscover, payload)
      if (data.code == 0) {
        message.success(data.msg);
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *startHoleScan({ payload }, { call, put }) {
      const data = yield call(startHoleScan, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    // *edit({ payload }, { call, put }) {
    //   console.log(payload);
    //   const data = yield call(assetOperation, payload)
    //   if (data.code == 0) {
    //     yield put({
    //       type: 'hideModal',
    //       payload: {
    //         ...id
    //       },
    //     })
    //   }
    // },

    *update({ payload }, { select, call, put }) {
      // const id = yield select(({ currentItem }) => currentItem.id)
      // const newUser = { ...payload, id }
      const data = yield call(assetOperation, payload)
      if (data.code==0) {
        message.success(data.msg);
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },
    *getAssetStatus({ payload }, { select, call, put }) {
      const data = yield call(getAssetStatus, payload)
      if (data.code==0) {
        message.info('没有任务执行');
        yield put({ type: 'updateState' })
      } else if(data.code>=500) {
        message.info('有任务执行');
        // yield put({ type: 'updateState', host:data.msg })
        yield put({
          type: 'querySuccess',
          payload: {
            host: data.msg,
          },
        })
      }else{
        throw data
      }
    },
    *endAssetDiscover({ payload }, { call, put }) {
      const data = yield call(endAssetDiscover, payload)
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
