/*! 
 *  gtmap - 2013-09-10
 *  Author: zhangyang, Email: rayzy1991@163.com
 *  Copyright (c) 2013 Gtmap Ltd. All Rights Reserved.
 */
/*!
 * @name: ajax4data
 * @author: ray zhang
 * @datetime: 2013-06-19 14:31
 * @version: 1.1
 *
 * Copyright (c) 2013 Gtmap Ltd. All Rights Reserved.
 *
 * change-log：
 * 1.0			init
 * 1.1			可以在class中指定调用什么方法显示数据 比如append数据 <a href="#" class="j_ajax4data" data-result-ctn="#J_ID(append)" >btn</a>
 * 1.2			IE8下清除缓存
 */
Utils.ajax4data = function() {
	$(document).delegate('.a4d', 'click', function() {
		var url = $(this).attr('data-url') || $(this).attr('href')
		, sCtn = $(this).attr('data-result-ctn')
		, method , ctn, pre = "";

		if (!sCtn) {
			alert('没有设定存放结果的容器选择符');
			return false;
		} else if (sCtn.search(/\(/) !== -1) {
			method = sCtn.substring(sCtn.indexOf('(') + 1, sCtn.indexOf(')'));
			sCtn = sCtn.substring(0, sCtn.indexOf('('));
		} else {
			method = 'html';
		}
		ctn = $(sCtn);
		loading.show('正在请求数据');
		if( url ){
			if( url.indexOf('?') > -1 ){
				pre = "&d="
			}else{
				pre = "?d="
			}
			url && $.ajax({
	            url : url + pre + new Date().getMilliseconds(),
	            dataType : 'html',
	            success : function(msg){
	                ctn[method](msg);
	                ctn.find('form').validationEngine();
					loading.hide();
	            }
	        });
		}
		return false;
	});
};
Utils.ajax4data();

// stop default link behavior
$(document).on('click', '[href="#"],.disabled', function(e) {
	e.preventDefault();
});
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

function beforeRemove(){
	$('.j_btn_del,.j_ask').click(function(){
		var ask = $(this).attr('data-ask') || '确定执行删除操作吗？'
		return window.confirm(ask);
	});
}
/*!
 * @name:			group operation in form & checkbox
 * @author: 		ray zhang
 * @datetime: 		2013-06-04 11:45
 * @version:		1.0
 *
 * Copyright (c) 2013 Gtmap Ltd. All Rights Reserved.
 * 
 * change-log:
 * 1.0 重构适应异步加载
 */

$(document).ready(function(){
	
	function isChanged( tr ){
			var back = false;
			$(tr).find('form').find('input[type="checkbox"]').each(function(){
				var self = $(this)
					, now = self.is(':checked')
					, status = self.data('initStatus');
				
				if( status === undefined ){
					status = self.attr('data-init-status');
				}
				
				if( now != status ){
					back = true;
				}
			});
			return back;
		}
		
	function isAnyChanged(){
		var back = false;
		$('.j_save').each(function(){
			if( $(this).is(':visible')){
				back = true;
			}
		});
		if ( back ){
			$('#J_BTN_SAVE_ALL').fadeIn( function(){
				$(this).css('display','inline-block');
			} );
		}else{
			$('#J_BTN_SAVE_ALL').css('display','none');
		}
	}
	
	function callbackSubmitGrantInfo(msg, tr){
		if( msg === "success" ){
			alerts('授权成功' , msg);
			$(tr).find('form').find('form input[type="checkbox"]').each(function(){
				var self = $(this);
				self.data('initStatus',self.is(':checked'));
			});
			$(tr).find('.j_save').css('display','none');
		} else {
			alerts( msg, 'error' );
		}
	}
	
	function bindInitStatus(tr){
		$(tr).find('form').find('input[type="checkbox"]').each(function(){
			$(this).data('initStatus', $(this).is(':checked'));
			$(this).attr('data-init-status', $(this).is(':checked'));
		});
	}
	
	$('tbody').children('tr').each(function(){
		bindInitStatus( this );
	});
	
	$('tbody').delegate('input[type=checkbox]', 'change', function(){
		var tr = $(this).parents('tr')[0];
		if( isChanged( tr ) ){
			$(tr).children('td:last-child').children('.j_save').fadeIn(function(){
				$(this).css('display','inline-block');
			});
		} else {
			$(tr).children('td:last-child').children('.j_save').css('display','none');
		}
		isAnyChanged();
	});
	
	$('tbody').delegate('.j_save', 'click', function(){
		var tr = $(this).parents('tr')[0];
		$(tr).find('form').ajaxSubmit({
			callback : function(msg){
				callbackSubmitGrantInfo(msg, tr);
			}
		});
	});
	
	$('#J_BTN_SAVE_ALL').click(function(){
		$.browser.msie && loading.show('正在保存');
		$('.j_save:visible').click();
		$(this).css('display','none');
		$.browser.msie && loading.hide();
	});
		
	$(document).delegate('.j_check_all', 'click', function() {
		var self = $(this)
			, parent = self.parents('tr')[0]
			, cbxs = $(parent).find('form').find('input[type="checkbox"]');
		
		$(this).is(':checked') ? $(this).parent('span').addClass( 'checked' ) : $(this).parent('span').removeClass( 'checked' );
		
		cbxs.each(function() {
			if( !$(this).attr('disabled') && this.checked != self.is(':checked') ){
				this.checked = self.is(':checked');
				$(this).is(':checked') ? $(this).parent('span').addClass( 'checked' ) : $(this).parent('span').removeClass( 'checked' );
				$(this).trigger('change');
			}
		});
	});
	
});
Utils.pagin = function(dom, page, size, count, max, pre) {
	Array.prototype.contains = function(needle) {
		for (i in this) {
			if (this[i] == needle)
				return true;
		}
		return false;
	}
	var maxnum = 5, 
		pagin = $(dom), 
		pagePre = 'page.page', 
		sizePre = 'page.size', 
		prev = pagin.children('.prev'), 
		next = pagin.children('.next'), 
		href = location.href, prefix = '?';
	
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
		var items = pagin.children('span').children('a'), 
			active = pagin.children('span').children('.active'), 
			aIndex, 
			disNum = [];
			
		if (items.length > max) {
			// get active index
			aIndex = active.index() + 1;
	
			items.each(function(i, link) {
				if (disNum.length >= max)
					return false;
	
				i = i + 1;
	
				if (i === aIndex || i === aIndex - 1 || i === aIndex + 1 || i === 1 || i === 2 || i === items.length - 1 || i === items.length) {
					disNum.push(i);
					return;
				}
			})
			for (var i = aIndex - 2; i > 2; i--) {
				if (disNum.length >= max)
					break;
				disNum.contains(i) || disNum.push(i);
			}
	
			for (var i = aIndex + 2; i < items.length - 1; i++) {
				if (disNum.length >= max)
					break;
				disNum.contains(i) || disNum.push(i);
			}
	
			disNum.sort(function(a, b) {
				return a > b;
			});
	
			items.each(function(i, link) {
				i = i + 1;
				disNum.contains(i) || $(this).remove();
			});
	
			items = pagin.children('span').children('a');
	
			for (var i = 1; i < disNum.length; i++) {
				if (disNum[i] - disNum[i - 1] > 1) {
					$(items[i - 1]).after('<strong> ... </strong>');
				}
			}
		}
	}
	simplify(page);
	pagin.find('a').addClass('j_pagin_link');
};
/*!
 * ajax提交表单插件
 */
