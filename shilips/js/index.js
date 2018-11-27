$(document).ready(function() {
	//首页
	//logo伸缩动画
	//鼠标进入的时候让logo2的高度用animate动画给个50的高度
	$(".logo-box").mouseenter(function() {
		$('.logo2').stop().animate({
			height: '50px'
		})
		//鼠标离开的时候让logo2的高度用animate动画给个0的高度
	}).mouseleave(function() {
		$('.logo2').stop().animate({
			height: '0'
		})
	})
	//newList页面
	$(".paging ul li").click(function() {
		$(this).addClass("active").siblings().removeClass("active")
	})
	//banner 图高度自适应，通过监控 BOM 的宽度变化来实现
	function imgResize() {
		var DomWidth = $(window).width();
		var imgHeight = DomWidth * 700 / 2000;
		$(".banner").css("height", imgHeight + "px")
	}
	imgResize()
	window.onresize = function() {
		imgResize()
	}
	//回到顶部，通过监控鼠标滚轮事件实现回到顶部按钮的显隐
	$(".backTop").click(function() {
		scrollTo(0, 0)
	})
	//侧栏
	$(".sideBar").click(function() {
		$(this).stop().animate({
			right: "0px"
		})
	}).mouseleave(function() {
		$(this).stop().animate({
			right: "-50px"
		})
	})
})