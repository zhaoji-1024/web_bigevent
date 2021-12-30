$(function() {

    var form = layui.form;

    // 定义一个查询参数对象，请求数据时需要将其提交到服务器
    var q = {
        pagenum: 1, //默认请求第一页的数据
        pagesize: 2, //默认每页显示2条数据
        cate_id: '', //分类id
        state: '' //文章的发布状态
    }

    //定义补零函数
    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }

    //定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDay());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    //调用获取文章列表数据的方法
    initTable();
    initCate();

    //获取文章列表数据的方法
    function initTable() {
        var virtue_data = {
            "status": 0,
            "message": "获取文章列表成功!",
            "data": [{
                    "Id": 1,
                    "title": "abab",
                    "pub_date": "2020-01-03 12:19:57.690",
                    "state": "已发布",
                    "cate_name": "最新"
                },
                {
                    "Id": 2,
                    "title": "666",
                    "pub_date": "2020-01-03 12:20:19.817",
                    "state": "已发布",
                    "cate_name": "股市"
                }
            ],
            "total": 2
        }
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status != 0) return layui.layer.msg('获取文章列表失败');
                // 使用模板引擎渲染页面数据
                var htmlStr = template('tpl-table', virtue_data);
                $('tbody').html(htmlStr);
                //调用渲染分页的方法
                renderPage(res.total);
            }
        })
    }

    //初始化文章分类的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status != 0) return layui.layer.msg('获取分类数据失败');
                //调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }

    //为筛选表单绑定submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault();
        //获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        //为查询参数对象q中对应属性赋值
        q.cate_id = cate_id;
        q.state = state;
        //根据最新的筛选条件重新渲染表格数据
        initTable();
    })

    // 定义渲染分页的方法
    function renderPage(total) {
        console.log(total);
    }
})