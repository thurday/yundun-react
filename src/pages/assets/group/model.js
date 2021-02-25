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
  getAssetGroup,
  createAssetGroup,
  updateAssetGroup,
  removeAssetGroup,
  batchRemoveAssetGroup,
  listAssetGroupDetail
} = api

export default modelExtend(pageModel, {
  namespace: 'assetsGroup',

  state: {
    list:[],
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    detailList:[],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (pathMatchRegexp('/assets/group', location.pathname)) {
          const payload = location.query || { page: 1, pageSize: 10 }
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
      const data = yield call(getAssetGroup, payload)
      if (data) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            // pagination: {
            //   current: Number(payload.current) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.total,
            // },
          },
        })
      }
    },

    *listAssetGroupDetail({ payload = {} }, { call, put }) {
      const data = yield call(listAssetGroupDetail, payload)
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            detailList: data.data,
          },
        })
      }
    },

    *delete({ payload }, { call, put, select }) {
      const data = yield call(removeAssetGroup, { id: payload })
      const { selectedRowKeys } = yield select(_ => _.assetsGroup)
      if (data.code == 0) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload),
          },
        })
        message.success('删除成功');
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *multiDelete({ payload }, { call, put }) {
      const data = yield call(batchRemoveAssetGroup, { 'ids[]': payload })
      if (data.code == 0) {
        message.success('删除成功！')
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
      } else {
        message.error(data.msg)
        throw data
      }
    },

    *create({ payload }, { call, put }) {
      const data = yield call(createAssetGroup, payload)
      if (data.code == 0) {
        message.success('添加成功');
        yield put({ type: 'hideModal' })
      } else {
        message.error(data.msg);
        throw data
      }
    },

    *update({ payload }, { select, call, put }) {
      const data = yield call(updateAssetGroup, payload)
      if (data.code == 0) {
        message.success('修改成功');
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
