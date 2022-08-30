<template>
    <div>
        <div :class="{'ctrlBtn': true, 'rightActive': active.right}"
        @mouseover="mouseOver('right')" @mouseout="mouseOut('right')" @click="quit">
            <SvgIcon class="svgIcon" :iconName="icon.right" />
        </div>
        <div :class="{'ctrlBtn': true, 'leftActive': active.middle}"
        @mouseover="mouseOver('middle')" @mouseout="mouseOut('middle')" @click="maximize">
            <SvgIcon class="svgIcon" :iconName="icon.middle" />
        </div>
        <div :class="{'ctrlBtn': true, 'leftActive': active.left}" @click="minimize"
        @mouseover="mouseOver('left')" @mouseout="mouseOut('left')" @mouseup="mouseOut('left')">
            <SvgIcon class="svgIcon" :iconName="icon.left" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'CtrlBar',
    computed: {
        ...mapState('ctrlbar', ['active', 'icon'])
    },
    methods: {
        ...mapMutations('ctrlbar', ['mouseOver', 'mouseOut']),
        ...mapActions('ctrlbar', ['quit', 'maximize', 'minimize'])
    }
}
</script>

<style scoped>
.ctrlBtn {
    float: right;
    width: 31px;
    height: 100%;
    cursor: pointer;
    -webkit-app-region: no-drag;
}

.rightActive {
    background-color: red;
}

.leftActive {
    background-color: #cccccc;
}

.svgIcon {
    width: 13px;
    height: 13px;
    margin-left: 9px;
    margin-top: 9px;
}
</style>
