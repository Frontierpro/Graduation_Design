<template>
    <div>
        <Sketch v-if="status == 1" />
        <Result v-else />
    </div>
</template>

<script>
import Sketch from '../pages/Sketch'
import Result from '../pages/Result'

import { mapGetters } from 'vuex'

export default {
    name: 'Listing',
    components: {
        Sketch,
        Result
    },
    computed: {
        ...mapGetters('listing', ['status'])
    },
    updated: function () {
        this.$emit('update')
    }
}
</script>

<style scoped>
</style>
