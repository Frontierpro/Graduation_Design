<template>
    <div>
        <div class="head">
            <ToggleButton :selection="selection" leftText="TEXT" rightText="ITEM"
            @selectionChange="selectionChange" />
        </div>
        <div class="pseudoHead"></div>
        <div v-if="selection === 'left'" class="body">
            <p class="caption">{{ title }}</p>
            <p class="section" v-for="txt in text" :key="txt">{{ txt }}</p>
        </div>
        <div v-else-if="selection === 'right'" class="body">
            <ItemBar :num="items.length" :position="position" @positionChange="positionChange" />
            <div class="foot">
                <strong>Answer : <span class="answer">{{ items[position].answer }}</span></strong>
            </div>
            <ReadingItem :text="text" :items="items" :position="position" />
        </div>
    </div>
</template>

<script>
import ReadingItem from './ReadingItem'
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'Reading',
    components: {
        ReadingItem
    },
    computed: {
        ...mapState('reading', ['title', 'text', 'items', 'selection', 'position'])
    },
    methods: {
        ...mapMutations('reading', ['selectionChange', 'positionChange'])
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
    width: calc(100vw - 340px);
    height: 70px;
}

.pseudoHead {
    width: 100%;
    height: 70px;
}

.body {
    padding-left: 40px;
    padding-right: 40px;
}

.caption {
    margin-top: 0;
    color: cornflowerblue;
    font-size: 22px;
    font-weight: 550;
    text-align: center;
}

.section {
    font-size: 14px;
    text-align: justify;
}

.foot {
    position: fixed;
    background-color: white;
    color: cornflowerblue;
    width: calc(100vw - 380px);
    height: 40px;
    padding-top: 15px;
    font-size: 14px;
    margin-top: calc(100vh - 156px);
}

.answer {
    color: #666666
}
</style>
