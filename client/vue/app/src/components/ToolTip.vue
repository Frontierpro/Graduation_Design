<template>
    <div>
        <span>{{ info }}</span>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ToolTip',
    computed: {
        ...mapState('tooltip', ['info'])
    }
}
</script>

<style scoped>
div {
    background-color: #2e2e2e;
    opacity: 0.85;
    border-radius: 2px;
    font-weight: bold;
    text-align: center;
    color: red;
}

span {
    height: 25px;
    line-height: 25px;
}
</style>
