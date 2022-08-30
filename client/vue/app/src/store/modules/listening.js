import { listeningInitial } from '../../assets/js/init'

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
    items: [],
    audioSrc: '',
    audioList: []
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
    },
    audioInit (state, val) {
        let dir = 'http://106.12.17.34/audio/listening/'
        dir += `${val.split(' ')[1]}-${
            val.split(' ')[2] === 'Lecture'?
            1 + Math.floor(val.split(' ')[3] / 3) + parseInt(val.split(' ')[3]):
            3 * val.split(' ')[3] - 2
        }/0.mp3`
        state.audioSrc = dir
    },
    audioListInit (state) {
        let dir = 'http://106.12.17.34/audio/listening/'
        let val = state.indexList[state.indexFocus - 1].title
        dir += `${val.split(' ')[1]}-${
            val.split(' ')[2] === 'Lecture'?
            1 + Math.floor(val.split(' ')[3] / 3) + parseInt(val.split(' ')[3]):
            3 * val.split(' ')[3] - 2
        }/`
        state.audioList = []
        for (let index in state.items) {
            let tmpList = []
            if (state.items[index].src_cnt === 2) {
                tmpList.push(dir + `${parseInt(index) + 1}-2.mp3`)
            }
            else if (state.items[index].src_cnt === 3) {
                tmpList.push(dir + `${parseInt(index) + 1}-3.mp3`)
                tmpList.push(dir + `${parseInt(index) + 1}-1.mp3`)
            }
            state.audioList.push(tmpList)
        }
    }
}

const actions = {
    initListening: ({commit}) => {
        commit('setList', listeningInitial())
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
