const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

const state = () => ({
    leftActive: false,
    rightActive: false,
    leftIcon: 'mini',
    rightIcon: 'close'
})

const mutations = {
    leftOver: (state) => {
        state.leftActive = true
        state.leftIcon = 'mini_activate'
    },
    leftOut: (state) => {
        state.leftActive = false
        state.leftIcon = 'mini'
    },
    rightOver: (state) => {
        state.rightActive = true
        state.rightIcon = 'close_activate'
    },
    rightOut: (state) => {
        state.rightActive = false
        state.rightIcon = 'close'
    }
}

const actions = {
    quit: () => {
        if (!!ipcRenderer) 
            ipcRenderer.send('admin-quit')
    },
    minimize: () => {
        if (!!ipcRenderer) 
            ipcRenderer.send('admin-minimize')
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
