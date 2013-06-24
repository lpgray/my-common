/*
 * 名字待定...
 * Creator:  Ray Zhang
 * Created: 2013-03-29 10:48
 * Version: 0.1
 * Copyright (c) 2013 Gtmap Ltd. All Rights Reserved.
 *
 */
Array.prototype.contains = function ( needle ) {
   for (i in this) {
       if (this[i] == needle) return true;
   }
   return false;
}
!function() {
	// stop default link behavior
    $(document).on('click', '[href="#"],.disabled', function(e) {
        e.preventDefault();
    });
	/*
	 * @name:	AJAX 绑定提交表单函数
	 *
	 * @params:	要提交的表单 ID, 触发表单提交的按钮 ID, 触发的事件类型， 回调函数， 等待提交时显示的字符
	 */
	function ajaxSubmit(formId, triggerId, eventType, callback, waitText) {
		$('#' + triggerId).live(eventType, function() {
			var form = $("#" + formId);
			if (!form.attr('action')) {
				console.log(form.attr('id') + '的action没有设定');
				return;
			}

			if (!form.validationEngine('validate')) {// 为form进行validationEngine插件验证，如果验证失败退出
				return;
			}

			loading.setText(waitText);
			loading.show();
			$.ajax({
				url : form.attr('action'),
				type : form.attr('method') || 'get',
				data : form.serialize(),
				success : function(msg) {
					callback(msg);
					beforeRemove();
					loading.hide();
				}
			})
		});
	}window.ajaxSubmit = ajaxSubmit;

	

	
	
	var _V_SET = {
	    	onFieldFailure : function(ui){
	    		if( ui ){
	    			ui.parent().parent().removeClass('success').addClass('error');
	    			ui.next('span[class="help-inline"]').html('');
	    		}
	    	},
	    	onFieldSuccess : function(ui){
	    		if( ui ){
	    			ui.parent().parent().removeClass('error').addClass('success');
	    			ui.next('span[class="help-inline"]').html('正确');
	    		}
	    	},
	    	showPrompts : false,
	    };// 全局 ValidationEngine 设置覆盖
	    $.validationEngine.defaults = $.extend({}, $.validationEngine.defaults, _V_SET);
}();