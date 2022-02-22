$(function () {
    //入口函数
    //自定义校验规则
    var form = layui.form;
    var layer = layui.layer;  //定义layer 
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samword: function (value) {
            if (value == $('[name="oldPwd"]').val()) {
                return '新旧密码不能一致'
            }
        },
        //判断两次密码输入是否一致 第二种自定义的方法 函数
        repwd: function (value) {

            if (value !== $('[name="newPwd"]').val()) {
                return "两次输入密码不一致"
            }
        },
    });
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('.layui-form')[0].reset()
                console.log($('.layui-form')[0]);
            }
        })
    })




    //入口函数


})