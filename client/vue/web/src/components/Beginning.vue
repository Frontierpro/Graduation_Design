<template>
    <div class="bkg">
        <div class="container">
            <input type="text" spellcheck="false" placeholder="Name required" v-model="textInput"
            @keydown.enter="init" />
            <span class="clkBtn" @click="init">SUBMIT</span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
    name: 'Beginning',
    computed: {
        ...mapState(['name']),
        textInput: {
            get () { return this.name },
            set (val) { this.setName(val) }
        }
    },
    methods: {
        ...mapMutations(['setName']),
        ...mapActions(['init'])
    }
}
</script>

<style scoped>
.bkg {
    padding-left: calc(50vw - 302px);
    padding-top: calc(50vh - 24px);
}

.container {
    position: relative;
    width: 600px;
    height: 44px;
    border: 2px solid cornflowerblue;
    border-radius: 8px;
}

input {
    position: absolute;
    width: 450px;
    height: 24px;
    margin-top: 9px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 16px;
    outline: none;
    border: 0;
    background-color: transparent;
}

.clkBtn {
    position: absolute;
    background-color: cornflowerblue;
    color: white;
    font-size: 16px;
    margin-left: 480px;
    width: 120px;
    height: 44px;
    line-height: 44px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    font-weight: 550;
    cursor: pointer;
}

.clkBtn:hover {
    background-color: #4586F3;
}
</style>
