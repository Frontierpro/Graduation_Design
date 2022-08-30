import Vue from 'vue'
import Vuex from 'vuex'

import titlebar from './modules/titlebar'
import ctrlbar from './modules/ctrlbar'
import searchengine from './modules/searchengine'
import routing from './modules/routing'
import reading from './modules/reading'
import listening from './modules/listening'
import speaking from './modules/speaking'
import writing from './modules/writing'
import listing from './modules/listing'
import tooltip from './modules/tooltip'
import skipbox from './modules/skipbox'
import sketch from './modules/sketch'
import result from './modules/result'
import ajax from './modules/ajax'

Vue.use(Vuex)

export default new Vuex.Store ({
    modules: {
        titlebar: titlebar,
        ctrlbar: ctrlbar,
        searchengine: searchengine,
        routing: routing,
        reading: reading,
        listening: listening,
        speaking: speaking,
        writing: writing,
        listing: listing,
        tooltip: tooltip,
        skipbox: skipbox,
        sketch: sketch,
        result: result,
        ajax: ajax
    },
    state: () => ({
        user: '',
        route: 'listing',
        mute: false,
        vol: 0.57
    }),
    mutations: {
        setUser (state, val) {
            state.user = val
        },
        routeChange (state, val) {
            state.route = val
        },
        muteChange (state, val) {
            state.mute = val
        },
        volChange (state, val) {
            state.vol = val
        }
    }
})
