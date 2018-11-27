$(function () {
    //收索框用户敲回车键后，跳转页面到商品列表页，查询关键词
    $("input[type=search]").keyup(function (e) {
        if (e.keyCode == 13) {
            window.location.href = "goods.html?key=" + $(this).val();
        }
    })
})