(function($){
	var defaults = {
		autoplay:true,
		seconds:1000,
	}
	
	
	$.fn.extend({
		"banner":function(options){
			var sum = 0;
			if($(this).find("ul li").length > $(this).find("ol li").length){
				sum = $(this).find("ul li").length-$(this).find("ol li").length;
				for(j=0;j<sum;j++){
					$("<li></li>").appendTo($(this).find("ol"))
				}
			}
			
			
			var x = $.extend(defaults,options);
			var ol = $(this).find("ol");
			var img = $(this).find("ul li");
			var btn = $(this).find("ol li");
			var tempwrap = $(this).find(".tempwrap");
			var i = 0;
			var seconds = x.seconds;
			var time = null;
			


			btn.mouseover(function(){
				i = $(this).index();
				move($(this))
			})
			function move(_this){
				_this.attr("class","on").siblings().removeAttr("class");
				img.eq(i).fadeIn().siblings().fadeOut();
			}
						
			function init(){
				time = setInterval(function(){
					i>=img.length-1?i=0:i++;
					move(btn.eq(i))
				},seconds);	
			}
			
			tempwrap.hover(function(){
				clearInterval(time);
			},function(){
				init();
			})
			
			x.autoplay===true?init():null;
		}
	})
})(jQuery)
