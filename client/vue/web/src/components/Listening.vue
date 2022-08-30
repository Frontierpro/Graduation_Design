<template>
    <div>
        <div :class="{ctrlBar: true, bar: position === 0}">
            <span :class="{ctrlBtn: true, btn: position === 0}" @click="nextStep">{{ btnName }}</span>
        </div>
        <Audio class="audio" v-if="position === 0" :src="audioSrc" @end="posChange(1)" />
        <div v-else class="itemPage">
            <div class="dummy"></div>
            <p class="caption">
                <strong>{{ `${position}. ${items[position - 1].caption.join(' ').trim()}` }}</strong>
            </p>

            <table v-if="items[position - 1].option.length === 2 &&
            items[position - 1].option[0].length > 1" cellspacing="0" cellpadding="5">
                <tbody>
                    <tr>
                        <td></td>
                        <td v-for="col in items[position - 1].option[0]" :key="col" align="center">
                            {{ col }}
                        </td>
                    </tr>
                    <tr v-for="row in items[position - 1].option[1]" :key="row">
                        <td>{{ row }}</td>
                        <td v-for="col in items[position - 1].option[0]" :key="col" align="center">
                            <input type="checkbox" disabled="true" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else-if="items[position - 1].answer.length === items[position - 1].option.length">
                <div class="section" v-for="option in items[position - 1].option" :key="option">
                    <p class="sectionText">{{ option }}</p>
                </div>
            </div>
            <div v-else-if="items[position - 1].answer.length === 1">
                <div v-for="(option, index) in items[position - 1].option" :key="option">
                    <input class="zone" name="single" type="radio"
                    :value="String.fromCharCode(65 + index)" v-model="pick" />
                    <p class="option">{{ option }}</p>
                </div>
            </div>
            <div v-else>
                <div v-for="(option, index) in items[position - 1].option" :key="option">
                    <input class="zone" type="checkbox"
                    :value="String.fromCharCode(65 + index)" v-model="check" />
                    <p class="option">{{ option }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Listening',
    computed: {
        ...mapState('listening', ['title', 'items', 'position', 'audioSrc', 'cache']),
        btnName () { return this.position === this.items.length ? 'submit' : 'next' },
        pick: {
            get () { return this.cache },
            set (val) { this.update(val) }
        },
        check: {
            get () { return this.cache.split('') },
            set (val) { this.update(val.sort().join('')) }
        }
    },
    methods: {
        ...mapMutations('listening', ['posChange']),
        ...mapActions('listening', ['update']),
        ...mapMutations('skipbox', ['setLock']),
        nextStep: function () {
            this.position === this.items.length ? this.setLock(true) : this.posChange(this.position + 1)
        }
    }
}
</script>

<style scoped>
.ctrlBar {
    position: fixed;
    width: calc(100vw - 10px);
    height: 60px;
    margin-top: 0;
    background-color: white;
}

.bar {
    height: 44px;
    margin-left: 50vw;
    z-index: 5;
    background-color: rgba(255, 255, 255, 0);
}

.ctrlBtn {
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
    margin-left: calc(100vw - 90px);
    border-radius: 2px;
    cursor: pointer;
}

.btn {
    margin-top: 10px;
    margin-left: 170px;
}

.ctrlBtn:hover {
    background-color: #35AA53;
}

.audio {
    position: relative;
    width: 500px;
    height: 44px;
    margin-left: calc(50vw - 250px);
    margin-top: calc(50vh - 22px);
    background-color: #f2f2f2;
    border-radius: 4px;
    font-size: 13px;
}

.itemPage {
    overflow-y: auto;
}

.dummy {
    height: 70px;
}

.iconBtn {
    width: 14px;
    height: 28px;
    line-height: 28px;
    vertical-align: top;
    display: inline-block;
    margin-top: 2px;
}

.svgIcon {
    width: 14px;
    height: 14px;
    cursor: pointer;
}

.caption {
    line-height: 28px;
    margin-left: 20px;
}

.zone {
    margin-left: 20px;
    float: left;
}

.option {
    margin-top: 0;
    margin-left: 45px;
}

.tab {
    text-align: left;
}

table {
    border: 0.5px solid #cccccc;
    text-align: left;
    width: 100%;
}

td {
    border: 0.5px solid #cccccc;
}

.section {
    border: 1px solid #666666;
    margin-top: 15px;
    padding: 5px;
}

.sectionText {
    margin: 0;
}
</style>
