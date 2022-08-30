const getters = {
    iconLeft: (state, getters, rootState) => {
        if (rootState.route === 'signup')
            return 'pot_activate'
        return 'pot'
    },
    iconMiddle: (state, getters, rootState) => {
        if (rootState.route === 'signin')
            return 'pot_activate'
        return 'pot'
    },
    iconRight: (state, getters, rootState) => {
        if (rootState.route === 'setkey')
            return 'pot_activate'
        return 'pot'
    }
}

export default {
    namespaced: true,
    getters
}
