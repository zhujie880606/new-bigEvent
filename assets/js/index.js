
//入口函数
$(function () {
    getUserInfo()
    var layer = layui.layer
    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })


    //入口函数
})
// 获取用户的基本信息 
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },

        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }       
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)

        },
        
    })
}
//设置头像渲染函数以及欢迎文本
function renderAvatar(user) {
    //获取用户的名称 有昵称获取昵称，没有昵称获取用户名
    var names = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + names)
    // 3. 按需渲染用户的头像 
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像  
        //有头像图片就渲染头像，
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }
    else {
        //没有头像图片就渲染文字图片，并把文字首字母大写
        $('.layui-nav-img').hide()
        var first = names[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }


}
//控制用户的访问权限
//在调用有权限接口的时候，指定complete回调函数，这个回调函数不管成功还是失败都会调用
//在回调里面判断 服务器返回的的状态是否等于 1，并且错误的信息是  "身份认证失败"，如果成立，那么就强制用户跳转到登录页
function complate(res) {

}