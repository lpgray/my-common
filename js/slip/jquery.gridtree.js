 /*!
 * @name: gridtree jquery plugin
 * @author: ray zhang
 * @datetime: 2013-06-28
 * @version: 0.2
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
 */
(function($){
	"use strict";
	
	var defaults = {
		 empty : "<span class='_empty'>&nbsp;</span>"
		, trigger_root : "<span class='gridtree_trigger _root'>&nbsp;</span>"
		, trigger_open : "<span class='gridtree_trigger _open'>&nbsp;</span>"
		, trigger_close : "<span class='gridtree_trigger _close'>&nbsp;</span>"
		, nameWrap : "<span class='name'></span>"
		, hiddenClass : "gridtree_h0"
		, trigger : ".gridtree_trigger"
		, root_class : '_root'
		, open_class : '_open'
		, close_class : '_close'
		, grid : true
		, fetchCallback : null
	}
	
	, options
	
	, methods = {
		
		render : function( list_item ){
			var td = options.grid ? $(list_item).children('td:first-child') : $(list_item).children('a')
				, name = td.html()
				, pNum = methods.hasParent( $(list_item) )
				, iHc = methods.hasChild( $(list_item) );
			
			options.grid ? td.children('span').remove() : td.children('i').remove();
			
			td.html( methods.getNameTpl(name) );
			
			if( iHc ){
				if ( iHc == 1){
					td.prepend(options.trigger_open);
				}else{
					td.prepend(options.trigger_close);
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
			$(tr).find('.gridtree_trigger').removeClass( options.close_class ).addClass( options.open_class );
		}
		, hideChild : function( tr ){
			$(tr).find('.gridtree_trigger').removeClass( options.open_class ).addClass( options.close_class );
			$( '[data-parent="' + $(tr).attr('id') + '"]' ).each(function(){
				$(this).addClass('gridtree_h0');
				$(this).find('.gridtree_trigger').removeClass( options.open_class ).addClass( options.close_class );
				methods.hideChild( $(this) );
			});
		}
		, fetchChild : function( tr ){
			var reqUrl = $(tr).attr('data-url');
			if( !reqUrl ){
				alert('没有设置标签属性data-url');
				return;
			}
			reqUrl && $.ajax({
				url : reqUrl,
				dataType : 'html',
				success : function(msg){
					//console.log(msg);
					var dom = methods.renderResult(msg);
					
					$(tr).after( dom ).find('.gridtree_trigger').removeClass( options.close_class ).addClass( options.open_class );
				}
			})
		}
		, getTpl : function( name, num ){
			var	back = "",
				i;
			for ( i = 0; i<num ; i++){
				back = back + options[name];
			}
			return back;
		}
		, getNameTpl : function( name ){
			var tpl = $(options.nameWrap);
			tpl.html(name);
			return $('<div/>').append(tpl).html();
		}
		, renderResult : function( items ){
			if( typeof(items) === "object" ){ // 返回的结果是json
				
			} else {
				var div = $('<div/>');
				div.html(items).find('tr,li').each(function(){
					options.fetchCallback && options.fetchCallback( this );
					methods.render(this);
				});
				return div.html();
			}
		}
	}
	
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
			var pNum = this.parentNumber( item )// parents number
				, cStatus = this.childrenStatus( item );// children status
			// add blank based on parents
			// add toggle based on children
			this.addPrefix(pNum, cStatus, item);
			return item;
		}
		, parentNumber : function( item ){
			var parentId = $(item).attr('data-parent')
				, num = 0;
			if( parentId ){
				num = num + 1;
				num = num + this.parentNumber( $('#'+parentId) );
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
					div.children('tr,li').each(function(){
						self.renderItem( this );
					});
					$(item).after(div.html())
						   .find('._treetoggle').removeClass('_close').addClass('_open');
				}
			})
		}
	};
	
	$.fn.listtree = function( option ){
		this.addClass('_listtree');
		var options = $.extend( {}, defaults, option );
		return this.each( function(){
			var tree = $(this).data('tree');
			if( !tree ) $(this).data('tree', (tree = new Tree(options, this)));
		});
	};
	
	$.fn.gridtree = function( option ){
		this.addClass('_gridtree');
		var options = $.extend( {}, defaults, option );
		return this.each( function(){
			var tree = $(this).data('tree');
			if( !tree ) $(this).data('tree', (tree = new Tree(options, this)));
		});
	}

}(jQuery));