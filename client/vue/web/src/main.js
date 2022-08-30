import Vue from 'vue'
import App from './App'
import store from './store'

import ToolTip from './components/ToolTip'
import LoadBar from './components/LoadBar'
import SkipBox from './components/SkipBox'
import SvgIcon from './components/SvgIcon'
import Audio from './components/Audio'
import Recorder from './components/Recorder'

Vue.component('ToolTip', ToolTip)
Vue.component('LoadBar', LoadBar)
Vue.component('SkipBox', SkipBox)
Vue.component('SvgIcon', SvgIcon)
Vue.component('Audio', Audio)
Vue.component('Recorder', Recorder)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./assets/svg', false, /\.svg$/)
requireAll(req)

new Vue ({
    el: '#app',
    store,
    components: { App },
    template: '<App/>'
})
