const state = () => ({
    lock: false,
    title: '',
    event: 0,
    closeActive: false,
    confirmActive: false,
    hover: false,
    iconName: 'close'
})

const mutations = {
    setLock (state, data) {
        state.lock = data.lock
        state.title = data.title
        state.event = data.event
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
    mouseUp ({state, commit, dispatch, rootState}) {
        commit('mouseLeave')
        commit('mouseOut', 'confirm')
        if (state.event === 1)
            dispatch('listing/dropItem', null, {root: true})
        else if (state.event === 2)
            dispatch('sketch/releaseItem', null, {root: true})
        else if (state.event === 3)
            dispatch('ajax/ajaxRequest', {
                'event': 'delete', 'post': {'user': rootState.user, 'code': rootState.listing.code}
            }, {root: true})
        commit('setLock', {'lock': false, 'title': '', 'event': 0})
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
