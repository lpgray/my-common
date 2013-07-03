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
			var reqUrl = $(tr).attr('url');
			if( !reqUrl ){
				alert('没有设置 attr url');
				return;
			}
			$.ajax({
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
				div.html(items).find('tr').each(function(){
					options.fetchCallback && options.fetchCallback( this );
					methods.render(this);
				});
				return div.html();
			}
		}
	};
	
	$.fn.listtree = function( option ){
	
		options = $.extend( {}, defaults, option );
		
		return this.each( function(){
			$(this).delegate('a', 'click', function(){
				
				var mark = $(this).children(options.trigger)
					, p = $(this).parent();
				
				if( mark.hasClass( options.root_class ) ){
					return;
				}else if( mark.hasClass( options.open_class ) ){
					methods.hideChild(p);
				}else if( mark.hasClass( options.close_class ) ){
					methods.showChild(p);
				}
				
			});
			
			$(this).children('li').each(function(){
				// console.log(this);
				methods.render( this );
			});
		});
	};
	
	$.fn.gridtree = function( option ){
		
		options = $.extend( {}, defaults, option );
		
		return this.each( function(){
			//console.log( option.trigger );
			$(this).delegate(options.trigger, 'click', function(){
				var btn , tr;
				
				if( options.trigger === '.gridtree_trigger' ){
					btn = $(this);
				} else {
					btn = $(this).find('.gridtree_trigger');
				}
				
				tr = btn.parents('tr')[0];
				
				if( btn.hasClass( options.root_class ) ){
					return;
				}else if( btn.hasClass( options.open_class ) ){
					methods.hideChild(tr);
				}else if( btn.hasClass( options.close_class ) ){
					methods.showChild(tr);
				}
			});
			
			$(this).find('tr').each(function(){
				methods.render( this );
			});
			
		});
		
	}
	
}(jQuery));