<template>
    <div class="listenItem">
        <p class="pseudoHead"></p>

        <audio ref="relistenAudio" :src="relistenSrc"
        @loadedmetadata="relistenInit" @ended="relistenReset"></audio>
        <audio ref="listenAudio" :src="listenSrc"
        @loadedmetadata="listenInit" @ended="listenReset"></audio>
        <p class="caption">
            <span class="iconBtn" v-if="items[position].src_cnt > 2" @click="relistenStatusChange">
                <SvgIcon class="svgIcon" :iconName="relistenIcon" />
            </span>
            <strong>{{ items[position].caption[0] }}</strong>
            <br v-if="items[position].caption.length > 1" />
            <strong v-if="items[position].caption.length > 1">
                {{ items[position].caption[1] }}
            </strong>
            <span class="iconBtn" v-if="items[position].src_cnt > 1" @click="listenStatusChange">
                <SvgIcon class="svgIcon" :iconName="listenIcon" />
            </span>
        </p>

        <table v-if="items[position].option.length === 2 && items[position].option[0].length > 1"
        cellspacing="0" cellpadding="5">
            <tbody>
                <tr>
                    <td></td>
                    <td v-for="col in items[position].option[0]" :key="col" align="center">{{ col }}</td>
                </tr>
                <tr v-for="row in items[position].option[1]" :key="row">
                    <td>{{ row }}</td>
                    <td v-for="col in items[position].option[0]" :key="col" align="center">
                        <input type="checkbox" disabled="true" />
                    </td>
                </tr>
            </tbody>
        </table>
        <div v-else-if="items[position].answer.length === items[position].option.length">
            <div class="section" v-for="option in items[position].option" :key="option">
                <p class="sectionText">{{ option }}</p>
            </div>
        </div>
        <div v-else-if="items[position].answer.length === 1">
            <div v-for="option in items[position].option" :key="option">
                <input class="zone" type="radio" disabled="true" />
                <p class="option">{{ option }}</p>
            </div>
        </div>
        <div v-else>
            <div v-for="option in items[position].option" :key="option">
                <input class="zone" type="checkbox" disabled="true" />
                <p class="option">{{ option }}</p>
            </div>
        </div>

        <p class="pseudoTail"></p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ListeningItem',
    props: {
        items: { type: Array, required: true },
        position: { type: Number, required: true },
        srcList: { type: Array, required: true }
    },
    data () {
        return {
            relistenStatus: false,
            listenStatus: false
        }
    },
    computed: {
        ...mapState(['mute', 'vol']),
        relistenIcon () { return this.relistenStatus ? 'relisten_pause' : 'relisten_play' },
        listenIcon () { return this.listenStatus ? 'listen_pause' : 'listen_play' },
        relistenSrc () {
            return this.items[this.position].src_cnt > 2 ? this.srcList[this.position][1] : ''
        },
        listenSrc () {
            return this.items[this.position].src_cnt > 1 ? this.srcList[this.position][0] : ''
        }
    },
    methods: {
        relistenStatusChange: function () {
            this.$refs.listenAudio.pause()
            this.listenReset()
            this.relistenStatus ? this.$refs.relistenAudio.pause() : this.$refs.relistenAudio.play()
            this.relistenStatus = !this.relistenStatus
        },
        listenStatusChange: function () {
            this.$refs.relistenAudio.pause()
            this.relistenReset()
            this.listenStatus ? this.$refs.listenAudio.pause() : this.$refs.listenAudio.play()
            this.listenStatus = !this.listenStatus
        },
        relistenInit: function () {
            this.relistenStatus = false
            this.$refs.relistenAudio.volume = this.mute ? 0 : this.vol
        },
        listenInit: function () {
            this.listenStatus = false
            this.$refs.listenAudio.volume = this.mute ? 0 : this.vol
        },
        relistenReset: function () {
            this.$refs.relistenAudio.currentTime = 0
            this.relistenStatus = false
        },
        listenReset: function () {
            this.$refs.listenAudio.currentTime = 0
            this.listenStatus = false
        }
    }
}
</script>

<style scoped>
.listenItem {
    font-size: 14px;
    text-align: justify;
}

.pseudoHead {
    width: 100%;
    height: 35px;
    margin: 0;
}

.pseudoTail {
    width: 100%;
    height: 55px;
    margin: 0;
}

.iconBtn {
    width: 14px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    display: inline-block;
    margin-top: 2px;
}

.svgIcon {
    width: 14px;
    height: 14px;
    cursor: pointer;
}

.caption {
    line-height: 28px;
}

.zone {
    margin-left: 0;
    float: left;
}

.option {
    margin-top: 0;
    margin-left: 25px;
}

.tab {
    text-align: left;
}

table {
    border: 0.5px solid #cccccc;
    text-align: left;
    width: 100%;
}

td {
    border: 0.5px solid #cccccc;
}

.section {
    border: 1px solid #666666;
    margin-top: 15px;
    padding: 5px;
}

.sectionText {
    margin: 0;
}
</style>
