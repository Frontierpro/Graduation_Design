<template>
    <div>
        <input :type="type" spellcheck="false" v-model="pwdInput" :placeholder="hint"
        @focus="getFocus" @blur="loseFocus" />
        <div class="svgContainer" @click="iconChange">
            <SvgIcon class="svgIcon" :iconName="iconName" />
        </div>
    </div>
</template>

<script>
export default {
    name: "PwdEditor",
    props: {
        hint: { type: String, required: true }
    },
    computed: {
        pwdInput: {
            get () {
                if (this.$store.state.route === 'signin')
                    return this.$store.state.signin.signinPwd
                else if (this.$store.state.route === 'signup')
                    return this.$store.state.signup.signupPwd
                else if (this.$store.state.route === 'setkey')
                    return this.$store.state.setkey.setkeyPwd
            },
            set (val) {
                if (this.$store.state.route === 'signin')
                    this.$store.commit('signin/signinPwdChange', val)
                else if (this.$store.state.route === 'signup')
                    this.$store.commit('signup/signupPwdChange', val)
                else if (this.$store.state.route === 'setkey')
                    this.$store.commit('setkey/setkeyPwdChange', val)
            }
        }
    },
    data () {
        return { type: 'password', iconName: 'disable' }
    },
    methods: {
        iconChange () {
            this.iconName = this.iconName === 'able' ? 'disable' : 'able'
            this.type = this.type === 'text' ? 'password' : 'text'
        },
        getFocus () {
            if (this.$store.state.route === 'signin')
                return this.$store.commit('signin/pwdFocus')
            else if (this.$store.state.route === 'signup')
                return this.$store.commit('signup/pwdFocus')
            else if (this.$store.state.route === 'setkey')
                return this.$store.commit('setkey/pwdFocus')
        },
        loseFocus () {
            if (this.$store.state.route === 'signin')
                return this.$store.commit('signin/pwdBlur')
            else if (this.$store.state.route === 'signup')
                return this.$store.commit('signup/pwdBlur')
            else if (this.$store.state.route === 'setkey')
                return this.$store.commit('setkey/pwdBlur')
        }
    }
}
</script>

<style scoped>
div {
    position: relative;
}

input {
    position: absolute;
    width: 163px;
    height: 100%;
    padding-left: 15px;
    padding-right: 15px;
    outline: none;
    border: 0;
    background-color: transparent;
}

.svgContainer {
    position: absolute;
    width: 20px;
    height: 20px;
    margin-top: 8.5px;
    margin-left: 193px;
    cursor: pointer;
}

.svgIcon {
    width: 100%;
    height: 100%;
}
</style>
