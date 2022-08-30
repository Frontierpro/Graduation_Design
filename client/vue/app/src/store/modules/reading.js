import { readingInitial } from '../../assets/js/init'

const state = () => ({
    searchText: '',
    indexList: [],
    indexFocus: 0,
    indexPos: 0,
    textPos: 0,
    itemPos: 0,
    selection: 'left',
    position: 0,
    title: '',
    text: [],
    items: []
})

const mutations = {
    searchInput (state, val) {
        state.searchText = val
    },
    setList (state, list) {
        state.indexList = list
    },
    focusChange (state, val) {
        state.indexFocus = val
        state.selection = 'left'
        state.position = 0
        state.textPos = 0
        state.itemPos = 0
    },
    indexScroll (state, val) {
        state.indexPos = val
    },
    textScroll (state, val) {
        state.textPos = val
    },
    itemScroll (state, val) {
        state.itemPos = val
    },
    selectionChange (state, val) {
        state.selection = val
    },
    positionChange (state, val) {
        state.position = val
        state.itemPos = 0
    },
    setData (state, dist) {
        state.title = dist.title
        state.text = dist.text
        state.items = dist.items
    }
}

const actions = {
    initReading: ({commit}) => {
        commit('setList', readingInitial())
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
