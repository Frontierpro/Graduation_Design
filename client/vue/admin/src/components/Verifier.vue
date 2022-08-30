<template>
    <div class="verifyContainer">
        <div class="btnContainer" :style="bkgWidth"></div>
        <span class="bkgText">{{ verifyText }}</span>
        <div class="verifyBtn" :style="marginLeft"
        @mousedown="touchStart" @mousemove="touchMove" @mouseup="touchEnd" @mouseleave="touchEnd">
            <span>>>></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Verifier',
    computed: {
        verifyText () {
            if (this.verifyStatus) 
                return '验证通过'
            return '拖动滑块验证'
        }
    },
    data () {
        return {
            verifyStatus: false,
            lock: true,
            startX: 0,
            marginLeft: 'margin-left: 0',
            bkgWidth: 'width: 51px'
        }
    },
    methods: {
        touchStart (e) {
            this.lock = false
            this.startX = e.clientX
        },
        touchMove (e) {
            if (!this.lock && !this.verifyStatus) {
                let moveX = e.clientX - this.startX <= 170 ? e.clientX - this.startX : 170
                if (moveX >= 0) {
                    this.marginLeft = 'margin-left: ' + moveX + 'px'
                    this.bkgWidth = `width: ${moveX + 51}px`
                    if (moveX == 170) {
                        this.verifyStatus = true
                        this.$store.commit('signin/signinVerify')
                    }
                }
            }
        },
        touchEnd (e) {
            this.lock = true
            if (!this.verifyStatus) {
                this.marginLeft = 'margin-left: 0',
                this.bkgWidth = 'width: 51px'
                this.startX = 0
            }
        }
    }
}
</script>

<style scoped>
.verifyContainer {
    position: relative;
    width: 74%;
    height: 35px;
    margin-left: 13%;
    margin-bottom: 15px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    background-color: #cccccc;
}

.btnContainer {
    position: absolute;
    z-index: 1;
    height: 35px;
    background-color: yellowgreen;
    border-radius: 5px;
}

span {
    display: block;
    width: 100%;
    height: 100%;
    line-height: 35px;
    font-weight: bold;
    text-align: center;
    color: #cccccc;
}

.bkgText {
    position: absolute;
    z-index: 2; 
    color: white;
}

.verifyBtn {
    position: absolute;
    z-index: 3;
    width: 52.5px;
    height: 35px;
    background-color: white;
    border-radius: 5px;
    cursor: pointer;
}
</style>
