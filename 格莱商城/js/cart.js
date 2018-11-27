/*
 1.模拟数据
 2.使用数据生成页面
 3.完成效果
     1.加减 改变购买的数目--改变小计
     2.删除--删除当前项目----confirm（）
     3.选中---计算总价
     4.全选--全选（计算总价）---全取消----
 * */
$(function() {
	//使用数据生成页面
	var goods = data.goods; //获取数组数据
	for(var i = 0; i < goods.length; i++) {
		//	console.log(goods[i].id)

		$('<div class="card_list" title=' +
			goods[i].id +
			'><div class="card_hd"><input type="checkbox" name="" id="" value=""><em>' +
			goods[i].title +
			'</em></div><div class="card_items clearfix"><dl><dt><img src=' +
			goods[i].imgUrl +
			'/></dt><dd>名称：' +
			goods[i].title +
			'</dd><dd>编著：武汉格莱科技有限公司</dd><dd>出版：中国地质大学出版社</dd><dd>简介：当你第一次见到C#时，千万不要傻傻地将它读作“C井号”...</dd><dd class="price">定价：￥<span>' +
			goods[i].price +
			'</span></dd></dl><li><div class="you icon"><a href="#"></a></div></div><div class="card_subtotul"><span class="price">小计：￥<em>' +
			goods[i].price +
			'</em></span><span class="count"><a href="#" class="minus icon"></a><input type="number" name="" id="num" value="1" /><a href="#" class="add icon"></a></span></div></div>').appendTo(".container")
	}

	//事件处理--加-减
	//找到要点击的标签---绑定事件---给input重新赋值val()
	$(".add").click(function() { //点击 +
		var countN = $(this).siblings("input"); //找到兄弟标签input
		var valO = parseInt(countN.val()) //获取input原来的值
		var valN = valO + 1; //值加1
		countN.val(valN); //把新值赋值回去
		//获取单价
		var price = parseFloat($(this).parent().parent().siblings(".card_items ").find(".price").children("span").text());
		//计算小计
		var subprice = price * valN;
		//小计赋值
		$(this).parent().prev().children("em").text(subprice)
		add();
		//		var subprice = 
		return false; //既可以阻止事件传播 也可以阻止默认行为
		//		countN.val(parseInt(countN.val())+1);
	})

	$(".minus").click(function() { //点击  -
		var countN = $(this).siblings("input"); //找到兄弟标签input
		var valO = parseInt(countN.val()) //获取input原来的值
		if(valO > 0) { //加点条件
			var valN = valO - 1; //值加1
			countN.val(valN); //把新值赋值回去
			//获取单价
			var price = parseFloat($(this).parent().parent().siblings(".card_items").find(".price").children("span").text());
			//计算小计
			var subprice = price * valN;
			//小计赋值
			$(this).parent().prev().children("em").text(subprice)
			add();
			return false; //既可以阻止事件传播  也可以阻止默认行为
			//		countN.val(parseInt(countN.val())+1);
		}
	})

	//事件处理---删除
	$(".you a").click(function() {
		//让模态框显示
		//给模态框上的按钮添加样式

		//省事的做法-----正式开发不用----使用系统弹框来判断
		var boo = confirm("确定删除吗？");
		if(boo) {
			console.log(123)
			$(this).parents(".card_list").remove();
			return false;
		}
	})

	//事件处理----全选
	$("#allCheck").click(function() {
		//点击全选---找到所有的多选框---设置属性（获取被点击的状态-直接赋值给多选框）
		//prop与attr作用和用法一致：但是是专门来设置特殊属性的
		$(".container input:checkbox").prop("checked", this.checked)
		add();
		//		prop('checkbox',true)
	})

	/*
	 jq还提供了按照表单的状态来匹配
	 
	 1.：checked 多选与单选选中状态
	 2.：selected 下拉菜单的选中状态
	 3.：disabled 被禁止的状态
	 4.：enabled 可以使用，正常的表单控件
	 * */

	//事件处理---反向全选
	//表单专用的选择器 input：checkbox：判断类型 input：checked判断状态-找到被选中的input
	//封装反向选择的函数
	function isAll(){
		var allL = $(".container input:checkbox").length; //
		var cheL = $(".container input:checkbox").length;
		if(allL == cheL) {
			$("#allCheck").prop("checkbox", true)
		} else {
			("#allCheck").prop("checked", false)
		}
		add();
	} //页面打开时，手动触发一次这个事件

	//封装函数-实现小计累加
	function add() {
		//找到所有的备选中的多选框----取出和他相关的小计值----小计值累加
		var allTotle = 0;
		//使用for循环取值--循环取值
		//		for(var i = 0; i < $(".container input:checked").length;i++) {
		//			var a = $(".container input:checkbox").eq(index);
		//			var aN = parseInt(a.parent().siblings(".cart_items").find(".price").children("span").text());
		//			allTotle = allTotle + aN;
		//		}
		//使用each()---循环取值---根据jq对象的长度实现循环，会执行时自动传入索引值
		$(".container input:checked").each(function(index) {
			var a = $(".container input:checked").eq(index);
			var aN = parseInt(a.parent().siblings(".card_subtotul").children(".price").children("em").text());
			allTotle = allTotle + aN;
		})
		//把累加结果放在总计处
		$("#totPirce").text(allTotle)
	}
})