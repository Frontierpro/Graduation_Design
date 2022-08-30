import { txtFormat, strReplace } from '../../assets/js/format'

const state = () => ({
    title: '',
    text: [],
    items: [],
    position: 0,
    answer: [],
    cache: ''
})

const getters = {
    text: (state) => {
        let tmp_list = state.text.slice()
        let cnt = state.items[state.position].highlight.length
        if (cnt === 4) {
            for (let k = 0; k < cnt; k++) {
                let m = state.items[state.position].highlight[k][0]
                let n = state.items[state.position].highlight[k][1]
                tmp_list[m] = tmp_list[m].substring(0, n) + '\n' + tmp_list[m].substring(n + 1)
            }
            let begin = state.items[state.position].highlight[0][0]
            let end = state.items[state.position].highlight[3][0]
            let base = 0
            for (let k = begin; k <= end; k++) {
                let res = strReplace(tmp_list[k], state.cache.charCodeAt() - 65, base)
                tmp_list[k] = res.str
                base = res.num
            }
            return txtFormat(tmp_list, begin, end)
        }
        else if (cnt === 0)
            return state.text
        else if (state.items[state.position].highlight[0].length === 1) {
            let begin = state.items[state.position].highlight[0][0]
            let end = state.items[state.position].highlight[cnt - 1][0]
            return txtFormat(tmp_list, begin, end)
        }
        else {
            let n = state.items[state.position].highlight[0][0]
            for (let k = 0; k < cnt; k++) {
                let begin = state.items[state.position].highlight[k][1] + k * 34
                let end = state.items[state.position].highlight[k][2] + k * 34 + 27
                let head = '<span style="color: coral">'
                let tail = '</span>'
                tmp_list[n] = tmp_list[n].substring(0, begin) + head + tmp_list[n].substring(begin)
                tmp_list[n] = tmp_list[n].substring(0, end) + tail + tmp_list[n].substring(end)
            }
            return txtFormat(tmp_list, n, n)
        }
    }
}

const mutations = {
    setData (state, dist) {
        state.title = dist.title
        state.text = dist.text
        state.items = dist.items
    },
    setAnswer (state, list) {
        state.answer = list
    },
    setCache (state, val) {
        state.cache = val
        state.answer[state.position] = state.cache
    },
    posChange (state, val) {
        if (val >= 0 && val < state.items.length) {
            state.position = val
            state.cache = state.answer[val]
        }
    }
}

const actions = {
    init ({state, commit, rootState}, data) {
        commit('setData', data)
        let key = `${rootState.user}_${rootState.code}_${rootState.name}_cache`
        if (!localStorage.getItem(key)) {
            let cookie = new Array(state.items.length).fill('')
            localStorage.setItem(key, JSON.stringify(cookie))
        }
        commit('setAnswer', JSON.parse(localStorage.getItem(key)))
        commit('posChange', 0)
        commit('setRoute', 1, {root: true})
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
    getters,
    mutations,
    actions
}
