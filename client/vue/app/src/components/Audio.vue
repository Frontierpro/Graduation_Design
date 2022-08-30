<template>
    <div class="audio">
        <audio ref="audio" :src="src"
        @loadedmetadata="audioInit" @timeupdate="audioUpdate" @ended="audioReset"></audio>
        <div class="container" ref="container">
            <div class="leftContainer">
                <div class='pauseBtn' @click="statusChange">
                    <SvgIcon class="pauseSvg" :iconName="pauseIcon" />
                </div>

                <span class="timer leftTimer">{{ timeFormat(curr) }}</span>
                <span class="timer rightTimer">{{ timeFormat(full) }}</span>

                <span class="track pcTrack"></span>
                <span class="track pcTrack pcBar" :style="pcWidth"></span>
                <span class="block" :style="pcLeft"></span>
                <span class="track pcTrack ctrl" @click="pcReset"></span>
            </div>

            <div class="rightContainer">
                <div class='volBtn' @click="volumeChange">
                    <SvgIcon class="volSvg" :iconName="volIcon" />
                </div>

                <span class="track volTrack"></span>
                <span class="track volTrack volBar" :style="volWidth"></span>
                <span class="block" :style="volLeft"></span>
                <span class="track volTrack ctrl" @click="volReset"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Audio',
    props: {
        src: { type: String, required: true }
    },
    data () {
        return {
            status: false,
            curr: 0,
            full: 0
        }
    },
    computed: {
        ...mapState(['mute', 'vol']),
        pauseIcon () { return this.status ? 'pause' : 'play' },
        volIcon () { return this.mute ? 'mute' : 'unmute' },
        pcWidth () { return `width: ${this.curr / this.full * 250}px` },
        pcLeft () { return `margin-left: ${73 + this.curr / this.full * 250}px` },
        volWidth () { return this.mute ? `width: 0px` : `width: ${this.vol * 70}px` },
        volLeft () { return this.mute ? 'margin-left: 23px' : `margin-left: ${23 + this.vol * 70}px` }
    },
    methods: {
        ...mapMutations(['volChange', 'muteChange']),
        statusChange: function () {
            this.status ? this.$refs.audio.pause() : this.$refs.audio.play()
            this.status = !this.status
        },
        volumeChange: function () {
            if (this.mute) {
                this.$refs.audio.volume = this.vol
                this.vol === 0 ? this.muteChange(true) : this.muteChange(false)
            }
            else {
                this.$refs.audio.volume = 0
                this.muteChange(true)
            }
        },
        audioInit: function () {
            this.full = this.$refs.audio.duration
            this.status = false
            this.$refs.audio.volume = this.mute ? 0 : this.vol
        },
        audioUpdate: function () {
            this.curr = typeof(this.$refs.audio) === 'undefined' ? 0 : this.$refs.audio.currentTime
        },
        audioReset: function () {
            this.$refs.audio.currentTime = 0
            this.status = false
        },
        pcReset: function (e) {
            this.$refs.audio.currentTime = (e.clientX - 428) / 250 * this.full
        },
        volReset: function (e) {
            let vol = (e.clientX - this.$refs.container.offsetWidth - 253) / 70
            vol = vol > 1 ? 1 : vol < 0 ? 0 : vol
            this.$refs.audio.volume = vol
            this.volChange(vol)
            vol === 0 ? this.muteChange(true) : this.muteChange(false)
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
.audio {
    position: fixed;
    width: calc(100vw - 380px);
    height: 50px;
    background-color: white;
}

.container {
    position: relative;
    height: 35px;
    background-color: #f2f2f2;
    border-radius: 4px;
    font-size: 13px;
}

.leftContainer {
    position: absolute;
    width: 400px;
    height: 100%;
    margin-left: 10px;
}

.rightContainer {
    position: absolute;
    width: 115px;
    height: 100%;
    margin-left: calc(100vw - 495px);
}

.pauseBtn {
    position: absolute;
    width: 25px;
    height: 25px;
    margin-top: 5px;
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

.volBtn {
    position: absolute;
    width: 25px;
    height: 25px;
    margin-top: 5px;
}

.volSvg {
    width: 17px;
    height: 17px;
    margin-left: 4px;
    margin-top: 4px;
    cursor: pointer;
}

.timer {
    position: absolute;
    height: 35px;
    line-height: 35px;
}

.leftTimer {
    margin-left: 35px;
}

.rightTimer {
    margin-left: 340px;
}

.track {
    position: absolute;
    height: 5px;
    margin-top: 15px;
    background-color: #aaaaaa;
    border-radius: 3px;
    z-index: 1;
}

.block {
    position: absolute;
    height: 9px;
    width: 9px;
    margin-top: 13px;
    background-color: coral;
    border-radius: 5px;
    z-index: 3;
}

.ctrl {
    background-color: rgba(255, 255, 255, 0);
    cursor: pointer;
    z-index: 4;
}

.pcTrack {
    width: 250px;
    margin-left: 78px;
}

.pcBar {
    background-color: coral;
    z-index: 2;
}

.volTrack {
    width: 70px;
    margin-left: 30px;
}

.volBar {
    background-color: coral;
    z-index: 2;
}
</style>
