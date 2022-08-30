const state = () => ({
    leftActive: false,
    rightActive: false,
    active: false
})

const mutations = {
    leftOver (state) { 
        state.leftActive = true 
    },
    leftOut (state) { 
        state.leftActive = false 
    },
    rightOver (state) { 
        state.rightActive = true 
    },
    rightOut (state) { 
        state.rightActive = false 
    },
    mouseOver (state) { 
        state.active = true 
    },
    mouseOut (state) { 
        state.active = false 
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
