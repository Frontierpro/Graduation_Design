<template>
    <div class="body">
        <div class="head">{{
            title.length > 1 ? title[0][0] :
            text.length > 0 ? 'Integrated Speaking' : 'Independent Speaking'
        }}</div>
        <div :class="{
            'pseudoHead': true, 'independent': text.length === 0, 'integrated': text.length > 0
        }"></div>
        <Audio :src="audioSrc" v-if="text.length > 0" />
        <div class="pseudoHead" v-if="text.length > 0"></div>

        <div v-if="title.length > 1">
            <p class="section" v-for="each in title[2]" :key="each">{{ each }}</p>
        </div>
        <div v-else>
            <p class="section" v-for="each in title[0]" :key="each">{{ each }}</p>
        </div>

        <div v-if="title.length > 1">
            <p class="section"><strong>Reading Text :</strong></p>
            <p class="section" v-for="each in title[1]" :key="each">{{ each }}</p>
        </div>
        <p class="section" v-if="text.length > 0"><strong>Listening Text :</strong></p>
        <p class="section" v-for="txt in text" :key="txt">{{ txt }}</p>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Speaking',
    computed: {
        ...mapState('speaking', ['title', 'text', 'audioSrc'])
    },
    updated: function () {
        this.$emit('update')
    }
}
</script>

<style scoped>
.head {
    position: fixed;
    background-color: white;
    width: calc(100vw - 380px);
    height: 70px;
    line-height: 70px;
    margin: 0;
    color: cornflowerblue;
    font-size: 18px;
    font-weight: 550;
    text-align: left;
    text-overflow: ellipsis;
}

.pseudoHead {
    width: 100%;
    height: 50px;
}

.independent {
    height: 60px;
}

.integrated {
    height: 70px;
}

.body {
    padding-left: 40px;
    padding-right: 40px;
}

.section {
    font-size: 14px;
    text-align: justify;
}
</style>
