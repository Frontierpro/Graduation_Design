<template>
    <div>
        <input type="text" spellcheck="false" v-model="codeInput" :placeholder="hint"
        @focus="getFocus" @blur="loseFocus" />
        <span :class="{'active': active, 'trigger': trigger, 'inValid': inValid}"
        @mousedown="mouseDown" @mouseup="getCode" @mouseleave="mouseUp"
        @mouseover="mouseOver" @mouseout="mouseOut">
            {{ cntStatus }}
        </span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: "CodeEditor",
    props: {
        hint: { type: String, required: true }
    },
    computed: {
        codeInput: {
            get () {
                if (this.$store.state.route === 'signup')
                    return this.$store.state.signup.signupCode
                else if (this.$store.state.route === 'setkey')
                    return this.$store.state.setkey.setkeyCode
            },
            set (val) {
                if (this.$store.state.route === 'signup')
                    this.$store.commit('signup/signupCodeChange', val)
                else if (this.$store.state.route === 'setkey')
                    this.$store.commit('setkey/setkeyCodeChange', val)
            }
        },
        ...mapGetters('verify', ['cntStatus', 'inValid'])
    },
    data () {
        return { active: false, trigger: false }
    },
    methods: {
        getCode () {
            this.trigger = false
            this.$store.dispatch('verify/getCode')
        },
        getFocus () {
            if (this.$store.state.route === 'signup')
                return this.$store.commit('signup/codeFocus')
            else if (this.$store.state.route === 'setkey')
                return this.$store.commit('setkey/codeFocus')
        },
        loseFocus () {
            if (this.$store.state.route === 'signup')
                return this.$store.commit('signup/codeBlur')
            else if (this.$store.state.route === 'setkey')
                return this.$store.commit('setkey/codeBlur')
        },
        mouseOver () { this.active = true },
        mouseOut () { this.active = false },
        mouseDown () { this.trigger = true },
        mouseUp () { this.trigger = false }
    }
}
</script>

<style scoped>
div {
    position: relative;
}

input {
    position: absolute;
    width: 96px;
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
    outline: none;
    border: 0;
    background-color: transparent;
}

span {
    position: absolute;
    width: 96px;
    height: 35px;
    line-height: 35px;
    margin-left: 126.5px;
    cursor: pointer;
    text-align: center;
    font-weight: bold;
    color: white;
    background-color: yellowgreen;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

.active {
    box-shadow: yellowgreen 0 0 5px;
}

.trigger {
    background-color: #9ABC32;
}

.inValid {
    background-color: #cccccc;
    box-shadow: none;
    cursor: default;
}
</style>
