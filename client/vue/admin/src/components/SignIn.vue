<template>
    <div>
        <span class="titleText">用户登录</span>

        <Editor type="text" hint="输入登录邮箱" />
        <Editor type="password" hint="输入账户密码" />
        <Verifier />
        <ClkBtn />

        <div class="routerLink">
            <span :class="{'linkText': true, 'linkStyle': true, 'underline': leftActive}"
            @mouseover="leftOver" @mouseout="leftOut" @mouseup="leftOut" @click="routeChange('signup')">
                没有账号，前往注册
            </span>
            <span :class="{'linkText': true, 'rightLink': true, 'underline': rightActive}"
            @mouseover="rightOver" @mouseout="rightOut" @mouseup="rightOut" @click="routeChange('setkey')">
                忘记密码
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'SignIn',
    computed: {
        ...mapState('signinlink', ['leftActive', 'rightActive'])
    },
    methods: {
        ...mapMutations(['routeChange']),
        ...mapMutations('signinlink', ['leftOver', 'leftOut', 'rightOver', 'rightOut'])
    }
}
</script>

<style scoped src="../assets/css/common.css">
</style>
