const state = () => ({
    iconN: 'new',
    active: false
})

const getters = {
    iconR: (state, getters, rootState) => {
        return rootState.route === 'reading' ? 'reading_activate' : 'reading'
    },
    iconL: (state, getters, rootState) => {
        return rootState.route === 'listening' ? 'listening_activate' : 'listening'
    },
    iconS: (state, getters, rootState) => {
        return rootState.route === 'speaking' ? 'speaking_activate' : 'speaking'
    },
    iconW: (state, getters, rootState) => {
        return rootState.route === 'writing' ? 'writing_activate' : 'writing'
    },
    iconP: (state, getters, rootState) => {
        return rootState.route === 'listing' ? 'listing_activate' : 'listing'
    }
}

const mutations = {
    mouseOver: (state) => {
        state.active = true
    },
    mouseOut: (state) => {
        state.active = false
    },
    mouseDown: (state) => {
        state.iconN = 'new_activate'
    },
    mouseUp: (state) => {
        state.iconN = 'new'
    }
}

const actions = {
    create: ({commit, dispatch, rootState}) => {
        commit('mouseUp')
        if (rootState.route === 'listing')
            dispatch('listing/newItem', null, {root: true})
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
