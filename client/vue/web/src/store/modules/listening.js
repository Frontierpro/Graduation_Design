const state = () => ({
    title: '',
    audioSrc: '',
    audioList: [],
    items: [],
    position: 0,
    answer: [],
    cache: ''
})

const mutations = {
    setData (state, dist) {
        state.title = dist.data.title
        state.items = dist.data.items
        let title = dist.title
        let dir = 'http://106.12.17.34/audio/listening/'
        dir += `${title.split(' ')[1]}-${
            title.split(' ')[2] === 'Lecture'?
            1 + Math.floor(title.split(' ')[3] / 3) + parseInt(title.split(' ')[3]):
            3 * title.split(' ')[3] - 2
        }/`
        state.audioSrc = dir + '0.mp3'
        state.audioList = []
        for (let index in state.items) {
            let tmpList = []
            for (let cnt = 0; cnt < state.items[index].src_cnt; cnt++)
                tmpList.push(dir + `${parseInt(index) + 1}-${cnt + 1}.mp3`)
            state.audioList.push(tmpList)
        }
    },
    setAnswer (state, list) {
        state.answer = list
    },
    setCache (state, val) {
        state.cache = val
        state.answer[state.position - 1] = state.cache
    },
    posChange (state, val) {
        state.position = val
        state.cache = state.answer[val - 1]
    }
}

const actions = {
    init ({state, commit, rootState}, data) {
        commit('setData', {
            'title': localStorage.getItem(`${rootState.user}_${rootState.code}_${rootState.name}`),
            'data': data
        })
        let key = `${rootState.user}_${rootState.code}_${rootState.name}_cache`
        if (!localStorage.getItem(key)) {
            let cookie = new Array(state.items.length).fill('')
            localStorage.setItem(key, JSON.stringify(cookie))
        }
        commit('setAnswer', JSON.parse(localStorage.getItem(key)))
        commit('posChange', 0)
        commit('setRoute', 2, {root: true})
    },
    update ({state, commit, rootState}, val) {
        commit('setCache', val)
        let key = `${rootState.user}_${rootState.code}_${rootState.name}_cache`
        localStorage.setItem(key, JSON.stringify(state.answer))
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
