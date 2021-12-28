$(function() {
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        nickname: function(value) {
            if (value.length > 6) return '昵称长度必须在1-6个字符之间';
        }
    })

    initUserInfo();

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function(res) {
                if (res.status != 0) return layer.msg('获取用户信息失败!');
                // 快速表单赋值
                form.val('formUserInfo', res.data);
            }
        })
    }

    // 重置表单的数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault();
        initUserInfo();
    })

    // 监听表单的提交事件更新用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) return layer.msg('更新用户信息失败!');
                layer.msg('更新用户信息成功!');
                // 调用父页面的方法重新渲染用户信息和头像
                window.parent.getUserInfo();
            }
        })
    })

})