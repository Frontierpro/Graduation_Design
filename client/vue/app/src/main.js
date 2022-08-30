import Vue from 'vue'
import App from './App'
import store from './store'

import SvgIcon from './components/SvgIcon'
import ToggleButton from './components/ToggleButton'
import ItemBar from './components/ItemBar'
import Audio from './components/Audio'
import SkipBox from './components/SkipBox'
import ClkBtn from './components/ClkBtn'

Vue.component('SvgIcon', SvgIcon)
Vue.component('ToggleButton', ToggleButton)
Vue.component('ItemBar', ItemBar)
Vue.component('Audio', Audio)
Vue.component('SkipBox', SkipBox)
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
