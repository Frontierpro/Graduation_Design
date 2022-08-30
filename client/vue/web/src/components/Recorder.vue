<template>
    <div>
        <div class='pauseBtn' @click="statusChange">
            <SvgIcon class="pauseSvg" :iconName="pauseIcon" />
        </div>

        <span class="timer leftTimer">{{ timeFormat(curr) }}</span>
        <span class="timer rightTimer">{{ timeFormat(full) }}</span>

        <span class="track"></span>
        <span class="track bar" :style="pcWidth"></span>
        <span class="block" :style="pcLeft"></span>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Recorder from 'js-audio-recorder'

export default {
    name: 'Recorder',
    props: {
        full: { type: Number, required: true }
    },
    data () {
        return { lock: false, status: false, recorder: null, curr: 0 }
    },
    computed: {
        ...mapState(['name']),
        pauseIcon () { return this.status ? 'pause' : 'record' },
        pcWidth () { return `width: ${this.curr / this.full * 200}px` },
        pcLeft () { return `margin-left: ${85 + this.curr / this.full * 200}px` }
    },
    methods: {
        ...mapMutations('tooltip', ['throwTip']),
        statusChange: function () {
            if (!this.lock) {
                this.lock = true
                this.status ? null : this.recordStart()
            }
        },
        recordStart: function () {
            this.recorder = new Recorder({sampleBits: 8, sampleRate: 11025, numChannels: 1})
            Recorder.getPermission().then(() => {
                this.recorder.start()
                this.status = true
                this.lock = false
                let timer = setInterval(() => { this.curr += 0.01 }, 10)
                setTimeout(() => {
                    this.recordEnd()
                    clearInterval(timer)
                }, this.full * 1000)
            }, (error) => {
                this.throwTip('请给予网站麦克风获取权限')
                this.lock = false
            })
        },
        recordEnd: function () {
            this.recorder.pause()
            this.$emit('end', this.recorder.getWAVBlob())
            this.recorder.stop()
            this.recorder.destroy()
        },
        timeFormat: function (tmp) {
            let time = parseInt(tmp)
            let minute = ('0' + Math.floor(time / 60)).slice(-2)
            let second = ('0' + time % 60).slice(-2)
            return `${minute}:${second}`
        }
    }
}
</script>

<style scoped>
.pauseBtn {
    position: absolute;
    width: 25px;
    height: 25px;
    margin-top: 9.5px;
    margin-left: 10px;
    background-color: coral;
    border-radius: 13px;
    cursor: pointer;
}

.pauseSvg {
    width: 13px;
    height: 13px;
    margin-left: 6px;
    margin-top: 6px;
}

.timer {
    position: absolute;
    height: 44px;
    line-height: 44px;
}

.leftTimer {
    margin-left: 44px;
}

.rightTimer {
    margin-left: 300px;
}

.track {
    position: absolute;
    width: 200px;
    margin-left: 90px;
    height: 5px;
    margin-top: 19.5px;
    background-color: #aaaaaa;
    border-radius: 3px;
    z-index: 1;
}

.block {
    position: absolute;
    height: 9px;
    width: 9px;
    margin-top: 17.5px;
    background-color: coral;
    border-radius: 5px;
    z-index: 3;
}

.bar {
    background-color: coral;
    z-index: 2;
}

.title {
    width: 240px;
    margin-left: 350px;
    color: cornflowerblue;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
