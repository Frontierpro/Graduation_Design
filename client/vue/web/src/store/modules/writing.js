const state = () => ({
    status: true,
    title: [],
    text: [],
    audioSrc: '',
    answer: ''
})

const mutations = {
    setStatus (state, val) {
        state.status = val
    },
    setData (state, dist) {
        state.title = dist.data.title
        state.text = dist.data.text
        let title = dist.title
        let dir = 'http://106.12.17.34/audio/writing/'
        state.audioSrc = title.split(' ')[2] === 'Integrated' ? dir + `${title.split(' ')[1]}.mp3` : ''
    },
    setAnswer (state, val) {
        state.answer = val
    }
}

const actions = {
    init ({commit, rootState}, data) {
        commit('setData', {
            'title': localStorage.getItem(`${rootState.user}_${rootState.code}_${rootState.name}`),
            'data': data
        })
        let key = `${rootState.user}_${rootState.code}_${rootState.name}_cache`
        if (!localStorage.getItem(key))
            localStorage.setItem(key, '')
        commit('setAnswer', localStorage.getItem(key))
        commit('setStatus', true)
        commit('setRoute', 4, {root: true})
    },
    update ({commit, rootState}, val) {
        commit('setAnswer', val)
        localStorage.setItem(`${rootState.user}_${rootState.code}_${rootState.name}_cache`, val)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
