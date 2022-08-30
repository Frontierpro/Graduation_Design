import { formatCheck } from '../../assets/js/format'

const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

const state = () => ({
    signinText: '', 
    signinPwd: '', 
    signinVerifyStatus: false,
    signinLock: false,
    textFocus: false,
    pwdFocus: false
})

const mutations = {
    signinTextChange (state, val) {
        state.signinText = val
    },
    signinPwdChange (state, val) {
        state.signinPwd = val
    },
    signinVerify (state) {
        state.signinVerifyStatus = true
    },
    setSigninLock (state, val) {
        state.signinLock = val
    },
    textFocus (state) {
        state.textFocus = true
    },
    textBlur (state) {
        state.textFocus = false
    },
    pwdFocus (state) {
        state.pwdFocus = true
    },
    pwdBlur (state) {
        state.pwdFocus = false
    }
}

const actions = {
    signinSubmit ({state, commit, dispatch}) {
        if (!state.signinLock) {
            commit('setSigninLock', true)
            dispatch('signinCheck')
            if (state.signinLock)
                dispatch('signinRequest')
        }
    },
    signinCheck ({state, commit}) {
        let errorInfo = formatCheck(state.signinText, state.signinPwd)
        if (errorInfo.length > 0) {
            commit('tooltip/throwTip', errorInfo, {root: true})
            commit('setSigninLock', false)
        }
        else if (!state.signinVerifyStatus) {
            commit('tooltip/throwTip', '请完成滑动验证', {root: true})
            commit('setSigninLock', false)
        }
    },
    signinRequest ({state, commit, dispatch, rootState}) {
        let xhr = new XMLHttpRequest()
        commit('tooltip/loadTrigger', 1, {root: true})
        setTimeout(() => {
            if (rootState.tooltip.loading == 1)
                commit('tooltip/loadTrigger', 2, {root: true})
        }, 300)
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                commit('tooltip/loadTrigger', 0, {root: true})
                dispatch('signinResponse', xhr)
                commit('setSigninLock', false)
            }
        }
        xhr.open('post', 'http://106.12.17.34/admin/signin', true)
        xhr.send(JSON.stringify({'txt': state.signinText, 'pwd': state.signinPwd}))
    },
    signinResponse({state, commit}, xhr) {
        if (xhr.status != 200) {
            let errorInfo = xhr.status == 0 ? '网络异常' : `服务器异常-${xhr.status}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE < 0)
            commit('tooltip/throwTip', `服务器异常-60${-JSON.parse(xhr.responseText).STATE}`, {root: true})
        else if (JSON.parse(xhr.responseText).STATE == 1)
            commit('tooltip/throwTip', '用户名不存在', {root: true})
        else if (JSON.parse(xhr.responseText).STATE == 2)
            commit('tooltip/throwTip', '密码不正确', {root: true})
        else if (!!ipcRenderer)
            ipcRenderer.send('signin', state.signinText)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
