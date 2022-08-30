const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

const state = () => ({
    lock: false
})

const mutations = {
    setLock (state, val) {
        state.lock = val
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
        xhr.open('post', `http://106.12.17.34/app/${data.event}`, true)
        xhr.send(JSON.stringify(data.post))
    },
    ajaxResponse ({commit, rootState}, xhr) {
        if (xhr.status != 200) {
            let errorInfo = xhr.status == 0 ? '网络异常' : `服务器异常-${xhr.status}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE < 0) {
            let errorInfo = `服务器异常-60${-JSON.parse(xhr.responseText).STATE}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE > 0) {
            let errorInfo = `状态异常-70${JSON.parse(xhr.responseText).STATE}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (!!ipcRenderer && JSON.parse(xhr.responseText).EVENT === 0) {
            ipcRenderer.send('drop_item', rootState.listing.indexFocus)
        }
        else if (!!ipcRenderer && JSON.parse(xhr.responseText).EVENT === 1)
            ipcRenderer.send('update_status', {'tar': rootState.listing.indexFocus, 'val': 2})
        else if (!!ipcRenderer && JSON.parse(xhr.responseText).EVENT === 4) {
            ipcRenderer.send('get_index', JSON.parse(xhr.responseText).DATA)
        }
        else if (!!ipcRenderer) {
            ipcRenderer.send('update_status', {
                'tar': rootState.listing.indexFocus, 'val': JSON.parse(xhr.responseText).EVENT
            })
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
