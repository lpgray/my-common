/*!
 * 高亮结果插件 v1.1
 * 
 * 依赖jquery.ui插件
 * log:
 * 1.1 改为背景颜色渐变
 */
( function($) {
	var focus = function(elem, opt) {
		var elem = $(elem), color = elem.css('background-color');
	
		elem.css('background-color', opt.color);
		elem.animate({
			backgroundColor : color
		}, 1000);
	};
	
	$.fn.focusresult = function(options) {
		var opts = $.extend({}, options, $.fn.focusresult.defaults);
		focus(this, opts);
		return this;
	};
	
	$.fn.focusresult.defaults = {
		color : "red",
		duration : 1000
	};
}(jQuery)); 