( function($) {
	var defaults = {
		callback : function(msg){
			
		}
		, loading : '等待文字'
	}
	
	$.fn.ajaxSubmit = function( opts ) {
		this.validationEngine();
		var form = this;
	
		if (!form.attr('action')) {
			alert(form.attr('id') + '的action没有设定');
			return;
		}
	
		if (!form.validationEngine('validate')) {// 为form进行validationEngine插件验证，如果验证失败退出
			return;
		}
	
		opts.loading && loading.show(opts.loading);
		
		$.ajax({
			url : form.attr('action'),
			type : form.attr('method') || 'get',
			data : form.serialize(),
			dataType : 'html',
			success : function(msg) {
				opts.callback && opts.callback(msg);
				loading.hide();
			}
		});
		return this;
	};
}(jQuery));
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
		tpl : "<a href='#' class='_linkremove j_btn_del remove hide' style='position:absolute;top:0;right:0;-webkit-transition: display .5s ease .5s;text-decoration: none;' onclick='$(this).parent().slideUp()'>×</a>",
		style : {
			'color' : 'white',
			'background-color' : '#CE3939',
			'padding' : '5px 15px',
			'font' : 'normal bold 30px arial',
			'border-radius' : '0 5px 0 0'
		}
	}
	
	LinkRemove.prototype = {
		render : function(url) {
			var back = $(this.opts.tpl);
			url && back.attr('href', url);
			back.css(this.opts.style);
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
 * confirm面板 - css3交互
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
	};
	
	$.fn.confirms = function(opts, method){
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
		
		cp.show();
		
		return this;
	};

}(window.jQuery));
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
		elem.animate({'background-color' : color}, 1000);
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
/*!
 * 表单序列化成json插件定义
 *
 * 支持 name.name1.name2这种 input name转化
 *
 * change log:
 * 0.2 将所有 " 转换为 \"
 */
