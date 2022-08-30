<template>
    <div>
        <div class="card">
            <div class="ctrlBar">
                <div :class="{'ctrlBtn': true, 'closeActive': closeActive}"
                @click="setLock({'lock': false, 'title': '', 'event': 0})"
                @mouseover="mouseOver('close')" @mouseout="mouseOut('close')" @mouseup="mouseOut('close')">
                    <SvgIcon class="svgIcon" :iconName="iconName" />
                </div>
            </div>
            <span class="tip"><strong>{{ title }}</strong></span>
            <div class="itemBar">
                <span class="itemBtn leftBtn" @click="setLock({'lock': false, 'title': '', 'event': 0})">
                    取 消
                </span>
                <span :class="{
                    'itemBtn': true, 'rightBtn': true, 'hover': hover, 'confirmActive': confirmActive
                }" @mouseover="mouseOver('confirm')" @mouseout="mouseOut('confirm')"
                @mousedown="mouseDown" @mouseup="mouseUp" @mouseleave="mouseLeave">
                    确 认
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: "SkipBox",
    computed: {
        ...mapState('skipbox', ['title', 'iconName', 'closeActive', 'confirmActive', 'hover'])
    },
    methods: {
        ...mapMutations('skipbox', ['setLock', 'mouseOver', 'mouseOut', 'mouseDown', 'mouseLeave']),
        ...mapActions('skipbox', ['mouseUp'])
    }
}
</script>

<style scoped>
.card {
    width: 300px;
    height: 140px;
    margin-left: calc(50vw - 150px);
    margin-top: calc(50vh - 101px);
    background-color: #f2f2f2;
    border-radius: 5px;
    box-shadow: #aaaaaa 0 0 5px;
}

.ctrlBar {
    width: 100%;
    height: 31px;
}

.ctrlBtn {
    float: right;
    width: 31px;
    height: 100%;
    cursor: pointer;
}

.closeActive {
    background-color: red;
}

.svgIcon {
    width: 13px;
    height: 13px;
    margin-left: 9px;
    margin-top: 9px;
}

.tip {
    font-size: 16px;
    margin-left: 30px;
    height: 24px;
    line-height: 24px;
    display: inline-block;
    color: cornflowerblue;
}

.itemBar {
    position: relative;
    width: 100%;
    height: 24px;
    margin-top: 39px;
}

.itemBtn {
    position: absolute;
    display: inline-block;
    color: white;
    width: 70px;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    font-weight: 550;
    text-align: center;
    border-radius: 13px;
    cursor: pointer;
}

.leftBtn {
    background-color: #cccccc;
    margin-left: 30px;
}

.rightBtn {
    background-color: coral;
    margin-left: 200px;
}

.hover {
    box-shadow: coral 0 0 5px;
}

.confirmActive {
    background-color: #EB4334;
}
</style>
