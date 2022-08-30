import Vue from 'vue'
import Vuex from 'vuex'

import ctrlbar from './modules/ctrlbar'
import divbar from './modules/divbar'
import tooltip from './modules/tooltip'
import linkstyle from './modules/linkstyle'
import signin from './modules/signin'
import signup from './modules/signup'
import setkey from './modules/setkey'
import verify from './modules/verify'

Vue.use(Vuex)

export default new Vuex.Store ({
    modules: {
        ctrlbar: ctrlbar,
        divbar: divbar,
        tooltip: tooltip,
        signinlink: linkstyle,
        signuplink: linkstyle,
        setkeylink: linkstyle,
        signin: signin,
        signup: signup,
        setkey: setkey,
        verify: verify
    },
    state: () => ({
        route: 'signin'
    }),
    getters: {
        focus (state) {
            if (state.route === 'signin')
                return state.signin.textFocus || state.signin.pwdFocus
            else if (state.route === 'signup')
                return state.signup.textFocus || state.signup.pwdFocus || state.signup.codeFocus
            else if (state.route === 'setkey')
                return state.setkey.textFocus || state.setkey.pwdFocus || state.setkey.codeFocus
        }
    },
    mutations: {
        routeChange (state, val) {
            state.route = val
            state.signin.signinVerifyStatus = false
        }
    }
})
