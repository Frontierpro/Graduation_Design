import { upperHead } from '../../assets/js/util'

const state = () => ({
    active: false,
    trigger: false,
    focus: false,
    lock: false
})

const getters = {
    disAble: (state, getters, rootState) => {
        return rootState.route === 'listing' ? true : false
    },
    searchText: (state, getters, rootState) => {
        return rootState.route === 'listing' ? '' : rootState[rootState.route].searchText
    }
}

const mutations = {
    mouseOver: (state) => {
        state.active = true
    },
    mouseOut: (state) => {
        state.active = false
    },
    mouseDown: (state) => {
        state.trigger = true
    },
    mouseUp: (state) => {
        state.trigger = false
    },
    getFocus: (state) => {
        state.focus = true
    },
    loseFocus: (state) => {
        state.focus = false
    },
    setLock: (state, val) => {
        state.lock = val
    }
}

const actions = {
    search: ({state, getters, commit, dispatch, rootState}) => {
        commit('mouseUp')
        if (!state.lock) {
            let tokenText = ` ${getters.searchText} `.replace(/\W/g, ' ').replace(/[\s]+/g, ' ')
            let tokenList = tokenText.toLowerCase().slice(1, -1).split(' ')
            if (tokenList.length > 0 && tokenList[0].length > 0) {
                for (let index = 0; index < tokenList.length; index++)
                    tokenList[index] = `${rootState.route}_${tokenList[index]}`
                dispatch('searchRequest', tokenList)
            }
            else {
                dispatch('init')
                dispatch('reset')
            }
        }
    },
    searchRequest ({commit, dispatch, rootState}, tokenList) {
        commit('setLock', true)
        let xhr = new XMLHttpRequest()
        commit('tooltip/loadTrigger', 1, {root: true})
        setTimeout(() => {
            if (rootState.tooltip.loading == 1)
                commit('tooltip/loadTrigger', 2, {root: true})
        }, 300);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                commit('tooltip/loadTrigger', 0, {root: true})
                dispatch('searchResponse', xhr)
            }
        }
        xhr.open('post', 'http://106.12.17.34/api/index', true)
        xhr.send(JSON.stringify(tokenList))
    },
    searchResponse ({commit, dispatch}, xhr) {
        if (xhr.status != 200) {
            let errorInfo = xhr.status == 0 ? '网络异常' : `服务器异常-${xhr.status}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE < 0) {
            let errorInfo = `服务器异常-60${-JSON.parse(xhr.responseText).STATE}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).RES.length === 1 &&
            JSON.parse(xhr.responseText).RES[0].length === 0) {
            commit('tooltip/throwTip', '未查询到结果', {root: true})
        }
        else {
            dispatch('renew', JSON.parse(xhr.responseText).RES)
            dispatch('reset')
        }
        commit('setLock', false)
    },
    init: ({dispatch, rootState}) => {
        dispatch(`${rootState.route}/init${upperHead(rootState.route)}`, {}, {root: true})
    },
    renew: ({commit, rootState}, resList) => {
        let tmpList = []
        let index = 0
        for (let res of resList) {
            let tmp = {'id': ++index, 'title': res.replaceAll('_', ' '), 'status': 0}
            tmpList.push(tmp)
        }
        commit(`${rootState.route}/setList`, tmpList, {root: true})
    },
    reset: ({commit, rootState}) => {
        commit(`${rootState.route}/focusChange`, 0, {root: true})
        commit(`${rootState.route}/indexScroll`, 0, {root: true})
    },
    searchInput: ({commit, rootState}, val) => {
        commit(`${rootState.route}/searchInput`, val, {root: true})
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
