const state = () => ({
    lock: false,
    route: 0
})

const mutations = {
    setLock (state, val) {
        state.lock = val
    },
    setRoute (state, val) {
        state.route = val
    }
}

const actions = {
    ajaxRequest ({commit, rootState, dispatch}, data) {
        commit('setLock', true)
        let xhr = new XMLHttpRequest()
        commit('tooltip/loadTrigger', 1, {root: true})
        setTimeout(() => {
            if (rootState.tooltip.loading == 1)
                commit('tooltip/loadTrigger', 2, {root: true})
        }, 300);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4)
                dispatch('ajaxResponse', xhr)
        }
        xhr.open('post', `http://106.12.17.34/${data.event}`, true)
        xhr.send(JSON.stringify(data.post))
    },
    ajaxResponse ({state, commit, dispatch, rootState}, xhr) {
        if (xhr.status != 200) {
            let errorInfo = xhr.status == 0 ? '网络异常' : `服务器异常-${xhr.status}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE < 0) {
            let errorInfo = `服务器异常-60${-JSON.parse(xhr.responseText).STATE}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE === 1)
            commit('tooltip/throwTip', '该试卷未开放', {root: true})
        else if (JSON.parse(xhr.responseText).STATE === 2)
            commit('tooltip/throwTip', '该试卷链接无效', {root: true})
        else if (JSON.parse(xhr.responseText).STATE === 3)
            commit('tooltip/throwTip', '该姓名已存在', {root: true})
        else if (JSON.parse(xhr.responseText).EVENT && JSON.parse(xhr.responseText).EVENT === 1) {
            localStorage.setItem(`${rootState.user}_${rootState.code}_${rootState.name}`, '')
            commit('setRoute', state.route + 1)
            dispatch('get', null, {root: true})
        }
        else if (JSON.parse(xhr.responseText).EVENT && JSON.parse(xhr.responseText).EVENT === 2)
            dispatch('post', JSON.parse(xhr.responseText).DATA, {root: true})
        else if (JSON.parse(xhr.responseText).EVENT && JSON.parse(xhr.responseText).EVENT === 3) {
            localStorage.setItem(`${rootState.user}_${rootState.code}_${rootState.name}`, '')
            localStorage.removeItem(`${rootState.user}_${rootState.code}_${rootState.name}_cache`)
            dispatch('get', null, {root: true})
        }
        else {
            let event = `${rootState.map[state.route]}/init`
            dispatch(event, JSON.parse(xhr.responseText).DATA, {root: true})
        }
        commit('setLock', false)
        commit('tooltip/loadTrigger', 0, {root: true})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
