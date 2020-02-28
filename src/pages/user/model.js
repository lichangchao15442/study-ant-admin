import { pageModel } from 'utils/model'
import modelExtend from 'dva-model-extend'
import { pathMatchRegexp } from 'utils'
import api from 'api'

const { queryUsersList } = api

export default modelExtend(pageModel, {
    namespace: 'user',

    state: {

    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (pathMatchRegexp('/user', location.pathname)) {
                    const payload = location.query || { page: 1, pageSize: 10 }
                    dispatch({
                        type: 'query',
                        payload
                    })
                }
            })
        }
    },

    effects: {
        *query({ payload = {} }, { call, put }) {
            yield call(queryUsersList, payload)
        }
    },

    reducers: {

    }
})