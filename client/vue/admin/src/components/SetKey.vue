<template>
    <div>
        <span class="titleText">重置密码</span>

        <Editor type="text" hint="输入登录邮箱" />
        <Editor type="password" hint="重新设置密码" />
        <Editor type="code" hint="输入邮箱验证码" />
        <ClkBtn />

        <div class="routerLink">
            <span :class="{'linkText': true, 'leftLink': true, 'underline': leftActive}"
            @mouseover="leftOver" @mouseout="leftOut" @mouseup="leftOut" @click="routeChange('signup')">
                前往注册
            </span>
            <span :class="{'linkText': true, 'rightLink': true, 'underline': rightActive}"
            @mouseover="rightOver" @mouseout="rightOut" @mouseup="rightOut" @click="routeChange('signin')">
                前往登录
            </span>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
    name: 'SignIn',
    computed: {
        ...mapState('setkeylink', ['leftActive', 'rightActive'])
    },
    methods: {
        ...mapMutations(['routeChange']),
        ...mapMutations('setkeylink', ['leftOver', 'leftOut', 'rightOver', 'rightOut'])
    }
}
</script>

<style scoped src="../assets/css/common.css">
</style>
