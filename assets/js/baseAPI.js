//每次调用ajax时会先调用这个函数
$.ajaxPrefilter(function(options) {
    //再发起请求之前同意拼接请求的路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})