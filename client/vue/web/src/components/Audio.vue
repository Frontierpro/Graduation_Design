<template>
    <div>
        <audio ref="audio" :src="src"
        @loadedmetadata="audioInit" @timeupdate="audioUpdate" @ended="audioEnd"></audio>
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
export default {
    name: 'Audio',
    props: {
        src: { type: String, required: true }
    },
    data () {
        return { status: false, curr: 0, full: 0 }
    },
    computed: {
        pauseIcon () { return this.status ? 'pause' : 'play' },
        pcWidth () { return `width: ${this.curr / this.full * 200}px` },
        pcLeft () { return `margin-left: ${85 + this.curr / this.full * 200}px` }
    },
    methods: {
        statusChange: function () {
            if (!this.status) {
                this.$refs.audio.play()
                this.status = true
            }
        },
        audioInit: function () {
            this.full = this.$refs.audio.duration
            this.status = false
        },
        audioUpdate: function () {
            this.curr = typeof(this.$refs.audio) === 'undefined' ? 0 : this.$refs.audio.currentTime
        },
        audioEnd: function () {
            this.$emit('end')
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
</style>
