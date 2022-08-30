const state = () => ({
    status: true,
    text: [],
    title: [],
    duration: 0,
    audioSrc: ''
})

const mutations = {
    setStatus (state, val) {
        state.status = val
    },
    setData (state, dist) {
        state.text = dist.data.text
        state.title = dist.data.title
        let title = dist.title
        state.duration = parseInt(title.split(' ')[3]) > 1 ? 60 : 45
        let dir = 'http://106.12.17.34/audio/speaking/'
        dir += `${title.split(' ')[1]}/${title.split(' ')[3]}-0.mp3`
        state.audioSrc = parseInt(title.split(' ')[3]) > 1 ? dir : ''
    }
}

const actions = {
    init ({commit, rootState}, data) {
        commit('setData', {
            'title': localStorage.getItem(`${rootState.user}_${rootState.code}_${rootState.name}`),
            'data': data
        })
        commit('setStatus', true)
        commit('setRoute', 3, {root: true})
    },
    update ({commit, dispatch, rootState}, data) {
        let title = localStorage.getItem(`${rootState.user}_${rootState.code}_${rootState.name}`)
        let fileName = `${rootState.user}_${rootState.code}?${rootState.name}?${title}`
        let file = new File([data], fileName, {type: 'audio/wav'})
        let formData = new FormData()
        formData.append('file', file)
        let xhr = new XMLHttpRequest()
        commit('tooltip/loadTrigger', 1, {root: true})
        setTimeout(() => {
            if (rootState.tooltip.loading == 1)
                commit('tooltip/loadTrigger', 2, {root: true})
        }, 300);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                commit('tooltip/loadTrigger', 0, {root: true})
                dispatch('ajax/ajaxRequest', {'event': 'app/set', 'post': {
                    'user': rootState.user, 'code': rootState.code, 'name': rootState.name, 'db': 'Speaking',
                    'title': localStorage.getItem(`${rootState.user}_${rootState.code}_${rootState.name}`),
                    'data': ""
                }}, {root: true})
            }
        }
        xhr.open('post', `http://106.12.17.34/app/upload`, true)
        xhr.send(formData)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
