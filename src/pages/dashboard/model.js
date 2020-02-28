import modelExtend from "dva-model-extend"
import { model } from 'utils/model'
import { pathMatchRegexp } from 'utils'
import api from 'api'

const { queryDashboard, queryWeather } = api

export default modelExtend(model, {
    namespace: 'dashboard',
    state: {
        sales: [],
        cpu: {},
        browser: [],
        user: {
            avatar: 'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
        },
        completed: [],
        comments: [],
        recentSales: [],
        quote: {
            avatar:
                'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
        },
        numbers: [],
        weather: {
            city: '成都',
            temperature: '27',
            name: '晴',
            icon: '//s5.sencdn.com/web/icons/3d_50/2.png',
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathMatchRegexp(['/dashboard', '/'], pathname)) {
                    dispatch({ type: 'query' })
                    dispatch({ type: 'queryWeather' })
                }
            })
        }
    },
    effects: {
        *query({ payload }, { call, put }) {
            const data = yield call(queryDashboard, payload)
            yield put({ type: 'updateState', payload: data })
        },
        *queryWeather({ payload = {} }, { call, put }) {
            payload.location = 'chengdu'
            const data = yield call(queryWeather, payload)
            const { success } = data
            if (success) {
                const result = data.results[0]
                const weather = {
                    city: result.location.name,
                    temperature: result.now.temperature,
                    name: result.now.text,
                    icon: `//s5.sencdn.com/web/icons/3d_50/${result.now.code}.png`,
                }
                yield put({ type: 'updateState', payload: { weather } })
            }
        }

    }
})