<template>
    <div>
        <SvgIcon class="svgIcon svgLeft" :iconName="iconLeft" />
        <SvgIcon class="svgIcon" :iconName="iconMiddle" />
        <SvgIcon class="svgIcon" :iconName="iconRight" />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'DivBar',
    computed: {
        ...mapGetters('divbar', ['iconLeft', 'iconMiddle', 'iconRight'])
    }
}
</script>

<style scoped>
.svgIcon {
    width: 12px;
    height: 31px;
}

.svgLeft {
    margin-left: 132px;
}
</style>
