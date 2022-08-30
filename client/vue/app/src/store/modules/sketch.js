import { readingInitial, listeningInitial, speakingInitial, writingInitial } from '../../assets/js/init'
import { indexOF } from '../../assets/js/util'

const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

const state = () => ({
    formList: [
        {'tit': '试卷标题', 'sec': 'title', 'svg': 'confirm', 'text': ''},
        {'tit': '阅读部分', 'sec': 'reading', 'svg': 'add', 'id': 0, 'text': '', 'list': []},
        {'tit': '听力部分', 'sec': 'listening', 'svg': 'add', 'id': 0, 'text': '', 'list': []},
        {'tit': '口语部分', 'sec': 'speaking', 'svg': 'add', 'id': 0, 'text': '', 'list': []},
        {'tit': '写作部分', 'sec': 'writing', 'svg': 'add', 'id': 0, 'text': '', 'list': []},
    ],
    hover: {'title': false, 'reading': false, 'listening': false, 'speaking': false, 'writing': false},
    active: {'title': false, 'reading': false, 'listening': false, 'speaking': false, 'writing': false},
    focus: {'title': false, 'reading': false, 'listening': false, 'speaking': false, 'writing': false},
    map: {'title': 0, 'reading': 1, 'listening': 2, 'speaking': 3, 'writing': 4},
    update: false
})

const getters = {
    focusInput: (state) => {
        return state.focus.reading ? 'reading' : state.focus.listening ? 'listening' :
            state.focus.speaking ? 'speaking' : state.focus.writing ? 'writing' : 'title'
    }
}

const mutations = {
    textChange (state, val) {
        state.update = val
    },
    mouseOver (state, event) {
        state.hover[event] = true
    },
    mouseOut (state, event) {
        state.hover[event] = false
    },
    mouseDown (state, event) {
        state.active[event] = true
    },
    mouseLeave (state, event) {
        state.active[event] = false
    },
    setInput (state, data) {
        let cnt = state.map[data.event]
        if (cnt > 0) {
            let index = indexOF(data.text, state.formList[cnt].list)
            state.formList[cnt].id = index
        }
        state.formList[cnt].text = data.text
    },
    setList (state, data) {
        state.formList[state.map[data.event]].list = data.list
    },
    inputFocus (state, val) {
        state.focus[val] = true
    },
    inputBlur (state, val) {
        state.focus[val] = false
    }
}

const actions = {
    initList ({commit}) {
        commit('setList', {'event': 'reading', 'list': readingInitial()})
        commit('setList', {'event': 'listening', 'list': listeningInitial()})
        commit('setList', {'event': 'speaking', 'list': speakingInitial()})
        commit('setList', {'event': 'writing', 'list': writingInitial()})
    },
    mouseUp ({state, commit, dispatch}, event) {
        if (event === 'drop' || event === 'release') {
            commit('skipbox/setLock', {
                'lock': true, 'event': event === 'drop' ? 1 : 2,
                'title': event === 'drop' ? '确定删除该试卷吗？' : '确定发布该试卷吗？'
            }, {root: true})
        }
        else if (event === 'title') {
            commit('mouseLeave', event)
            dispatch('titleChange')
        }
        else if (event.indexOf('ing') > 0) {
            commit('mouseLeave', event)
            dispatch('optionInsert', event)
        }
        else if (state.update)
            dispatch('saveItem', 0)
    },
    saveItem ({commit, rootState, rootGetters}, val) {
        commit('textChange', false)
        let data = {
            'index': rootState.listing.indexFocus,
            'item': {'ins': rootState.listing.instance, 'res': rootState.listing.result},
            'title': rootGetters['listing/caption'], 'next': val
        }
        if (!!ipcRenderer)
            ipcRenderer.send('save_item', data)
    },
    releaseItem ({state, commit, dispatch, rootState, rootGetters}) {
        if (state.update)
            dispatch('saveItem', -3)
        else if (rootGetters['listing/isEmpty'])
            commit('tooltip/throwTip', '试卷不能为空', {root: true})
        else if (!rootState.ajax.lock)
            dispatch('ajax/ajaxRequest', {
                'event': 'insert',
                'post': {
                    'user': rootState.user,
                    'code': rootState.listing.code,
                    'title': rootGetters['listing/caption'],
                    'reading': rootState.listing.instance.reading,
                    'listening': rootState.listing.instance.listening,
                    'speaking': rootState.listing.instance.speaking,
                    'writing': rootState.listing.instance.writing,
                }
            }, {root: true})
    },
    titleChange ({state, commit}) {
        let pattern = /^[\w\.\s-]+$/
        if (state.formList[0].text.length === 0)
            commit('tooltip/throwTip', '标题不能为空', {root: true})
        else if (!pattern.test(state.formList[0].text))
            commit('tooltip/throwTip', '标题只能包含大小写字母、数字、下划线、横线、点号和空格', {root: true})
        else if (state.formList[0].text.length > 100)
            commit('tooltip/throwTip', '标题不能超过100个字符', {root: true})
        else {
            commit('listing/updateTitle', state.formList[0].text, {root: true})
            commit('textChange', true)
            commit('setInput', {'event': 'title', 'text': ''})
        }
    },
    optionInsert ({state, commit, rootState}, event) {
        if (state.formList[state.map[event]].text.length === 0)
            commit('tooltip/throwTip', '题目不能为空', {root: true})
        else if (state.formList[state.map[event]].id === 0)
            commit('tooltip/throwTip', '题目格式不正确', {root: true})
        else if (rootState.listing.instance[event].indexOf(state.formList[state.map[event]].text) >= 0)
            commit('tooltip/throwTip', '题目不能重复', {root: true})
        else {
            commit('listing/insertIns', {
                'event': event, 'text': state.formList[state.map[event]].text
            }, {root: true})
            commit('textChange', true)
            commit('setInput', {'event': event, 'text': ''})
        }
    },
    optionDelete ({commit}, data) {
        commit('listing/deleteIns', data, {root: true})
        commit('textChange', true)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
