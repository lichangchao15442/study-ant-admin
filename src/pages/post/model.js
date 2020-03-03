import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import api from 'api'

const { queryPostList } = api


export default modelExtend(pageModel, {
    namespace: 'post',

    state: {},

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (pathMatchRegexp('/post', location.pathname)) {
                    dispatch({
                        type: 'query', payload: {
                            status: 2,
                            ...location.query
                        }
                    })
                }
            })
        }
    },

    effects: {
        *query({ payload }, { select, call, put }) {
            const data = yield call(queryPostList, payload)
            if (data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.data,
                        pagination: {
                            current: Number(payload.page) || 1,
                            pageSize: Number(payload.pageSize) || 10,
                            total: data.total
                        }
                    }
                })
            } else {
                throw data
            }
        }
    },

    reducers: {}
})