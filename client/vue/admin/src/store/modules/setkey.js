import { formatCheck } from '../../assets/js/format'

const state = () => ({
    setkeyText: '',
    setkeyPwd: '',
    setkeyCode: '',
    setkeyLock: false,
    textFocus: false,
    pwdFocus: false,
    codeFocus: false
})

const mutations = {
    setkeyTextChange (state, val) {
        state.setkeyText = val
    },
    setkeyPwdChange (state, val) {
        state.setkeyPwd = val
    },
    setkeyCodeChange (state, val) {
        state.setkeyCode = val
    },
    setSetkeyLock (state, val) {
        state.setkeyLock = val
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
    setkeySubmit ({state, commit, dispatch}) {
        if (!state.setkeyLock) {
            commit('setSetkeyLock', true)
            dispatch('setkeyCheck')
            if (state.setkeyLock)
                dispatch('setkeyRequest')
        }
    },
    setkeyCheck ({state, commit}) {
        let errorInfo = formatCheck(state.setkeyText, state.setkeyPwd, state.setkeyCode)
        if (errorInfo.length > 0) {
            commit('tooltip/throwTip', errorInfo, {root: true})
            commit('setSetkeyLock', false)
        }
    },
    setkeyRequest ({state, commit, dispatch, rootState}) {
        let xhr = new XMLHttpRequest()
        commit('tooltip/loadTrigger', 1, {root: true})
        setTimeout(() => {
            if (rootState.tooltip.loading == 1)
                commit('tooltip/loadTrigger', 2, {root: true})
        }, 300);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                commit('tooltip/loadTrigger', 0, {root: true})
                dispatch('setkeyResponse', xhr)
                commit('setSetkeyLock', false)
            }
        }
        xhr.open('post', 'http://106.12.17.34/admin/setkey', true)
        xhr.send(JSON.stringify({
            'txt': state.setkeyText, 'pwd': state.setkeyPwd, 'code': state.setkeyCode
        }))
    },
    setkeyResponse ({commit}, xhr) {
        if (xhr.status != 200) {
            let errorInfo = xhr.status == 0 ? '网络异常' : `服务器异常-${xhr.status}`
            commit('tooltip/throwTip', errorInfo, {root: true})
        }
        else if (JSON.parse(xhr.responseText).STATE < 0)
            commit('tooltip/throwTip', `服务器异常-60${-JSON.parse(xhr.responseText).STATE}`, {root: true})
        else if (JSON.parse(xhr.responseText).STATE == 1)
            commit('tooltip/throwTip', '用户名不存在', {root: true})
        else if (JSON.parse(xhr.responseText).STATE == 2)
            commit('tooltip/throwTip', '验证码无效', {root: true})
        else if (JSON.parse(xhr.responseText).STATE == 3)
            commit('tooltip/throwTip', '验证码已失效', {root: true})
        else {
            commit('tooltip/throwTip', '密码修改成功', {root: true})
            commit('routeChange', 'signin', {root: true})
            commit('setkeyTextChange', '')
            commit('setkeyPwdChange', '')
            commit('setkeyCodeChange', '')
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
