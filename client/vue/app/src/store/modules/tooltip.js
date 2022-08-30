const state = () => ({
    info: '',
    display: false,
    tipcnt: 0,
    loading: 0
})

const mutations = {
    throwTip: (state, info) => {
        state.info = info
        state.display = true
        state.tipcnt++
        setTimeout(() => {
            state.tipcnt--
            if (state.tipcnt == 0)
                state.display = false
        }, 2000)
    },
    loadTrigger: (state, val) => {
        state.loading = val
    }
}

export default {
    namespaced: true,
    state,
    mutations
}
