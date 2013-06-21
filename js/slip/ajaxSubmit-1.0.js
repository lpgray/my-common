/*!
 * ajax提交表单插件
 */
( function($) {
		$.fn.ajaxSubmit = function(opts) {
			this.validationEngine();
			var form = this;
			if (!form.attr('action')) {
				alert(form.attr('id') + '的action没有设定');
				return;
			}

			if (!form.validationEngine('validate')) {// 为form进行validationEngine插件验证，如果验证失败退出
				return;
			}
			
			opts.loading && loading.show( opts.loading );
			
			$.ajax({
				url : form.attr('action'),
				type : form.attr('method') || 'get',
				data : form.serialize(),
				success : function(msg) {
					opts.callback && opts.callback(msg);
					loading.hide();
				}
			});
			return this;
		};

		$(document).delegate('.j_ajax_form', 'click', function() {
			var fId = $(this).attr('data-form');
			if (fId) {
				$('#' + fId).ajaxSubmit();
			} else {
				$($(this).parents('form')[0]).ajaxSubmit();
			}
			return false;
		});
	}(jQuery));