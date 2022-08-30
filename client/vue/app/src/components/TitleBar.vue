<template>
    <div>
        <SvgIcon class="svgSym" iconName="logo" />
        <div class="iconBtn" @click="routeChange('reading')">
            <SvgIcon class="svgIcon" :iconName="iconR" />
        </div>
        <div class="iconBtn" @click="routeChange('listening')">
            <SvgIcon class="svgIcon" :iconName="iconL" />
        </div>
        <div class="iconBtn" @click="routeChange('speaking')">
            <SvgIcon class="svgIcon" :iconName="iconS" />
        </div>
        <div class="iconBtn" @click="routeChange('writing')">
            <SvgIcon class="svgIcon" :iconName="iconW" />
        </div>
        <div class="iconBtn" @click="routeChange('listing')">
            <SvgIcon class="svgIcon" :iconName="iconP" />
        </div>
        <div :class="{'divBtn': true, 'active': active}"
        @mouseover="mouseOver" @mouseout="mouseOut"
        @mousedown="mouseDown" @mouseup="create" @mouseleave="mouseUp">
            <SvgIcon class="svgBtn" :iconName="iconN" />
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: "TitleBar",
    computed: {
        ...mapState('titlebar', ['iconN', 'active']),
        ...mapGetters('titlebar', ['iconR', 'iconL', 'iconS', 'iconW', 'iconP'])
    },
    methods: {
        ...mapMutations(['routeChange']),
        ...mapMutations('titlebar', ['mouseOver', 'mouseOut', 'mouseDown', 'mouseUp']),
        ...mapActions('titlebar', ['create'])
    }
}
</script>

<style scoped>
.svgSym {
    width: 40px;
    height: 40px;
    margin-left: 5px;
    margin-top: 40px;
    margin-bottom: 10px;
}

.svgIcon {
    width: 24px;
    height: 24px;
    margin-left: 12px;
    margin-top: 15px;
    cursor: pointer;
}

.iconBtn {
    -webkit-app-region: no-drag;
}

.divBtn {
    width: 36px;
    height: 36px;
    margin-left: 7px;
    margin-top: calc(100vh - 385px);
    border-radius: 18px;
    -webkit-app-region: no-drag;
}

.active {
    box-shadow: coral 0 0 5px;
}

.svgBtn {
    width: 36px;
    height: 36px;
    cursor: pointer;
}
</style>
