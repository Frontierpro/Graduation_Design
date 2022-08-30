import Vue from 'vue'
import App from './App'
import store from './store'

import SvgIcon from './components/SvgIcon'
import Editor from './components/Editor'
import Verifier from './components/Verifier'
import ClkBtn from './components/ClkBtn'

Vue.component('SvgIcon', SvgIcon)
Vue.component('Editor', Editor)
Vue.component('Verifier', Verifier)
Vue.component('ClkBtn', ClkBtn)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./assets/svg', false, /\.svg$/)
requireAll(req)

new Vue ({
    el: '#app',
    store,
    components: { App },
    template: '<App/>'
})
