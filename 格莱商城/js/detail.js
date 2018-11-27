$(function () {
    //获取商品编号
    var id = GetQueryString("id");
    //查询商品信息并显示
    $.ajax({
        url: "data/detail.json?id="+id,
        type: "get",
        dataType: "json",
        success: function (data) {
            $("#title").text(data.title);
            $("#price").text(data.price);
            for (var i = 0; i < data.major.length; i++) {
                $("#major").append("<span>"+data.major[i]+"</span> ");
            }
            $("#intro").html(data.intro);
        }
    })
    //详情页选项卡
    $('.detail-content').eq(0).show()//默认展开第1个
    $('.detail-hd li').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
        var i = $('.detail-hd li').index(this);//让li当前索引等于i
        $('.detail-content').eq(i).show().siblings('.detail-content').hide()//eq()表示获取第几个元素
    })
    //点击收藏
    var e = true;
    $('.fav').click(function () {
        if (e) {
            $(this).css('background-position-x', '-340px');
            e = false;
        } else {
            $(this).css('background-position-x', '-307px');
            e = true;
        }
    })
})