<template>
    <div :class="{'infoBlock': true, 'focus': focus}" 
    @click="focusChange({'id': indexInfo.id, 'title': indexInfo.title})">
        <div :class="{
            'status': true, 'beginning': beginning, 'proceeding': proceeding, 'ending': ending
        }"></div>
        <span class="title">{{ indexInfo.title }}</span>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'InfoBlock',
    props: {
        indexInfo: { type: Object, required: true },
        indexFocus: { type: Number, required: true }
    },
    computed: {
        focus () { return this.indexInfo.id == this.indexFocus },
        beginning () { return this.indexInfo.status == 1 },
        proceeding () { return this.indexInfo.status == 2 },
        ending () { return this.indexInfo.status == 3 }
    },
    methods: {
        ...mapActions('routing', ['focusChange'])
    }
}
</script>

<style scoped>
.infoBlock {
    width: 100%;
    height: 25px;
    cursor: pointer;
    background-color: #f2f2f2;
}

.focus {
    background-color: #dddddd;
}

.status {
    position: absolute;
    margin-top: 8px;
    margin-left: 38px;
    width: 9px;
    height: 9px;
    background-color: #4586F3;
    border-radius: 5px;
}

.beginning {
    background-color: #FBBD06;
}

.proceeding {
    background-color: #35AA53;
}

.ending {
    background-color: #EB4334;
}

.title {
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 159px;
    margin-left: 55px;
    font-size: 13px;
    height: 25px;
    line-height: 25px;
    font-weight: 550;
}
</style>
