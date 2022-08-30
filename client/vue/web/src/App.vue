<template>
    <div>
        <ToolTip class="toolTip" :style="tipStyle" v-if="display" />
        <LoadBar class="loadBar" v-if="loading === 2" />
        <SkipBox class="skipBox" v-if="lock" />
        <Beginning class="page" v-if="route === 0" />
        <Reading v-else-if="route === 1" />
        <Listening v-else-if="route === 2" />
        <Speaking v-else-if="route === 3" />
        <Writing v-else-if="route === 4" />
        <Ending v-else-if="route === 5" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import Beginning from './components/Beginning'
import Reading from './components/Reading'
import Listening from './components/Listening'
import Speaking from './components/Speaking'
import Writing from './components/Writing'
import Ending from './components/Ending'

export default {
    name: 'App',
    components: {
        Beginning,
        Reading,
        Listening,
        Speaking,
        Writing,
        Ending
    },
    computed: {
        ...mapState(['route']),
        ...mapState('tooltip', ['loading', 'display', 'info']),
        ...mapState('skipbox', ['lock']),
        tipStyle () {
            return `width: ${this.tipWidth}px; margin-left: ${this.marginLeft}px;`
        },
        tipWidth () {
            return 13 * this.info.length + 20
        },
        marginLeft () {
            return 0.5 * document.documentElement.clientWidth - 6.5 * this.info.length - 10
        }
    },
    methods: {
        ...mapMutations(['setInfo'])
    },
    created: function () {
        let str = location.href
        let user = str.slice(str.indexOf('?uid=') + 5, str.indexOf('&'))
        let code = str.slice(str.indexOf('&pid=') + 5)
        this.setInfo({'user': user, 'code': code})
    }
}
</script>

<style>
body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    overflow: hidden;
    font-family: 'microsoft yahei';
    color: #666666;
    -webkit-user-select: none;
    user-select: none;
}

::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(46, 46, 46, 0.4);
}

::-webkit-scrollbar-track {
    background-color: #ffffff;
}

::-webkit-scrollbar {
    width: 8px;
}

.toolTip {
    position: absolute;
    z-index: 10;
    height: 25px;
    margin-top: calc(50vh - 12.5px);
    font-size: 13px;
}

.loadBar {
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
}

.skipBox {
    position: absolute;
    z-index: 5;
    width: 100%;
    height: 100%;
}

.page {
    width: 100vw;
    height: 100vh;
}
</style>
