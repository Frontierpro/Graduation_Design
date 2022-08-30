<template>
    <div>
        <div class="container left">
            <div class="toolBox" v-if="audioLink.length > 0">
                <span class="toolTitle"><strong>Listening Material :</strong></span>
                <Audio class="tool" :src="audioLink" @end="stop" />
            </div>
            <p class="section" v-if="title.length > 1"><strong>Reading Material :</strong></p>
            <p class="section" v-for="each in title[0]" :key="each">{{ each }}</p>
            <div class="dummy"></div>
        </div>
        <div class="container right">
            <div class="ctrlBar top">
                <span class="btn back" @click="setLock(true)">submit</span>
            </div>
            <div class="dummy"></div>
            <p class="section" v-show="title.length > 1" v-for="each in title[1]" :key="each">
                {{ each }}
            </p>
            <textarea v-model="textChange" />
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Writing',
    computed: {
        ...mapState('writing', ['status', 'title', 'text', 'audioSrc', 'answer']),
        audioLink () { return this.status ? this.audioSrc : '' },
        textChange: {
            get () { return this.answer },
            set (val) { this.update(val) }
        }
    },
    methods: {
        ...mapMutations('skipbox', ['setLock']),
        ...mapMutations('writing', ['setStatus']),
        ...mapActions('writing', ['update']),
        stop: function () { this.setStatus(false) }
    }
}
</script>

<style scoped>
.container {
    position: absolute;
    width: 50%;
    height: 100%;
    overflow-y: auto;
    font-size: 14px;
}

.left {
    border-right: 1px solid #cccccc;
}

.right {
    margin-left: 50vw;
}

.toolBox {
    position: fixed;
    width: 50vh;
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

.dummy {
    height: 50px;
}

.section {
    font-size: 14px;
    text-align: justify;
    margin-left: 20px;
    margin-right: 20px;
}

textarea {
    width: calc(50vw - 39px);
    height: calc(100vh - 200px);
    margin-left: 19px;
    margin-top: 20px;
    resize: none;
    text-align: justify;
}

.ctrlBar {
    position: fixed;
    margin-left: 1px;
    width: calc(50vw - 11px);
    height: 60px;
    background-color: white;
}

.btn {
    position: absolute;
    display: inline-block;
    background-color: yellowgreen;
    color: white;
    text-align: center;
    font-weight: 550;
    width: 70px;
    height: 24px;
    line-height: 24px;
    margin-left: calc(50vw - 89px);
    margin-top: 18px;
    border-radius: 2px;
    cursor: pointer;
}

.btn:hover {
    background-color: #35AA53;
}
</style>
