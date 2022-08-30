import { writingInitial } from '../../assets/js/init'

const state = () => ({
    searchText: '',
    indexList: [],
    indexFocus: 0,
    indexPos: 0,
    textPos: 0,
    title: [],
    text: [],
    audioSrc: ''
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
        state.textPos = 0
    },
    indexScroll (state, val) {
        state.indexPos = val
    },
    textScroll (state, val) {
        state.textPos = val
    },
    setData (state, dist) {
        state.title = dist.title
        state.text = dist.text
    },
    audioInit (state, val) {
        let dir = 'http://106.12.17.34/audio/writing/'
        state.audioSrc = val.split(' ')[2] === 'Integrated' ? dir + `${val.split(' ')[1]}.mp3` : ''
    }
}

const actions = {
    initWriting: ({commit}) => {
        commit('setList', writingInitial())
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
