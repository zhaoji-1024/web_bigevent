$(function() {
    //调用获取用户基本信息
    getUserInfo();

    layer = layui.layer;

    $('#btnLogout').on('click', function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },
            function(index) {
                // 1清空本地存储中的token
                localStorage.removeItem('token');
                // 2重新跳转到登录页面
                location.href = '/login.html';
                // 关闭询问框
                layer.close(index);
            })
    })
})


//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        success: function(res) {
            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败!');
            }
            renderAvatar(res.data); //渲染用户头像
        }
    })
}

//渲染用户头像
function renderAvatar(user) {
    //1获取用户名称
    var name = user.nickname || user.username;
    // 2设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}