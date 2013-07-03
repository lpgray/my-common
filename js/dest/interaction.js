
/*!
 * 右上角删除 v0.2.1
 * 
 * log:
 * 0.2 增加style自定义
 * 0.2.1 将url改为data-url
 */
( function($) {
		var LinkRemove = function(opts) {
			this.opts = opts;
		}
		, defaults = {
			tpl : "<a href='#' class='_linkremove j_btn_del remove hide' style='position:absolute;top:0;right:0;-webkit-transition: display .5s ease .5s;text-decoration: none;'>×</a>"
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
/*!
 * 显示alert信息 v0.1
 */
( function() {

		window.alerts = function(msg, type, memo) {
			var a = $("#J_ALERT"), ch = a.children('.j_alert_ctn');

			type && a.removeClass('alert-success alert-error').addClass('alert-' + type);
			msg && ch.html("<h4>" + msg + "</h4>");
			memo && ch.append("<p>" + memo + "</p>");

			$.trim(ch.html()) && a.fadeIn(1000, function() {
				setTimeout(function() {
					a.fadeOut();
				}, 5000);
			});
		};
		alerts();

	}());
/*!
 * loading v0.1
 */
( function($) {
		var LoadingPanel = function(text) {
			this.$elem = $(this.tmpl);
			$('body').append(this.$elem);
			this.$loading = this.$elem.find('._gtis_ui_loading');
			this.$cover = this.$elem.find('._gtis_ui_cover');
			this.setText(text);
			return this;
		};

		LoadingPanel.prototype = {
			tmpl : "<div id='_GTIS_UI_LOADING_WIN'><div class='_gtis_ui_loading'></div><div class='_gtis_ui_cover'></div></div>",

			setText : function(text) {
				$(this.$loading).html(text + '...');
			},

			show : function(text) {
				this.$cover.css('display', 'block');
				this.$loading.fadeIn();
				text && this.setText(text);
				var loading = this.$loading, ml = loading.width();
				loading.css('margin-left', '-' + ml + 'px');
			},

			hide : function() {
				var self = this;
				this.$loading.fadeOut('fast', function() {
					self.$cover.css('display', 'none');
				});
			}
		};
		window.loading = new LoadingPanel('初始化文字');
	}(jQuery));
/*!
 * 高亮结果插件 v1.1
 * 
 * 依赖jquery.ui插件
 * log:
 * 1.1 改为背景颜色渐变
 */
( function($) {
		var focus = function(elem, opt) {
			var elem = $(elem)
				, color = elem.css('background-color');
						elem.css('background-color', opt.color);
			elem.animate({
			      backgroundColor: color
			}, 1000);
		};

		$.fn.focusresult = function(options) {
			var opts = $.extend({}, options, $.fn.focusresult.defaults);
			focus(this, opts);
			return this;
		};

		$.fn.focusresult.defaults = {
			color : "#FCF78E",
			duration : 1000
		};
	}(jQuery)); 




/*!
 * 全选
 */
$(document).delegate('.j_check_all', 'click', function() {
	var self = $(this)
		, table = self.parents('table')
		, cbxs = table.find('tbody').find('input[type="checkbox"]');
	cbxs.each(function() {
		if( !$(this).attr('disabled') ){
			this.checked = self.is(':checked');
		}
	});
});