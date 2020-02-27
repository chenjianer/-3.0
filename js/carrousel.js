
(function(){
//	默认配置参数
	var defaults = {
		'width':1000,
		'height':300,
		'firstWidth':640,
		'firstHeight':270,
		'scale':0.8,
		'autoPlay':true,
		'delayTime':3000
	}
	
	
	$.fn.extend({
		'carsoule':function(options){
			var z = $.extend(defaults,options);			
			var carsouleName = $(this);
			var btn_l = carsouleName.find('.btn_l'); 
			var btn_r = carsouleName.find('.btn_r'); 
			var li = carsouleName.find('li');
			var liFirst = li.first();
			
//	设置.carsoule的样式
			carsouleName.css({
				'width':z.width,
				'height':z.height
			})
			
						
//	 1)设置第一个li的样式
			
				liFirst.css({
					'width':z.firstWidth,
					'height':z.firstHeight,
					'zIndex':Math.floor(li.length/2),
					'left':(z.width-z.firstWidth)/2,
					'top':(z.height-z.firstHeight)/2
				})

//   2)设置剩余li的样式
			var sliceImg = carsouleName.find('li:gt(0)');
			var slice = sliceImg.length/2;
			var sliceRight = sliceImg.slice(0,slice);
			var sliceLeft = sliceImg.slice(slice);
			var level = Math.floor(li.length/2);

//		设置剩余的右边的li的样式
			var rw = z.firstWidth;
			var rh = z.firstHeight;
			var firstLeft = (z.width-z.firstWidth)/2;
			var gap = firstLeft/level;
			var fix = firstLeft+rw;
		
			sliceRight.each(function(i){
				level--;
				rw =  rw * z.scale;
				rh =  rh * z.scale;
				var j = i;
				$(this).css({
					'width':rw,
					'height':rh,
					'left':fix+ (++i)*gap - rw,
					'top': (z.height- rh)/2,
					'zIndex':level,
					'opacity':1/(++j)
				})
			})
		
		
//		设置剩余的左边的li的样式
		var lw = sliceRight.last().width();
		var lh = sliceRight.last().height();
		var loop  =Math.floor(li.length/2);
		
		sliceLeft.each(function(i){		
			$(this).css({
				'width':lw,
				'height':lh,
				'left': i * gap,
				'top':(z.height- lh)/2,
				'zIndex':i,
				'opacity':1/loop
			})
			lw = lw / z.scale;
			lh = lh / z.scale;
			loop--;
		})
			
		
////////////所有li旋转效果///////////
////////////右按钮
			var x = 0;
			btn_r.click(function(){
				var zIndexArr = []
				if(!li.is(':animated')){
					li.each(function(){
						var prev = $(this).prev().get(0) ? $(this).prev() :li.last();
						var width = prev.width();
						var height = prev.height();
						var left = prev.css('left');
						var top = prev.css('top');
						var opacity = prev.css('opacity');
						var zIndex = prev.css('zIndex');
						zIndexArr.push(zIndex)
						$(this).animate({
							'width':width,
							'height':height,
							'left':left,
							'top':top,
							'opacity':opacity
						})				
					})
					li.each(function(i){
						$(this).css({
							'zIndex':zIndexArr[i]
						})
					})
					
					if(x===li.length-1){
						x=0;
					}else{
						x++;
					}
					
					li.removeAttr('class')
					li.eq(x).attr('class','on')
				}
			})
	
	
//////////左按钮
			btn_l.click(function(){
				var zIndexArr = []
				if(!li.is(':animated')){
					li.each(function(){
						var next = $(this).next().get(0) ? $(this).next() :li.first();
						var width = next.width();
						var height = next.height();
						var left = next.css('left');
						var top = next.css('top');
						var opacity = next.css('opacity');
						var zIndex = next.css('zIndex');
						zIndexArr.push(zIndex)
						$(this).animate({
							'width':width,
							'height':height,
							'left':left,
							'top':top,
							'opacity':opacity
						})
					})
					li.each(function(i){
						$(this).css({
							'zIndex':zIndexArr[i]
						})
					})
					
					if(x===0){
						x=li.length-1;
					}else{
						x--;
					}
					
					li.removeAttr('class')
					li.eq(x).attr('class','on')			
				}
			})	
		
//////////是否自动轮播
			if(z.autoPlay === true){
				var time = setInterval(turn,z.delayTime)
				function turn(){
					btn_r.trigger('click')
				}	
			}
			
			carsouleName.hover(function(){
					clearInterval(time)
				},function(){
					time = setInterval(turn,z.delayTime)
				})
		
		}
	})
})(jQuery)
