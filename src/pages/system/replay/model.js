import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'
import { pageModel } from 'utils/model'
import { message } from 'antd'

const {
  getManagerConfig,
  rePlayFn
} = api

export default modelExtend(pageModel, {
  namespace: 'systemReplay',

  state: {
    listAsset:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/system/replay', location.pathname)) {
          dispatch({
            type: 'getManagerConfig',
          })
        }
      })
    },
  },

  effects: {
    *getManagerConfig({ payload = {} }, { call, put }) {
      const data = yield call(getManagerConfig, payload)
      if (data.code==0) {
        yield put({
          type: 'querySuccess',
          payload: {
            listAsset: data.data,
          },
        })
      }
    },

    *rePlayFn({ payload }, { call, put }) {
      const data = yield call(rePlayFn, payload)
      if (data.code==0) {
        message.success(data.msg)
        yield put({ type: 'updateState' })
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
