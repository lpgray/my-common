// 仪表盘插件
(function($){
	// 仪表盘类定义
	var Instrument = function(elem, opts){
		this.$elem = elem;
		_this = this;
		this.options = opts;
		var svgWrap = this.$elem.svg({onLoad: function(svg){
				svg.circle( opts.origin['x'] , opts.origin['y'] , opts.radius );// 创建表盘
			}});
		$(svgWrap).addClass(opts.classStyle);
	}
	Instrument.prototype = {
		
	}
	
	// Plugin definition
	$.fn.instrument = function( options ){
		var opts = $.extend({}, $.fn.instrument.defaults, options);
		if( !this.data('_svg') ) this.data( '_svg' , new Instrument(this, opts) );
		return this;
	}
	
	$.fn.instrument.defaults = {
		origin : {x:100, y:100},	// 原点
		radius : 100,				// 半径
		origin_radius : 5,	// 圆心轴半径
		start : 0,					// 开始刻度
		end : 100,					// 结束刻度
		radian : 80,				// 下方开口角度
		group : [0,20,40,60,80,100],// 刻度分级，用不同颜色的警示彩带标明
		initVal : 0,				//初始刻度值
		measurement : '默认LABEL',	//计量单位默认值
		classStyle : 'default'
	}
	
}(jQuery));