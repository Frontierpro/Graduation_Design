import Vue from 'vue'
import Vuex from 'vuex'

import tooltip from './modules/tooltip'
import skipbox from './modules/skipbox'
import ajax from './modules/ajax'
import reading from './modules/reading'
import listening from './modules/listening'
import speaking from './modules/speaking'
import writing from './modules/writing'

import { encodeID, upperHead } from '../assets/js/util'

Vue.use(Vuex)

export default new Vuex.Store ({
    modules: {
        tooltip: tooltip,
        skipbox: skipbox,
        ajax: ajax,
        reading: reading,
        listening: listening,
        speaking: speaking,
        writing: writing
    },
    state: () => ({
        route: 0,
        user: '',
        code: '',
        name: '',
        map: ['beginning', 'reading', 'listening', 'speaking', 'writing', 'ending']
    }),
    mutations: {
        setRoute (state, val) {
            state.route = val
        },
        setInfo (state, dist) {
            state.user = dist.user
            state.code = dist.code
        },
        setName (state, val) {
            state.name = val
        }
    },
    actions: {
        init ({state, commit, dispatch}) {
            if (state.name.length === 0)
                commit('tooltip/throwTip', '姓名不能为空', {root: true})
            else if (!/^[\w\s]+$/.test(state.name))
                commit('tooltip/throwTip', '姓名仅支持大小写字母、数字、下划线和空格', {root: true})
            else {
                let exit = localStorage.getItem(`${state.user}_${state.code}_${state.name}`)
                dispatch('ajax/ajaxRequest', {'event': 'app/init', 'post': {
                    'user': state.user, 'code': state.code, 'name': state.name,
                    'exit': exit == null ? 'none' : 'exit'
                }})
            }
        },
        get ({state, dispatch}) {
            dispatch('ajax/ajaxRequest', {'event': 'app/get', 'post': {
                'user': state.user, 'code': state.code, 'name': state.name,
                'db': upperHead(state.map[state.ajax.route])
            }})
        },
        post ({state, commit, dispatch}, title) {
            if (title.length > 0) {
                let route = state.map[state.ajax.route]
                dispatch('ajax/ajaxRequest', {'event': 'api/get', 'post': {
                    'route': route, 'src': 'pc', 'user': state.name,
                    'section': title.split(' ')[1], 'id': encodeID(route, title).toString()
                }})
                localStorage.setItem(`${state.user}_${state.code}_${state.name}`, title)
            }
            else if (state.map[state.ajax.route] === 'ending') {
                localStorage.removeItem(`${state.user}_${state.code}_${state.name}`)
                localStorage.removeItem(`${state.user}_${state.code}_${state.name}_cache`)
                commit('setRoute', 5)
            }
            else {
                commit('ajax/setRoute', state.ajax.route + 1)
                dispatch('get')
            }
        },
        set ({state, dispatch}) {
            let route = state.map[state.route]
            dispatch('ajax/ajaxRequest', {'event': 'app/set', 'post': {
                'user': state.user, 'code': state.code, 'name': state.name, 'db': upperHead(route),
                'title': localStorage.getItem(`${state.user}_${state.code}_${state.name}`),
                'data': JSON.stringify(state[route].answer)
            }})
        }
    }
})
