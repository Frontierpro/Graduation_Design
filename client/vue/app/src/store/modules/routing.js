import { encodeID } from '../../assets/js/util'

const state = () => ({
    lock: false
})

const getters = {
    indexList: (state, getters, rootState) => {
        return rootState[rootState.route].indexList
    },
    indexFocus: (state, getters, rootState) => {
        return rootState[rootState.route].indexFocus
    },
    indexPos: (state, getters, rootState) => {
        return rootState[rootState.route].indexPos
    },
    contentPos: (state, getters, rootState) => {
        if (rootState.route === 'reading' || rootState.route === 'listening')
            return rootState[rootState.route].selection === 'left' ?
                rootState[rootState.route].textPos : rootState[rootState.route].itemPos
        return rootState[rootState.route].textPos
    },
    position: (state, getters, rootState) => {
        if (rootState.route === 'reading' || rootState.route === 'listening')
            return rootState[rootState.route].selection === 'right' ?
                rootState[rootState.route].position : -1
        return -1
    },
    num: (state, getters, rootState) => {
        if (rootState.route === 'reading' || rootState.route === 'listening')
            return rootState[rootState.route].items.length
        return 1
    }
}

const mutations = {
    setLock (state, val) {
        state.lock = val
    }
}

const actions = {
    sendRequest: ({commit, dispatch, rootState}, index) => {
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
                dispatch('getResponse', xhr)
            }
        }
        xhr.open('post', 'http://106.12.17.34/api/get', true)
        xhr.send(JSON.stringify({
            'route': rootState.route, 'src': 'cc', 'user': rootState.user,
            'section': index.title.split(' ')[1], 'id': encodeID(rootState.route, index.title).toString()
        }))
    },
    getResponse: ({commit, rootState}, xhr) => {
        if (xhr.status != 200) {
            let errorInfo = xhr.status == 0 ? '网络异常' : `服务器异常-${xhr.status}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE < 0) {
            let errorInfo = `服务器异常-60${-JSON.parse(xhr.responseText).STATE}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else
            commit(`${rootState.route}/setData`, JSON.parse(xhr.responseText).DATA, {root: true})
        if (rootState.route === 'listening')
            commit('listening/audioListInit', null, {root: true})
        commit('setLock', false)
    },
    focusChange: ({state, commit, dispatch, rootState}, index) => {
        if (rootState.route === 'listing')
            dispatch('listing/getFocus', index.id, {root: true})
        else if (!state.lock) {
            commit(`${rootState.route}/focusChange`, index.id, {root: true})
            if (rootState.route !== 'reading')
                commit(`${rootState.route}/audioInit`, index.title, {root: true})
            dispatch('sendRequest', index)
        }
    },
    positionChange: ({commit, rootState}, val) => {
        if (rootState.route === 'reading' || rootState.route === 'listening')
            commit(`${rootState.route}/positionChange`, val, {root: true})
    },
    indexScroll: ({commit, rootState}, val) => {
        commit(`${rootState.route}/indexScroll`, val, {root: true})
    },
    contentScroll: ({commit, rootState}, val) => {
        if (rootState.route === 'reading' || rootState.route === 'listening')
            rootState[rootState.route].selection === 'left' ?
            commit(`${rootState.route}/textScroll`, val, {root: true}) :
            commit(`${rootState.route}/itemScroll`, val, {root: true})
        else
            commit(`${rootState.route}/textScroll`, val, {root: true})
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
