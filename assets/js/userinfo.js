$(function () {
    //入口函数
    var form = layui.form
    form.verify({
        nicname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在1-6之间'
            }
        }
    })
    // 利用 form.val() 进行快速赋值，赋值之前我们需要给 form 表单添加 一个 lay-filter 的属性
    // - 导入 baseAPI
    // - 在 user_info.js 中定义并调用 initUserInfo 函数
    // - 在  initUserInfo  函数中 调用 $.ajax() 获取用户基本信息
    // - 如果返回的 status 为0，那么代表成功，如果不等于，代表失败，利用 layer进行提示
    //初始化用户信息，将用户信息渲染到页面上
    //调用初始化用户信息函数 初始化用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {

                    return layui.layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置表单内容
    $('#btn-reset').on('click', function () {
        e.preventDefault();
        initUserInfo()
    })
    // 为表单指定 lay-filter 属性
    $('#btn-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })

    })
   //入口函数
})

