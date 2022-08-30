const state = () => ({
    hover: {'copy': false, 'list': false},
    active: {'copy': false, 'list': false},
    focus: false,
    select: 0
})

const mutations = {
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
    setFocus (state, val) {
        state.focus = val
    },
    setSelect (state, val) {
        state.select = val
    }
}

const actions = {
    mouseUp({commit, dispatch, rootState}, event) {
        commit('mouseLeave', event)
        if (event === 'copy')
            commit('tooltip/throwTip', '试卷链接已复制到剪贴板', {root: true})
        else if (event === 'list')
            console.log('list')
        else if (event === 'drop')
            commit('skipbox/setLock', {'lock': true, 'event': 3, 'title': '确定删除该试卷吗？'}, {root: true})
        else
            dispatch('ajax/ajaxRequest', {
                'event': 'update', 'post': {'user': rootState.user, 'code': rootState.listing.code}
            }, {root: true})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