(function($){
	$.fn.serializeObject = function() {
		var html_transfer = function(str) {
			str = str.replace(/"/g, '\\"')
					 .replace(/'/g, '\\"')
					 .replace(/‘/g, '\\"')
					 .replace(/’/g, '\\"')
					 .replace(/“/g, '\\"')
					 .replace(/”/g, '\\"');
			return str;
		}
		var o = {};
		var a = this.serializeArray();
		var back = {}, p;
		$.each(a, function() {
			this.value = html_transfer(this.value);
			//console.log(this.name + "  " + this.value.replace(/"/g,'\\"'));
			if (this.name.indexOf('.') > -1) {
				var nArray = this.name.split('.');
				for ( i = 0; i < nArray.length; i++) {
					if (i == 0) {
						if (back[nArray[i]]) {
							back[nArray[i]] = $.extend({}, back[nArray[i]]);
						} else {
							back[nArray[i]] = {};
						}
						p = back[nArray[i]];
					} else if (i == (nArray.length - 1)) {
						p[nArray[i]] = this.value || '';
					} else {
						if (p[nArray[i]]) {
							p[nArray[i]] = $.extend({}, p[nArray[i]]);
						} else {
							p[nArray[i]] = {};
						}
						p = p[nArray[i]];
					}
				}
				if (o[nArray[0]]) {
					o[nArray[0]] = $.extend({}, o[nArray[0]], back[nArray[0]]);
				} else {
					o[nArray[0]] = back[nArray[0]];
				}
				return;
			}
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	}; 
}(jQuery));
/*!
 * @name: gridtree jquery plugin
 * @author: ray zhang
 * @datetime: 2013-06-28
 * @version: 1.2
 *
 * Copyright (c) 2013 Gtmap Ltd. All Rights Reserved.
 *
 * change-log： 
 * 0.1.0.1 	点击根节点会调用showChild
 * 0.1.0.2 	默认显示其子列表的根节点图标显示错误
 * 0.1.1   	添加trigger定义
 * 0.1.2   	添加fetchCallback功能
 * 0.2		添加 listtree 插件，支持 ul 标签
 * 1.0		重构，面向对象风格。支持页面多次使用插件
 * 1.1		隐藏时添加 hide class,而不是 display none;
 * 1.2      增加hideCallback, openCallback; 删除未使用的 defaults 参数
 * 1.2.1	修复bug，异步一次加载多级会有错乱现象
 * 1.2.3	修复bug, 异步加载渲染样式错误
 */
(function($){
	"use strict";
	
	var defaults = {
		fetchCallback : null
		, hideCallback : function( item ){
			item.find('.icon-folder-open').addClass('icon-folder-close').removeClass('icon-folder-open');
		}
		, openCallback : function( item ){
			console.log(item);
			item.find('.icon-folder-close').removeClass('icon-folder-close').addClass('icon-folder-open');
		}
	}
	
	, options
	
	, Tree = function(option, elem){
		this.options = option;
		this.elem = $(elem);
		this.init();
	};
	
	Tree.prototype = {
		init : function(){
			var self = this;
			$(self.elem).children('tr,li').each(function(){
				self.renderItem( this );
			});
			
			$(self.elem).delegate('._treetoggle', 'click', function(){
				self.move($(this).parents('li,tr')[0]);
			});
		}
		, renderItem : function( item ){
			if( !$(item).find('._treetoggle, ._root').length ){
				var pNum = this.parentNumber( item )// parents number
				, cStatus = this.childrenStatus( item );// children status
				// add blank based on parents
				// add toggle based on children
				this.addPrefix(pNum, cStatus, item);
				return item;
			}
		}
		, parentNumber : function( item ){
			var parentId = $(item).attr('data-parent')
				, num = 0;
			if( parentId ){
				num = num + 1;
				num = num + this.parentNumber( '#'+parentId );
			}
			return num;
		}
		// 1: 有且显示着， 0：没，不需要显示； 2：有，但是目前没有显示，需要异步加载
		, childrenStatus : function( item ){
			var back = $( '[data-parent="' + $(item).attr('id') + '"]' ).length ? 1 : 0;
			if( !back && $(item).attr('data-has-child') === 'true' ){
				back = 2;
			}
			return back;
		}
		, move : function( item ){
			var id = $(item).attr('id')
				, toggle = $(item).find('._treetoggle')
				, cStatus = this.childrenStatus( item );
			if( toggle.hasClass('_open') ){
				this.hideChildren(id);
			} else if ( toggle.hasClass('_close') && cStatus === 1 ){
				this.elem.find('[data-parent='+ id +']').removeClass('hide');
				$(item).find('._close').removeClass('_close').addClass('_open');
				this.options.openCallback( $(item) );
			} else {
				this.fetch( item );
			}
		}
		, hideChildren : function( id ){
			var self = this;
			this.elem.find('[data-parent='+ id +']').each(function(){
				$(this).addClass('hide');
				self.hideChildren( $(this).attr('id') );
			});
			$('#'+id).find('._open').removeClass('_open').addClass('_close');
			self.options.hideCallback( $('#'+id) );
		}
		, addPrefix : function(pNum, cStatus, item){
			var blank = "<i class='ico ico-blank'></i>"
				, open = "<i class='_treetoggle ico _open'></i>"
				, close = "<i class='_treetoggle ico _close'></i>"
				, root = "<i class='ico _root'></i>"
				, cell;
				
			cell = $(item).children('td:first-child').length ? $(item).children('td:first-child') : $(item).children('a');
			cell.html('<span>'+ cell.html() +'</span>');
			
			switch(cStatus){
				case 1:
					cell.prepend(open);
					break;
				case 0:
					cell.prepend(root);
					break;
				case 2:
					cell.prepend(close);
					break;
			}
			
			for( var i=0 ; i<pNum ; i++ ){
				cell.prepend(blank);
			}
		}
		, fetch : function( item ){
			var self = this
				, reqUrl = $(item).attr('data-url');
			if( !reqUrl ){
				alert('没有设置标签属性data-url');
				return;
			}
			reqUrl && $.ajax({
				url : reqUrl,
				dataType : 'html',
				success : function(msg){
					var div = $('<div />');
					div.html(msg);
					$(item).after(div.html())
						   .find('._treetoggle')
						   .removeClass('_close')
						   .addClass('_open');
					$( $(item).parents('ul,table')[0] ).children('tr,li').each(function(){
						self.renderItem( this );
					});
				}
			})
		}
	};
	
	$.fn.listtree = function( option ){
		return this.each( function(){
			$(this).addClass('_listtree');
			var options = $.extend( {}, defaults, option );
			var tree = $(this).data('tree');
			if( !tree ) $(this).data('tree', (tree = new Tree(options, this)));
		});
	};
	
	$.fn.gridtree = function( option ){
		return this.each( function(){
			var options = $.extend( {}, defaults, option );
			$(this).addClass('_gridtree');
			var tree = $(this).data('tree');
			if( !tree ) $(this).data('tree', (tree = new Tree(options, this)));
		});
	}

}(jQuery));
/*!
 * 信息提示框
 * v0.1
 * Author: Ray Zhang
 */
(function($){
  $.infopane = {};
  $.infopane.show = function( text, classname, callback ){
    $.infopane.pane = $.infopane.pane || $('#_infopane');
    text && $.infopane.setText(text);
    (classname && $.infopane.pane.attr('class', classname)) || $.infopane.pane.attr('class', '')
    $.infopane.pane.fadeIn('fast',callback);
  }
  
  $.infopane.setText = function( text ){
    $.infopane.pane.html(text);
  }
  
  $.infopane.hide = function(){
    $.infopane.pane.fadeOut();
  }
  
  $.infopane.animate = function(text, classname){
    $.infopane.show(text, classname, function(){
      setTimeout( $.infopane.hide, 800 );
    });
  }
}(jQuery));
/*!
 * @name: loading jquery plugin
 * @author: ray zhang
 * @datetime: 2013-06-28
 * @version: 1.2
 *
 * Copyright (c) 2013 Gtmap Ltd. All Rights Reserved.
 *
 * change-log
 * 1.0 init
 * 1.1 支持指定容器而非全屏
 */
(function($){
	var LoadingPanel = function () {
        return this;
    };

    LoadingPanel.prototype = {
        tmpl: "<div id='_loadingWrap' class='._loading_wrap'><div class='_inner'><div class='_main'></div><div class='_cover'></div></div></div>",
        
        show: function (text, ctn) {
        	$('._loading_wrap').remove();
        	var wrap = ctn || 'body'
        		, txt = text || '正在努力加载'
        		, tmpl = $(this.tmpl)
            	, loading;
            this.elem = tmpl;
            loading = this.elem.find('._main');
            loading.html(txt);
            $(wrap).css('position','relative').append(this.elem);
        	this.elem.css('display','block');
        	loading.css('margin-left', '-' + loading.outerWidth()/2 + 'px');
        	
        },

        hide: function () {
            this.elem.fadeOut('fast',function(){
                $('._loading_wrap').remove();
            });
        }
    };
   	window.loading = new LoadingPanel();
}(jQuery));
// Place any jQuery/helper plugins in here.
(function($){
  var Slider = function( elem ){
    this.slider = $(elem).find('.slider');
    this.toggles = $(elem).find('.toggles').children('a');
    this.items = this.slider.children('li');
    this.items.css('display','none');
    this.showByIdx(0);
    this.autoRun();
  };
  
  Slider.prototype = {
    showByIdx : function( idx ){
      if( this.current === idx ) return;
      
      var self = this
        , desc = $(self.items[idx]).find('.banner-desc')
        , top = 0;
      
      this.items.fadeOut();
      this.items.find('.banner-desc').animate({'opacity':0, 'top': top-20 + 'px'},600);
      
      $(this.items[idx]).fadeIn(800, function(){
        desc.animate({'opacity':1, 'top': top + 'px'},400);
      });
                        
      this.current = idx;
      this.showToggleByIdx(idx);
      return idx;
    }
    , showToggleByIdx : function( idx ){
      $(this.toggles).addClass('cloze').removeClass('open');
      $(this.toggles[idx]).removeClass('cloze').addClass('open');
    }
    , autoRun : function( idx ){
      var start = idx ? idx : 0,
        self = this;
      this.funcAuto = setInterval(function(){
        self.current === (self.items.length - 1) && (start = 0);
        self.showByIdx( start );
        start++;
      }, 8000);
    }
  };
  
  $.fn.slider = function(){
    var slider = new Slider(this);
    this.find('.toggles').children('a').click(function(){
      clearInterval( slider.funcAuto );
      slider.showByIdx( $(this).index() );
    });
  };
}(jQuery));