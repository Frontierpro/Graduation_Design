<template>
    <div id="app">
        <TitleBar id="titleBar" />
        <div id="cataLog">
            <div id="searchEngine">
                <SearchEngine />
            </div>
            <div id="indexList" @scroll="indexListScroll" ref="indexList">
                <InfoBlock v-for="index in indexList"
                :key="index.id" :indexInfo="index" :indexFocus="indexFocus" />
            </div>
        </div>
        <div id="webPage">
            <CtrlBar id="ctrlBar" />
            <div id="contentPage" @scroll="contentPageScroll" ref="contentPage">
                <div class="emptyPage" v-if="indexFocus == 0">
                    <SvgIcon class="svgBkg" iconName="home" />
                </div>
                <div v-if="indexFocus > 0">
                    <Reading v-if="route === 'reading'" @update="contentPageUpdate" />
                    <Listening v-else-if="route === 'listening'" @update="contentPageUpdate" />
                    <Speaking v-else-if="route === 'speaking'" @update="contentPageUpdate" />
                    <Writing v-else-if="route === 'writing'" @update="contentPageUpdate" />
                    <Listing v-else @update="contentPageUpdate" />
                </div>
            </div>
        </div>
        <ToolTip class="toolTip" :style="tipWidth" v-if="display" />
        <LoadBar class="loadBar" v-if="loading === 2" />
        <SkipBox class="skipBox" v-if="lock" />
    </div>
</template>

<script>
import CtrlBar from './components/CtrlBar'
import TitleBar from './components/TitleBar'
import SearchEngine from './components/SearchEngine'
import InfoBlock from './components/InfoBlock'
import Reading from './components/blocks/Reading'
import Listening from './components/blocks/Listening'
import Speaking from './components/blocks/Speaking'
import Writing from './components/blocks/Writing'
import Listing from './components/blocks/Listing'
import ToolTip from './components/ToolTip'
import LoadBar from './components/LoadBar'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

export default {
    name: 'App',
    components: {
        TitleBar,
        CtrlBar,
        SearchEngine,
        InfoBlock,
        Reading,
        Listening,
        Speaking,
        Writing,
        Listing,
        ToolTip,
        LoadBar
    },
    computed: {
        ...mapState(['route']),
        ...mapState('searchengine', ['focus']),
        ...mapState('tooltip', ['loading', 'display', 'info']),
        ...mapState('skipbox', ['lock']),
        ...mapGetters('routing',
            ['indexFocus', 'indexList', 'indexPos', 'contentPos', 'position', 'num']
        ),
        tipWidth () {
            return `width: ${13 * this.info.length + 20}px;
                margin-left: ${0.5 * this.clientWidth - 6.5 * this.info.length - 10}px;`
        },
        clientWidth () {
            return document.documentElement.clientWidth
        }
    },
    methods: {
        ...mapMutations(['setUser']),
        ...mapMutations('listing', ['setList', 'setData']),
        ...mapActions('sketch', ['initList', 'releaseItem']),
        ...mapActions('reading', ['initReading']),
        ...mapActions('listening', ['initListening']),
        ...mapActions('speaking', ['initSpeaking']),
        ...mapActions('writing', ['initWriting']),
        ...mapActions('listing', ['initListing', 'getFocus', 'newItem', 'dropItem']),
        ...mapActions('routing', ['indexScroll', 'contentScroll', 'positionChange']),
        indexListScroll: function () {
            this.indexScroll(this.$refs.indexList.scrollTop)
        },
        contentPageScroll: function () {
            this.contentScroll(this.$refs.contentPage.scrollTop)
        },
        contentPageUpdate: function () {
            this.$refs.contentPage.scrollTop = this.contentPos
        }
    },
    created: function () {
        this.initListing()
        this.initReading()
        this.initListening()
        this.initSpeaking()
        this.initWriting()
        this.initList()
    },
    mounted: function () {
        if (!!ipcRenderer) {
            ipcRenderer.on('set_index', (event, data) => {
                if (data.user != null)
                    this.setUser(data.user)
                this.setList(data.list)
                this.getFocus(data.focus)
            })
            ipcRenderer.on('set_item', (event, data) => { this.setData(data) })
            ipcRenderer.on('set_event', (event, val) => {
                if (val > 0)
                    this.getFocus(val)
                else if (val === -1)
                    this.newItem()
                else if (val === -2)
                    this.dropItem()
                else if (val === -3)
                    this.releaseItem()
            })
        }
        document.onkeydown = () => {
            if (window.event.keyCode == 27)
                ipcRenderer.send('main-unmaximize')
            else if (this.loading < 2 && !this.focus && this.position >= 0 && window.event.keyCode == 37)
                this.positionChange((this.position + this.num - 1) % this.num)
            else if (this.loading < 2 && !this.focus && this.position >= 0 && window.event.keyCode == 39)
                this.positionChange((this.position + 1) % this.num)
        }
    },
    updated: function () {
        this.$refs.indexList.scrollTop = this.indexPos
        this.$refs.contentPage.scrollTop = this.contentPos
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

#app {
    position: relative;
    width: 100%;
    height: 100%;
}

#titleBar {
    position: absolute;
    width: 50px;
    height: 100%;
    background-color: #2e2e2e;
    -webkit-app-region: drag;
}

#cataLog {
    position: absolute;
    margin-left: 50px;
    width: 250px;
    height: 100%;
    border-right: 1px solid #cccccc;
}

#searchEngine {
    position: absolute;
    width: 100%;
    height: 70px;
}

#indexList {
    position: absolute;
    width: 100%;
    height: calc(100vh - 70px);
    margin-top: 70px;
    overflow-y: auto;
    overflow-x: hidden;
}

#indexList::-webkit-scrollbar {
    width: 0;
}

#webPage {
    position: absolute;
    margin-left: 301px;
    width: calc(100vw - 301px);
    height: 100%;
    background-color: white;
}

#ctrlBar {
    position: absolute;
    width: 100%;
    height: 31px;
    background-color: #f2f2f2;
    -webkit-app-region: drag;
}

#contentPage {
    position: absolute;
    width: 100%;
    height: calc(100vh - 31px);
    margin-top: 31px;
    overflow-y: auto;
    overflow-x: hidden;
}

#contentPage::-webkit-scrollbar {
    width: 8px;
}

.emptyPage {
    width: 100%;
    height: 100%;
}

.svgBkg {
    width: 400px;
    height: 400px;
    margin-left: calc(50vw - 350px);
    margin-top: calc(50vh - 225px);
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
    height: calc(100vh - 31px);
    margin-top: 31px;
}

.skipBox {
    position: absolute;
    z-index: 5;
    width: 100%;
    height: calc(100vh - 31px);
    margin-top: 31px;
}
</style>
