<template>
    <div id="app">
        <CtrlBar class="ctrlBar" />  
        <SignIn class="routerView" v-if="route === 'signin'" />
        <SignUp class="routerView" v-else-if="route === 'signup'" />
        <SetKey class="routerView" v-else-if="route === 'setkey'" />
        <DivBar class="divBar" />
        <ToolTip class="toolTip" :style="tipWidth" v-if="display" />
        <LoadBar class="loadBar" v-if="loading == 2" />
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

import CtrlBar from './components/CtrlBar'
import DivBar from './components/DivBar'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import SetKey from './components/SetKey'
import ToolTip from './components/ToolTip'
import LoadBar from './components/LoadBar'

export default {
    name: 'App',
    components: {
        'CtrlBar': CtrlBar,
        'DivBar': DivBar,
        'SignIn': SignIn,
        'SignUp': SignUp,
        'SetKey': SetKey,
        'ToolTip': ToolTip,
        'LoadBar': LoadBar
    },
    computed: {
        ...mapState(['route']),
        ...mapGetters(['focus']),
        ...mapState('tooltip', ['loading', 'display']),
        ...mapGetters('tooltip', ['tipWidth'])
    },
    mounted: function () {
        document.onkeyup = () => {
            if (this.loading < 2 && window.event.keyCode == 13) {
                if (this.route === 'signin')
                    this.$store.dispatch('signin/signinSubmit')
                else if (this.route === 'signup')
                    this.$store.dispatch('signup/signupSubmit')
                else if (this.route === 'setkey')
                    this.$store.dispatch('setkey/setkeySubmit')
            }
        },
        document.onkeydown = () => {
            console.log(this.focus)
            if (window.event.keyCode == 27)
                ipcRenderer.send('admin-quit')
            else if (this.loading < 2 && !this.focus && window.event.keyCode == 37) {
                if (this.route === 'signin')
                    this.$store.commit('routeChange', 'signup')
                else if (this.route === 'signup')
                    this.$store.commit('routeChange', 'setkey')
                else if (this.route === 'setkey')
                    this.$store.commit('routeChange', 'signin')
            }
            else if (this.loading < 2 && !this.focus && window.event.keyCode == 39) {
                if (this.route === 'signin')
                    this.$store.commit('routeChange', 'setkey')
                else if (this.route === 'signup')
                    this.$store.commit('routeChange', 'signin')
                else if (this.route === 'setkey')
                    this.$store.commit('routeChange', 'signup')
            }
        }
    }
}
</script>

<style>
body {
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 0;
    width: 300px;
    height: 400px;
    font-size: 13px;
    font-family: 'microsoft yahei';
    color: #2e2e2e;
    background-color: #f2f2f2;
    -webkit-app-region: drag;
    -webkit-user-select: none;
    user-select: none;
}

.ctrlBar {
    position: absolute;
    width: 100%;
    height: 31px;
}

.routerView {
    position: absolute;
    width: 100%;
    height: 313px;
    -webkit-app-region: no-drag;
}

.divBar {
    position: absolute;
    margin-top: 338px;
    width: 100%;
    height: 31px;
}

.toolTip {
    position: absolute;
    z-index: 5;
    margin-top: 128px;
    height: 25px;
}

.loadBar {
    position: absolute;
    z-index: 4;
    width: 100%;
    height: 269px;
    margin-top: 31px;
}
</style>
