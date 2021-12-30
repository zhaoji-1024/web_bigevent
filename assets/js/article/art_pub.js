$(function() {

    // 调用加载文章分类的方法
    initCate();

    // 初始化富文本编辑器
    initEditor();

    // 定义加载文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) return layui.layer.msg('初始化文章分类失败');
                // 调用模板引擎渲染分类的下拉菜单
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);

    // 为选择封面的按钮绑定点击事件处理函数
    $('#btnChooseImage').on('click', function() {
        $('#coverFile').click();
    })

    // 监听coverFile的change事件获取用户选择的文件列表
    $('#coverFile').on('change', function(e) {
        //获取到文件列表数组
        var files = e.target.files;
        if (files.length === 0) return;
        var newImgURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '已发布';

    //为存为草稿按钮绑定事件处理函数
    $('#btnSave2').on('click', function() {
        art_state = '草稿';
    })

    // 为表单绑定submit提交事件
    $('#form-pub').on('submit', function(e) {
        e.preventDefault();
        // 基于form表单快速创建formdata对象
        var fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            }).toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                    // 6. 发起 ajax 数据请求
                publishArticle(fd);
            })
    })

    // 定义一个发布文章的方法
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                console.log(res);
                if (res.status != 0) return layui.layer.msg('发布文章失败');
                layui.layer.msg('发布文章成功');
                location.href = '/article/art_list.html';
            }
        })
    }

})