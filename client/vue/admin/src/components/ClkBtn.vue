<template>
    <div :class="{'clkBtn': true, 'trigger': trigger, 'active': active}"
    @mouseover="mouseOver" @mouseout="mouseOut"
    @mousedown="mouseDown" @mouseup="submit" @mouseleave="mouseUp">
        <span>{{ btnName }}</span>
    </div>
</template>

<script>
export default {
    name: 'ClkBtn',
    computed: {
        btnName () {
            if (this.$store.state.route === 'signin') 
                return '点击登录'
            else if (this.$store.state.route === 'signup') 
                return '创建用户'
            else if (this.$store.state.route === 'setkey')
                return '确认重置'
        }
    },
    data () {
        return { active: false, trigger: false }
    },
    methods: {
        submit () {
            this.trigger = false
            if (this.$store.state.route === 'signin') 
                this.$store.dispatch('signin/signinSubmit')
            else if (this.$store.state.route === 'signup') 
                this.$store.dispatch('signup/signupSubmit')
            else if (this.$store.state.route === 'setkey')
                this.$store.dispatch('setkey/setkeySubmit')
        },
        mouseOver () { this.active = true },
        mouseOut () { this.active = false },
        mouseDown () { this.trigger = true },
        mouseUp () { this.trigger = false }
    }
}
</script>

<style scoped>
.clkBtn {
    width: 74%;
    height: 35px;
    margin-left: 13%;
    border: 1px solid #cccccc;
    border-radius: 5px;
    background-color: coral;
}

.active {
    border: 1px solid coral;
    box-shadow: coral 0 0 5px;
    cursor: pointer;
}

.trigger {
    background-color: orangered;
}

span {
    display: block;
    width: 100%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: white;
}
</style>
