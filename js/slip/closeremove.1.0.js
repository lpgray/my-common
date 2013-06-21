/*!
 * 右上角删除
 * 
 * log:
 * 0.2 		增加style自定义
 * 0.2.1 	将url改为data-url
 * 1.0		1.0版本
 */
( function($) {
		var LinkRemove = function(opts) {
			this.opts = opts;
		}
		, defaults = {
			tpl : "<a href='#' class='_linkremove j_btn_del remove hide' style='position:absolute;top:0;right:0;-webkit-transition: display .5s ease .5s;text-decoration: none;' onclick='$(this).parent().slideUp()'>×</a>"
			, style : {
				'color' : 'white',
				'background-color' : '#CE3939',
				'padding' : '5px 10px',
				'font' : 'normal bold 18px arial'
			}
		}

		LinkRemove.prototype = {
			render : function(url) {
				var back = $(this.opts.tpl);
				url && back.attr('href', url);
				back.css( this.opts.style );
				return back;
			}
		}

		$.fn.closeremove = function(opts) {
			return this.each(function() {
				var self = $(this)
				, options = $.extend(true, {}, defaults, opts);
				self.css('position', 'relative');
				$link = new LinkRemove(options).render(self.attr('data-url'));
				self.append($link);
				self.hover(function() {
					$(this).children('._linkremove').css('display', 'block');
				}, function() {
					$(this).children('._linkremove').css('display', 'none');
				});
			});
		}
	}(jQuery));