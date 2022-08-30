<template>
    <div>
        <span class="titleText">用户注册</span>

        <Editor type="text" hint="用邮箱注册账号" />
        <Editor type="password" hint="为账户设置密码" />
        <Editor type="code" hint="输入邮箱验证码" />
        <ClkBtn />

        <div class="routerLink">
            <span :class="{'linkText': true, 'linkStyle': true, 'underline': active}"
            @mouseover="mouseOver" @mouseout="mouseOut" @mouseup="mouseOut" @click="routeChange('signin')">
                已有账号，立即登录
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'SignUp',
    computed: {
        ...mapState('signuplink', ['active'])
    },
    methods: {
        ...mapMutations(['routeChange']),
        ...mapMutations('signuplink', ['mouseOver', 'mouseOut'])
    }
}
</script>

<style scoped src="../assets/css/common.css">
</style>
