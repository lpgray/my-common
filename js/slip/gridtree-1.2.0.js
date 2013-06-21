 /*!
 * @name: gridtree jquery plugin
 * @author: ray zhang
 * @datetime: 2013-05-17
 * @version: 0.1.2.0
 *
 * Copyright (c) 2013 Gtmap Ltd. All Rights Reserved.
 *
 * change-log： 
 * 0.1.0.1 	点击根节点会调用showChild
 * 0.1.0.2 	默认显示其子列表的根节点图标显示错误
 * 0.1.1   	添加trigger定义
 * 0.1.2   	添加fetchCallback功能
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
		, trigger : ".gridtree_trigger"
		, fetchCallback : null
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
					//console.log(msg);
					var dom = methods.renderResult(msg);
					
					$(tr).after( dom ).find('.gridtree_trigger').removeClass('_close').addClass('_open');
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
			return $('<div>').append(tpl).html();
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
	
	var options;
	
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
				
				if( btn.hasClass('_root') ){
					return;
				}else if( btn.hasClass( '_open' ) ){
					methods.hideChild(tr);
				}else if( btn.hasClass('_close') ){
					methods.showChild(tr);
				}
			});
			
			$(this).find('tr').each(function(){
				methods.render( this );
			});
			
		});
		
	}
	
}(jQuery));
