<template>
    <div class="ctrlBar">
        <div :class="{'ctrlBtn': true, 'leftBtn': true, 'leftActive': leftActive}"
        @mouseover="leftOver" @mouseout="leftOut" @mouseup="leftOut" @click="minimize">
            <SvgIcon class="svgIcon" :iconName="leftIcon" />
        </div>
        <div :class="{'ctrlBtn': true, 'rightBtn': true, 'rightActive': rightActive}"
        @mouseover="rightOver" @mouseout="rightOut" @click="quit">
            <SvgIcon class="svgIcon" :iconName="rightIcon" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'CtrlBar',
    computed: {
        ...mapState('ctrlbar', ['leftActive', 'rightActive', 'leftIcon', 'rightIcon'])
    },
    methods: {
        ...mapMutations('ctrlbar', ['leftOver', 'leftOut', 'rightOver', 'rightOut']),
        ...mapActions('ctrlbar', ['quit', 'minimize'])
    }
}
</script>

<style scoped>
.ctrlBar {
    position: relative;
}

.ctrlBtn {
    position: absolute;
    width: 31px;
    height: 31px;
    -webkit-app-region: no-drag;
}

.leftBtn {
    margin-left: 238px;
}

.rightBtn {
    margin-left: 269px;
}

.leftActive {
    background-color: #cccccc;
    cursor: pointer;
}

.rightActive {
    background-color: red;
    cursor: pointer;
}

.svgIcon {
    width: 13px;
    height: 13px;
    margin-left: 9px;
    margin-top: 9px;
}
</style>
