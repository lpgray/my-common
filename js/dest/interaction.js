
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
 * 分页 v1.0
 */
( function($) {
		function refreshPagin(page, size, count, pre) {
			var maxnum = 5
			, pagin = $('#J_PAGIN')
			, pagePre = 'page.page'
			, sizePre = 'page.size'
			, prev = pagin.children('.prev')
			, next = pagin.children('.next')
			, href = location.href
			, prefix = '?';

			if (!pre) {
				if (href.indexOf('?') > -1 && href.indexOf(pagePre) == -1) {
					prefix = href + '&';
				} else if (href.indexOf(pagePre) > -1) {
					prefix = href.substring(0, href.indexOf(pagePre));
				} else {
					prefix = '?';
				}
			} else {
				prefix = pre;
			}

			var total = Math.ceil(count / size);

			if (page == 1) {
				prev.addClass('disabled');
			}
			if (page == total) {
				next.addClass('disabled');
			}

			pagin.children('span').children().remove();
			for ( i = 1; i <= total; i++) {
				var a = $('<a />').attr({
					'href' : prefix + pagePre + '=' + i + '&' + sizePre + '=' + size + ''
				}).html(i);
				pagin.children('span').append(a);
				if (i == page) {
					a.addClass('active');
					a.attr('href', '#');
				}
			}

			prev.attr({
				'href' : prefix + pagePre + '=' + (page - 1) + '&' + sizePre + '=' + size + ''
			});
			next.attr({
				'href' : prefix + pagePre + '=' + (page + 1) + '&' + sizePre + '=' + size + ''
			});

			function simplify(page) {
				var items = pagin.children('span').children('a');
				if (total > maxnum) {
					if (page - 1 > 2) {
						for ( i = 3; i <= page - 1; i++) {
							$(items[i - 1]).remove();
						}
						$('<span> .. </span>').insertAfter($(items[1]));
					}

					if (total - page > 2) {
						for ( i = page + 1; i <= total - 2; i++) {
							$(items[i - 1]).remove();
						}
						$('<span> .. </span>').insertAfter($(items[page - 1]));
					}
				}
			}

			simplify(page);
			pagin.find('a').addClass('j_pagin_link');
		}
		window.pagin = refreshPagin;
	}(jQuery));

/*!
 * confirm面板
 */ 
(function ($) {
	var ConfirmPanel = function( dom ){
		this.elem = $( dom );
	}
	, defaults = {
		tpl : '<div class="final-panel j_final_panel hide">' +
						'<a href="#" class="btn btn-mini j_reset"><i class="icon-remove-circle"></i> 撤销更改</a> '  +
						'<a href="#" class="btn btn-primary btn-mini j_confirm"><i class="icon-ok-sign icon-white"></i> 保存更改</a>'  +
					'</div>'
		, reset : function(){
			alert('点击撤销');
		}
		, confirm : function(){
			alert('点击保存');
		}
	};
	
	ConfirmPanel.prototype = {
		show : function(){
			var $elem = this.elem;
			if( $elem.hasClass('fix-top') )
				return;
			$elem.fadeIn(500, function(){
				$elem.addClass('fix-top');
			});
		},
		
		hide : function(){
			var $elem = this.elem;
			if( !$elem.hasClass('fix-top') )
				return;
			$elem.fadeOut(500, function(){
				$elem.removeClass('fix-top');
			});
		}
	}
	
	$.fn.confirms = function(method, opts){
		var options, cp
			, panel = this.children('.j_final_panel');
		
		if( !panel.length ){
			options = $.extend({}, defaults, opts);
			this.css('position','relative');
			this.append( options.tpl );
			panel = this.children('.j_final_panel');
			this.children('.j_final_panel').children('.j_reset').click(function(){
				options.reset();
				cp.hide();
			});
			this.children('.j_final_panel').children('.j_confirm').click(function(){
				options.confirm();
				cp.hide();
			});
		}
		
		if( !this.data('confirmpanel') ){
			this.data('confirmpanel', cp = new ConfirmPanel( panel ));
		} else {
			cp = this.data('confirmpanel');
		}
		
		if( method && typeof method === 'string' ){
			cp[method]();
		}else{
			cp.show();
		}
		
		return this;
	}

}(window.jQuery));
/*!
 * @name: gridtree jquery plugin
 * @author: ray zhang
 * @datetime: 2013-05-17
 * @version: 0.1.1
 * 
 * Logging： 
 * 0.1.0.1 点击根节点会调用showChild
 * 0.1.0.2 默认显示其子列表的根节点图标显示错误
 * 0.1.1   添加trigger定义
 */
