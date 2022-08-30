<template>
    <div>
        <input type="text" spellcheck="false" v-model="textInput" :placeholder="hint"
        @focus="getFocus" @blur="loseFocus" />
    </div>
</template>

<script>
export default {
    name: "TextEditor",
    props: {
        hint: { type: String, required: true }
    },
    computed: {
        textInput: {
            get () {
                if (this.$store.state.route === 'signin')
                    return this.$store.state.signin.signinText
                else if (this.$store.state.route === 'signup')
                    return this.$store.state.signup.signupText
                else if (this.$store.state.route === 'setkey')
                    return this.$store.state.setkey.setkeyText
            },
            set (val) {
                if (this.$store.state.route === 'signin')
                    this.$store.commit('signin/signinTextChange', val)
                else if (this.$store.state.route === 'signup')
                    this.$store.commit('signup/signupTextChange', val)
                else if (this.$store.state.route === 'setkey')
                    this.$store.commit('setkey/setkeyTextChange', val)
            }
        }
    },
    methods: {
        getFocus () {
            if (this.$store.state.route === 'signin')
                return this.$store.commit('signin/textFocus')
            else if (this.$store.state.route === 'signup')
                return this.$store.commit('signup/textFocus')
            else if (this.$store.state.route === 'setkey')
                return this.$store.commit('setkey/textFocus')
        },
        loseFocus () {
            if (this.$store.state.route === 'signin')
                return this.$store.commit('signin/textBlur')
            else if (this.$store.state.route === 'signup')
                return this.$store.commit('signup/textBlur')
            else if (this.$store.state.route === 'setkey')
                return this.$store.commit('setkey/textBlur')
        }
    }
}
</script>

<style scoped>
input {
    width: 192px;
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
    outline: none;
    border: 0;
    background-color: transparent;
}
</style>
