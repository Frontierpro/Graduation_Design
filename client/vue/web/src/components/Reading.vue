<template>
    <div>
        <div class="container left">
            <p class="caption"><strong>{{ title }}</strong></p>
            <p class="section" v-for="txt in text" :key="txt" v-html="txt"></p>
        </div>
        <div class="container right">
            <div class="ctrlBar">
                <span class="btn back" @click="setLock(true)">submit</span>
            </div>
            <div class="ctrlBar bottom">
                <span :class="{'btn': true, 'front': true, 'disable': position === 0}"
                @click="posChange(position - 1)">
                    back
                </span>
                <span :class="{'btn': true, 'back': true, 'disable': position === items.length - 1}"
                @click="posChange(position + 1)">
                    next
                </span>
                <span class="pageNum"><strong>{{ position + 1 }}</strong></span>
            </div>

            <div class="dummy"></div>

            <p v-if="items[position].answer.search(',') === -1 && items[position].answer.length === 3">
                Directions: An introductory sentence for a brief summary of the passage is provided below.
                Complete the summary by selecting the THREE answer choices that
                express the most important ideas in the passage.
                Some sentences do not belong in the summary because
                they express that are not presented in the passage or are minor ideas in the passage.
                This question is worth 2 points.
            </p>
            <p v-else-if="items[position].highlight.length === 4">
                Look at the four squares [■] that indicate
                where the following sentence could be added to the passage.
                Where would the sentence best fit?
            </p>
            <div v-for="(caption, index) in items[position].caption" :key="caption">
                <p v-if="items[position].answer.search(',') === -1" class="title">{{ caption }}</p>
                <p v-else-if="index === 0">{{ caption }}</p>
                <div v-else>
                    <p class="title">{{ caption }}</p>
                    <input />
                </div>
            </div>

            <div v-if="items[position].answer.search(',') >= 0">
                <div class="optionBox" v-for="option in items[position].option" :key="option">
                    <p class="optionText">{{ option }}</p>
                </div>
            </div>
            <div v-else-if="items[position].answer.length === 1">
                <div v-for="(option, index) in items[position].option" :key="option">
                    <input class="zone" name="single" type="radio"
                    :value="String.fromCharCode(65 + index)" v-model="pick" />
                    <p class="option">{{ option }}</p>
                </div>
            </div>
            <div v-else-if="items[position].answer.length === 2">
                <div v-for="(option, index) in items[position].option" :key="option">
                    <input class="zone" type="checkbox"
                    :value="String.fromCharCode(65 + index)" v-model="check" />
                    <p class="option">{{ option }}</p>
                </div>
            </div>
            <div v-else>
                <div :class="{'optionBox': true, 'textSelect': match(index) >= 0}"
                v-for="(option, index) in items[position].option" :key="option" @click="textPick(index)">
                    <p class="optionText">{{ option }}</p>
                </div>
            </div>

            <div class="dummy"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Reading',
    computed: {
        ...mapState('reading', ['title', 'items', 'position', 'answer', 'cache']),
        ...mapGetters('reading', ['text']),
        pick: {
            get () { return this.cache },
            set (val) { this.update(val) }
        },
        check: {
            get () { return this.cache.split('') },
            set (val) { this.update(val.sort().join('')) }
        },
        match () { return function (val) {return this.cache.indexOf(String.fromCharCode(65 + val))} }
    },
    methods: {
        ...mapMutations('skipbox', ['setLock']),
        ...mapMutations('reading', ['posChange']),
        ...mapActions('reading', ['update']),
        select: function (val) { this.update(String.fromCharCode(65 + val)) },
        textPick: function (val) {
            if (this.match(val) < 0) {
                let arr = this.cache.split('')
                arr.push(String.fromCharCode(65 + val))
                this.update(arr.sort().join(''))
            }
            else
                this.update(this.cache.slice(0, this.match(val)) + this.cache.slice(this.match(val) + 1))
        }
    },
    mounted: function () { window.select = this.select }
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

p {
    margin: 20px;
    text-align: justify;
}

input {
    margin-left: 20px;
}

.caption {
    text-align: center;
    color: cornflowerblue;
    font-size: 24px;
}

.ctrlBar {
    position: fixed;
    margin-left: 1px;
    width: calc(50vw - 11px);
    height: 60px;
    background-color: white;
}

.bottom {
    margin-top: calc(100vh - 60px);
}

.pageNum {
    position: absolute;
    width: calc(50vw - 179px);
    margin-left: 89px;
    height: 60px;
    line-height: 60px;
    text-align: center;
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
    margin-top: 18px;
    border-radius: 2px;
    cursor: pointer;
}

.btn:hover {
    background-color: #35AA53;
}

.disable {
    background-color: #cccccc;
    cursor: default;
}

.disable:hover {
    background-color: #cccccc;
}

.front {
    margin-left: 19px;
}

.back {
    margin-left: calc(50vw - 89px);
}

.dummy {
    width: 100%;
    height: 50px;
}

.title {
    font-weight: 550;
}

.zone {
    margin-left: 20px;
    float: left;
}

.option {
    margin-top: 0;
    margin-left: 45px;
}

.optionBox {
    border: 1px solid #666666;
    margin: 20px;
    padding: 5px;
    cursor: pointer;
}

.optionText {
    margin: 0;
}

.textSelect {
    border: 1px solid coral;
    color: coral;
}
</style>
