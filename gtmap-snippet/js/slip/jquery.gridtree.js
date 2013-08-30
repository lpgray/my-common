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