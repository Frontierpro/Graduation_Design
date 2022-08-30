module.exports = {
    formatCheck: (textStr, pwdStr, codeStr) => {
        let errorInfo = ''
        if (textStr != null)
            errorInfo = checkText(textStr)
        if (errorInfo.length == 0 && pwdStr != null)
            errorInfo = checkPwd(pwdStr)
        if (errorInfo.length == 0 && codeStr != null)
            errorInfo = checkCode(codeStr)
        return errorInfo
    }
}

var checkText = (textStr) => {
    if (textStr.length == 0)
        return '请填写用户名'
    if (textStr.length > 28)
        return '用户名不能超过28个字符'
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    if (!pattern.test(textStr))
        return '邮箱格式不正确'
    return ''
}

var checkPwd = (pwdStr) => {
    if (pwdStr.length == 0)
        return '请填写密码'
    if (pwdStr.length < 8)
        return '密码不能少于8个字符'
    if (pwdStr.length > 18) 
        return '密码不能超过18个字符'
    if (pwdStr[0] === '_')
        return '密码不能以下划线开头'
    let pattern = /^[a-z0-9A-Z]+$/
    if (!pattern.test(pwdStr))
        return '密码仅支持大小写字母和数字'
    return ''
}

var checkCode = (codeStr) => {
    if (codeStr.length == 0)
        return '请填写验证码'
    let pattern = /^[0-9]{6}$/
    if (!pattern.test(codeStr))
        return '验证码无效'
    return ''
}
