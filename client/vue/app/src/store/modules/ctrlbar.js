const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

const state = () => ({
    active: {'left': false, 'middle': false, 'right': false},
    icon: {'left': 'mini', 'middle': 'maxi', 'right': 'close'},
    map: {'left': 'mini', 'middle': 'maxi', 'right': 'close'}
})

const mutations = {
    mouseOver: (state, event) => {
        state.active[event] = true
        state.icon[event] = `${state.map[event]}_activate`
    },
    mouseOut: (state, event) => {
        state.active[event] = false
        state.icon[event] = state.map[event]
    }
}

const actions = {
    quit: ({commit}) => {
        commit('mouseOut', 'right')
        if (!!ipcRenderer) 
            ipcRenderer.send('main-quit')
    },
    maximize: () => {
        if (!!ipcRenderer)
            ipcRenderer.send('main-maximize')
    },
    minimize: () => {
        if (!!ipcRenderer)
            ipcRenderer.send('main-minimize')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
