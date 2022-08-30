const state = () => ({
    lock: false,
    closeActive: false,
    confirmActive: false,
    hover: false,
    iconName: 'close'
})

const mutations = {
    setLock (state, val) {
        state.lock = val
    },
    mouseOver (state, val) {
        if (val === 'close') {
            state.closeActive = true
            state.iconName = 'close_activate'
        }
        else if (val === 'confirm')
            state.hover = true
    },
    mouseOut (state, val) {
        if (val === 'close') {
            state.closeActive = false
            state.iconName = 'close'
        }
        else if (val === 'confirm')
            state.hover = false
    },
    mouseDown (state) {
        state.confirmActive = true
    },
    mouseLeave (state) {
        state.confirmActive = false
    }
}

const actions = {
    mouseUp ({commit, dispatch}) {
        commit('mouseLeave')
        commit('mouseOut', 'confirm')
        dispatch('set', null, {root: true})
        commit('setLock', false)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
