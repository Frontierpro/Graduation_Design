<template>
    <div>
        <div class="page" v-if="audioLink.length > 0">
            <div class="toolBox">
                <span class="toolTitle"><strong>Listening Material :</strong></span>
                <Audio class="tool" :src="audioLink" @end="reset" />
                <span class="toolBtn" @click="reset">next</span>
            </div>
            <p class="section" v-if="title.length > 1"><strong>Reading Material :</strong></p>
            <p class="section" v-else><strong>No Reading Material ...</strong></p>
            <p class="section" v-for="each in title[1]" :key="each">{{ each }}</p>
            <div class="dummy"></div>
        </div>
        <div class="page" v-else>
            <div class="toolBox">
                <span class="toolTitle"><strong>Recorder Zone :</strong></span>
                <Recorder class="tool" :full="duration" @end="update" />
            </div>
            <div v-if="title.length > 1">
                <p class="section" v-for="each in title[2]" :key="each">{{ each }}</p>
            </div>
            <div v-else>
                <p class="section" v-for="each in title[0]" :key="each">{{ each }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
    name: 'Speaking',
    computed: {
        ...mapState('speaking', ['status', 'text', 'title', 'duration', 'audioSrc']),
        audioLink () { return this.status ? this.audioSrc : '' }
    },
    methods: {
        ...mapMutations('speaking', ['setStatus']),
        ...mapActions('speaking', ['update']),
        reset: function () { this.setStatus(false) }
    }
}
</script>

<style scoped>
.page {
    overflow-y: auto;
}

.toolBox {
    position: fixed;
    width: calc(100vw - 10px);
    height: 44px;
    margin-top: calc(100vh - 44px);
    background-color: white;
}

.toolTitle {
    position: absolute;
    height: 44px;
    line-height: 44px;
    margin-left: 20px;
    font-size: 14px;
}

.tool {
    position: absolute;
    width: 450px;
    height: 44px;
    margin-left: 160px;
    background-color: white;
    border-radius: 4px;
    font-size: 13px;
}

.toolBtn {
    position: absolute;
    display: inline-block;
    background-color: yellowgreen;
    color: white;
    text-align: center;
    font-weight: 550;
    width: 70px;
    height: 24px;
    line-height: 24px;
    margin-top: 10px;
    margin-left: calc(100vw - 90px);
    border-radius: 2px;
    cursor: pointer;
}

.dummy {
    height: 50px;
}

.section {
    font-size: 14px;
    text-align: justify;
    margin-left: 20px;
    margin-right: 20px;
}
</style>
