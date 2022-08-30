import { formatCheck } from '../../assets/js/format'

const state = () => ({
    signupText: '', 
    signupPwd: '',
    signupCode: '', 
    signupLock: false,
    textFocus: false,
    pwdFocus: false,
    codeFocus: false
})

const mutations = {
    signupTextChange (state, val) {
        state.signupText = val
    },
    signupPwdChange (state, val) {
        state.signupPwd = val
    },
    signupCodeChange (state, val) {
        state.signupCode = val
    },
    setSignupLock (state, val) {
        state.signupLock = val
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
    },
    codeFocus (state) {
        state.codeFocus = true
    },
    codeBlur (state) {
        state.codeFocus = false
    }
}

const actions = {
    signupSubmit ({state, commit, dispatch}) {
        if (!state.signupLock) {
            commit('setSignupLock', true)
            dispatch('signupCheck')
            if (state.signupLock)
                dispatch('signupRequest')
        }
    },
    signupCheck ({state, commit}) {
        let errorInfo = formatCheck(state.signupText, state.signupPwd, state.signupCode)
        if (errorInfo.length > 0) {
            commit('tooltip/throwTip', errorInfo, {root: true})
            commit('setSignupLock', false)
        }
    },
    signupRequest ({state, commit, dispatch, rootState}) {
        let xhr = new XMLHttpRequest()
        commit('tooltip/loadTrigger', 1, {root: true})
        setTimeout(() => {
            if (rootState.tooltip.loading == 1)
                commit('tooltip/loadTrigger', 2, {root: true})
        }, 300);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                commit('tooltip/loadTrigger', 0, {root: true})
                dispatch('signupResponse', xhr)
                commit('setSignupLock', false)
            }
        }
        xhr.open('post', 'http://106.12.17.34/admin/signup', true)
        xhr.send(JSON.stringify({
            'txt': state.signupText, 'pwd': state.signupPwd, 'code': state.signupCode
        }))
    },
    signupResponse({commit}, xhr) {
        if (xhr.status != 200) {
            let errorInfo = xhr.status == 0 ? '网络异常' : `服务器异常-${xhr.status}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE < 0)
            commit('tooltip/throwTip', `服务器异常-60${-JSON.parse(xhr.responseText).STATE}`, {root: true})
        else if (JSON.parse(xhr.responseText).STATE == 1)
            commit('tooltip/throwTip', '该邮箱已被注册', {root: true})
        else if (JSON.parse(xhr.responseText).STATE == 2)
            commit('tooltip/throwTip', '验证码无效', {root: true})
        else if (JSON.parse(xhr.responseText).STATE == 3)
            commit('tooltip/throwTip', '验证码已失效', {root: true})
        else {
            commit('tooltip/throwTip', '注册成功', {root: true})
            commit('routeChange', 'signin', {root: true})
            commit('signupTextChange', '')
            commit('signupPwdChange', '')
            commit('signupCodeChange', '')
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