(function($){
	"use strict";
	
	var defaults = {
		tpl : "<tr><td></td><td></td><td></td></tr>"
		, empty : "<span class='_empty'>&nbsp;</span>"
		, trigger_root : "<span class='gridtree_trigger _root'>&nbsp;</span>"
		, trigger_open : "<span class='gridtree_trigger _open'>&nbsp;</span>"
		, trigger_close : "<span class='gridtree_trigger _close'>&nbsp;</span>"
		, nameWrap : "<span class='name'></span>"
		, hiddenClass : "gridtree_h0"
		, trigger : "tr"
	},
	
	methods = {
		render : function( tr ){
			var td = $(tr).children('td:first-child')
				, name = td.html()
				, pNum = methods.hasParent( $(tr) )
				, iHc = methods.hasChild( $(tr) );
			
			td.children('span').remove();
			
			if( iHc ){
				if ( iHc == 1){
					td.prepend(defaults.trigger_open);
				}else{
					td.prepend(defaults.trigger_close);
				}
			} else {
				td.prepend( methods.getTpl('trigger_root', 1) );
			}
			
			if( pNum ){
				//console.log( $(this).children('td:first-child').html() + " has " + num + "parents" );
				td.prepend( methods.getTpl( 'empty', pNum ) );
			}
		}
		/*
		 * return: 1: 有子项，且子项需要展开，2:有子项，但子项尚未加载，需要异步加载, 0:无子项
		 */
		, hasChild : function( item ){
			var back = $( '[data-parent="' + item.attr('id') + '"]' ).length ? 1 : 0;
			
			if( !back && item.attr('data-has-child') === 'true' ){
				back = 2;
			}
			
			return back;
		}
		, hasParent : function( item ){
			var parentId = item.attr('data-parent')
				, num = 0;
			if( parentId ){
				num = num + 1;
				num = num + methods.hasParent( $('#'+parentId) );
				return num;
			} else {
				return num;
			}
		}
		, showChild : function( tr ){
			var children = $( '[data-parent="' + $(tr).attr('id') + '"]' );
			if( !children.length ){
				methods.fetchChild(tr);
				return;
			}
			children.each(function(){
				$(this).removeClass('gridtree_h0');
			});
			$(tr).find('.gridtree_trigger').removeClass('_close').addClass('_open');
		}
		, hideChild : function( tr ){
			$(tr).find('.gridtree_trigger').removeClass('_open').addClass('_close');
			$( '[data-parent="' + $(tr).attr('id') + '"]' ).each(function(){
				$(this).addClass('gridtree_h0');
				$(this).find('.gridtree_trigger').removeClass('_open').addClass('_close');
				methods.hideChild( $(this) );
			});
		}
		, fetchChild : function( tr ){
			var reqUrl = $(tr).attr('url');
			if( !reqUrl ){
				alert('没有设置 attr url');
				return;
			}
			$.ajax({
				url : reqUrl,
				dataType : 'html',
				success : function(msg){
					$(tr).after( methods.renderResult(msg) )
						 .find('.gridtree_trigger').removeClass('_close').addClass('_open');
				}
			})
		}
		, getTpl : function( name, num ){
			var	back = "",
				i;
			for ( i = 0; i<num ; i++){
				back = back + defaults[name];
			}
			return back;
		}
		, getNameTpl : function( name ){
			var tpl = $(defaults.nameWrap);
			tpl.html(name);
			return $('<div>').append(tpl).html();
		}
		, renderResult : function( items ){
			if( typeof(items) === "object" ){ // 返回的结果是json
				
			} else {
				var div = $('<div/>');
				div.html(items).find('tr').each(function(){
					methods.render(this);
				});
				return div.html();
			}
		}
	};
	
	$.fn.gridtree = function( option ){
		
		var option = $.extend( {}, defaults, option );
		
		this.delegate(option.trigger, 'click', function(){
			var self , tr;
				
			if( option.trigger === 'tr' ){
				self = $(this).find('.gridtree_trigger');
			}else{
				self = $(this);
			}
			tr = self.parents('tr')[0];
			
			if( self.hasClass('_root') ){
				return;
			}else if( self.hasClass( '_open' ) ){
				methods.hideChild(tr);
			}else if( self.hasClass('_close') ){
				methods.showChild(tr);
			}
		});
		
		this.find('tr').each(function(){
			methods.render( this );
		});
		
		return this;
	}
	
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