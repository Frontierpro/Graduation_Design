const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

const state = () => ({
    indexList: [],
    indexFocus: 0,
    indexPos: 0,
    textPos: 0,
    instance: {},
    result: [],
    code: ''
})

const getters = {
    status: (state) => {
        return state.indexFocus > 0 && state.indexList.length > 0 ?
            state.indexList[state.indexFocus - 1].status : 0
    },
    caption: (state) => {
        return state.indexFocus > 0 && state.indexList.length > 0 ? 
            state.indexList[state.indexFocus - 1].title : ''
    },
    isEmpty: (state) => {
        return state.instance.reading.length === 0 && state.instance.listening.length === 0
            && state.instance.writing.length === 0 && state.instance.speaking.length === 0
    }
}

const mutations = {
    setList (state, list) {
        state.indexList = list
    },
    focusChange (state, val) {
        state.indexFocus = val
        state.textPos = 0
    },
    indexScroll (state, val) {
        state.indexPos = val
    },
    textScroll (state, val) {
        state.textPos = val
    },
    setData (state, data) {
        state.instance = data.ins
        state.result = data.res
        state.code = data.code
    },
    updateTitle (state, val) {
        state.indexList[state.indexFocus - 1].title = val
    },
    insertIns (state, data) {
        state.instance[data.event].push(data.text)
    },
    deleteIns (state, data) {
        let index= state.instance[data.event].indexOf(data.text)
        if (index >= 0)
            state.instance[data.event].splice(index, 1)
    }
}

const actions = {
    initListing ({dispatch, rootState}) {
        dispatch('ajax/ajaxRequest', {'event': 'fetch', 'post': rootState.user}, {root: true})
    },
    newItem ({getters, dispatch, rootState}) {
        if (getters.status === 1 && rootState.sketch.update)
            dispatch('sketch/saveItem', -1, {root: true})
        else if (!!ipcRenderer) 
            ipcRenderer.send('new_item')
    },
    dropItem ({state, getters, dispatch, rootState}) {
        if (getters.status === 1 && rootState.sketch.update)
            dispatch('sketch/saveItem', -2, {root: true})
        else if (!!ipcRenderer)
            ipcRenderer.send('drop_item', state.indexFocus)
    },
    getFocus ({getters, commit, dispatch, rootState}, val) {
        commit('sketch/setInput', {'event': 'title', 'text': ''}, {root: true})
        commit('sketch/setInput', {'event': 'reading', 'text': ''}, {root: true})
        commit('sketch/setInput', {'event': 'listening', 'text': ''}, {root: true})
        commit('sketch/setInput', {'event': 'speaking', 'text': ''}, {root: true})
        commit('sketch/setInput', {'event': 'writing', 'text': ''}, {root: true})
        commit('result/setSelect', 0, {root: true})
        if (getters.status === 1 && rootState.sketch.update)
            dispatch('sketch/saveItem', val, {root: true})
        else {
            commit('focusChange', val)
            if (!!ipcRenderer && val > 0)
                ipcRenderer.send('get_item', val)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
