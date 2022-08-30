import { formatCheck } from '../../assets/js/format'

const state = () => ({
    cnt: 0,
    verifyLock: false
})

const getters = {
    cntStatus (state) { 
        return state.cnt == 0 ? '获取验证码' : `${state.cnt}秒后重发` 
    },
    inValid (state) { 
        return state.cnt == 0 ? false : true 
    }
}

const mutations = {
    counter (state) {
        state.cnt = 60
        for (let i = 1; i <= 60; i++)
            setTimeout(() => {state.cnt--}, 1000 * i)
    },
    setVerifyLock (state, val) {
        state.verifyLock = val
    }
}

const actions = {
    getCode ({state, commit, dispatch, rootState}) {
        if (!state.verifyLock) {
            commit('setVerifyLock', true)
            let userName = rootState.route === 'signup' ? 
                rootState.signup.signupText :
                rootState.setkey.setkeyText
            dispatch('verifyCheck', userName)
            if (state.verifyLock)
                dispatch('verifyRequest', userName)
        }
    },
    verifyCheck ({commit}, userName) {
        let errorInfo = formatCheck(userName)
        if (errorInfo.length > 0) {
            commit('tooltip/throwTip', errorInfo, {root: true})
            commit('setVerifyLock', false)
        }
    },
    verifyRequest ({commit, dispatch, rootState}, userName) {
        let xhr = new XMLHttpRequest()
        commit('tooltip/loadTrigger', 1, {root: true})
        setTimeout(() => {
            if (rootState.tooltip.loading == 1)
                commit('tooltip/loadTrigger', 2, {root: true})
        }, 300);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                commit('tooltip/loadTrigger', 0, {root: true})
                dispatch('verifyResponse', xhr)
            }
        }
        xhr.open('post', 'http://106.12.17.34/admin/verify', true)
        xhr.send(JSON.stringify({'userName': userName}))
    },
    verifyResponse ({commit}, xhr) {
        if (xhr.status != 200) {
            let errorInfo = xhr.status == 0 ? '网络异常' : `服务器异常-${xhr.status}`
            commit('tooltip/throwTip', errorInfo, {root: true})
            commit('setVerifyLock', false)
        }
        else if (JSON.parse(xhr.responseText).TTL > 0) {
            commit('tooltip/throwTip', `${JSON.parse(xhr.responseText).TTL}秒后重发`, {root: true})
            commit('setVerifyLock', false)
        }
        else if (JSON.parse(xhr.responseText).TTL < 0) {
            commit('tooltip/throwTip', `服务器异常-60${-JSON.parse(xhr.responseText).TTL}`, {root: true})
            commit('setVerifyLock', false)
        }
        else {
            commit('tooltip/throwTip', '验证码已发送', {root: true})
            commit('counter')
            setTimeout(() => {
                commit('setVerifyLock', false)
            }, 60000)
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
