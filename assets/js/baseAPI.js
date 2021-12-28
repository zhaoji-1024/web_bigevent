//每次调用ajax时会先调用这个函数
$.ajaxPrefilter(function(options) {
    //再发起请求之前同意拼接请求的路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    //统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function(res) {
        // 在complete回调函数中可以使用res.response.JSON拿到服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            console.log(123);
            //强制清空token
            localStorage.removeItem('token');
            // 强制跳转到登录页面
            location.href = '/login.html';
        }
    }
})