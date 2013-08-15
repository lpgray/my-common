/*
 * name: gauge
 * 
 * desc: 横向和纵向的测量仪，温度、湿度
 */
(function($){
	var defaults = {
		length : 300, // 长度
		width : 15,
		direction : 'horizontal', // 水平
	}
	
	var colors = {
		panelFill : '#fff' ,
		pointerFill : '#fff'
	}
	
	var Gauge = function(elem, option){
		this.options = option
		this.$elem = $(elem);
		this.$elem.css('position','relative');
		this.paper = Raphael(elem);
		this.init();
	}
	
	Gauge.prototype = {
		init : function(){
			var cw = this.$elem.width(),
			    ch = this.$elem.height(),
			    width = this.options.width,
			    length = this.options.length;
			    
			var point1 = {}, point2 = {}
			
			if( this.options.direction === 'horizontal' ){
				this.origin = { x:cw/2 - length/2, y:ch/2 - width/2};
				this.h = width;
				this.w = length;
				
				point1.x = this.origin.x - 8;
				point1.y = this.origin.y - 15;
				point2.x = this.origin.x + 8;
				point2.y = this.origin.y - 15;
				this.createPointer(this.origin, point1, point2);
				
			}else if( this.options.direction === 'vertical' ){
				this.origin = { x:cw/2 - width/2, y:ch/2 - length/2};
				this.h = length;
				this.w = width;
				
				var px = this.origin.x + this.w;
				var py = this.origin.y + this.h;
				point1.x = px + 15;
				point1.y = py - 8;
				point2.x = px + 15;
				point2.y = py + 8;
				this.createPointer({ x :  px, y: py}, point1, point2);
			}
			
			this.panel = this.paper.rect( this.origin.x, this.origin.y, this.w, this.h);
			this.panel.attr({ fill : colors.panelFill });
			this.panel.click(function(){
				this.animate({fill : '#000'}, 1000);
			});
		}
		, createPointer : function(origin, point1, point2){
			this.pointer = this.paper.path('M'+origin.x+','+origin.y+'L'+point1.x+','+point1.y+'L'+point2.x+','+point2.y+'Z');
			this.pointer.attr({ fill : colors.pointerFill });
			this.pointer.click(function(){
				var x = parseInt( origin.x ) + 150;
				point1.x = x - 8;
				point2.x = x + 8;
				this.animate({fill : '#000', path : 'M'+x+','+origin.y+'L'+point1.x+','+point1.y+'L'+point2.x+','+point2.y+'Z'}, 500);
			});
		}
		, createScale : function(){
			
		}
		, createStripe : function(){
			
		}
	}
	
	$.fn.gauge = function( option ){
		var opts = $.extend({}, defaults, option);
		return this.each(function(){
			$(this).data('_gauge') || $(this).data('_gauge', new Gauge(this, opts));
		});
	}
}(jQuery));
