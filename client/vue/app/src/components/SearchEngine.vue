<template>
    <div class="searchEngine">
        <input type="text" spellcheck="false" :placeholder="placeHolder" v-model="textInput"
        :disabled="disAble" @keyup.enter="search" @focus="getFocus" @blur="loseFocus" />
        <span :class="{'active': active, 'trigger': trigger}"
        @mouseover="mouseOver" @mouseout="mouseOut"
        @mousedown="mouseDown" @mouseup="search" @mouseleave="mouseUp">
            <SvgIcon class="svgIcon" :iconName="iconName" />
        </span>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
const ipcRenderer = !!window.require ? window.require('electron').ipcRenderer : null

export default {
    name: 'SearchEngine',
    computed: {
        ...mapState(['route']),
        ...mapState('searchengine', ['active', 'trigger']),
        ...mapGetters('searchengine', ['disAble', 'searchText']),
        placeHolder () {
            return this.route === 'listing' ? 'fetch update ...' : 'search engine ...'
        },
        iconName () {
            return this.route === 'listing' ? 'reload' : 'search'
        },
        textInput: {
            get () { return this.searchText },
            set (val) { this.searchInput(val) }
        }
    },
    methods: {
        ...mapMutations('searchengine',
            ['mouseOver', 'mouseOut', 'mouseDown', 'mouseUp', 'getFocus', 'loseFocus']
        ),
        ...mapActions('searchengine', ['search', 'searchInput'])
    }
}
</script>

<style scoped>
.searchEngine {
    position: relative;
    width: 190px;
    height: 25px;
    background-color: #f2f2f2;
    margin-left: 30px;
    margin-top: 30px;
    font-size: 13px;
    border-radius: 3px;
}

input {
    position: absolute;
    width: 140px;
    height: 23px;
    padding-left: 10px;
    padding-right: 10px;
    outline: none;
    border: 0;
    background-color: transparent;
}

span {
    position: absolute;
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin-left: 165px;
    background-color: yellowgreen;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    cursor: pointer;
}

.active {
    box-shadow: yellowgreen 0 0 5px;
}

.trigger {
    background-color: #35AA53;
}

.svgIcon {
    width: 13px;
    height: 13px;
    margin-left: 6px;
    margin-top: 6px;
}
</style>
