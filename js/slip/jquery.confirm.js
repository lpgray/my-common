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
	};
	
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
	};

}(window.jQuery));