$(function() {

    var layer = layui.layer;
    var form = layui.form;

    //调用获取文章分类数据
    initArtCateList();

    // 获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
            }
        })
    }

    // 为添加类别按钮绑定点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html()
        });
    })

    // 通过代理的形式为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layer.msg('新增分类失败');
                initArtCateList();
                layer.msg('新增分类成功');
                layer.close(indexAdd); //根据索引关闭对应的弹出层
            }
        })
    })

    var indexEdit = null;
    // 通过代理的形式为bth-edit按钮绑定点击事件
    $('tbody').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            area: ['500px', '250px'],
            type: 1,
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr('data-id');
        // 发起请求获取对应分类的数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                console.log(res);
                form.val('form-edit', res.data);
            }
        })
    })

    // t通过代理的形式为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status != 0) return layer.msg('更新分类数据失败');
                layer.msg('更新分数数据成功');
                layer.close(indexEdit); // 关闭弹出层
                initArtCateList();
            }
        })
    })

    //通过代理形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status != 0) return layer.msg('删除分类失败');
                    layer.msg('删除分类成功');
                    layer.close(index);
                    initArtCateList();
                }
            })
        })
    })
})