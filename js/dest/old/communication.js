/*
 *全局配置validationEngine
 */
( function() {
		var V_SET = {
			onFieldFailure : function(ui, info) {
				if (ui) {
					ui.parent().removeClass('success').addClass('error');
					var infos = info.replace(/\<br\/\>/g, "@").split('@');
					ui.next('.help-inline').html(infos[0]);
				}
			},
			onFieldSuccess : function(ui) {
				if (ui) {
					ui.parent().removeClass('error');
					ui.next('span[class="help-inline"]').html('');
				}
			},
			showPrompts : false,
		};
		$.validationEngine.defaults = $.extend({}, $.validationEngine.defaults, V_SET);
	}(jQuery));
/*
 * ajax请求一些数据，将抓取到的数据显示在指定列表中
 */
function ajax4Data() {
	var a4dcbk = {
		renderGridTree : function(msg) {
			if (msg) {
				$(this).gridtree();
				alert('这个表格被树状化了。');
			}
		}
	}

	$(document).delegate('.j_a4d', 'click', function() {
		if( $(this).hasClass('j_ajax_remove') && !window.confirm('确认执行删除操作？')){
			return false;
		}
		var reqUrl = $(this).attr('data-url') || $(this).attr('href')
			, sCtn = $(this).attr('data-result')
			, ctn
			, callback = $(this).attr('data-callback');

		if (!sCtn) {
			alert('没有设定存放结果的容器选择符');
			return false;
		}
		ctn = $(sCtn);
		reqUrl && $.ajax({
			method : "GET",
			dataType : "html",
			url : reqUrl,
			success : function(msg) {
				ctn.html(msg);
				callback && a4dcbk[callback].apply(ctn, [msg]);
			}
		});
		return false;
	});
}ajax4Data();
/*
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

			$.ajax({
				url : form.attr('action'),
				type : form.attr('method') || 'get',
				data : form.serialize(),
				success : function(msg) {
					opts.callback && opts.callback(msg);
				}
			});
			alert('ajax提交表单到这个action : ' + form.attr('action'));
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
/*
 * ajax上传文件
 */
$('#J_UPLOAD_NAIL').click(function() {// 点击提交上传图表单

	var self = $(this)
		, val = $('#J_IMG').val()
		, p = val.lastIndexOf('.')
		, type = val.substring(p)
		, reqUrl = self.attr('href');

	if (type === ".jpg" || type === ".jpeg" || type === ".png") {

		loading.show('正在上传图片');

		$.ajaxFileUpload({
			url : reqUrl,
			secureuri : false,
			dataType : "html",
			fileElementId : 'J_IMG',
			success : function(mapId, status) {

				var imgCtn = $('#J_NAIL_WRAP')
					, img = imgCtn.children('img')
					, srcs = img.attr('src')
					, newImg;

				img.remove();

				newImg = new Image();
				newImg.src = srcs + "?d=" + new Date();
				imgCtn.append(newImg);
				loading.hide();
				self.next('.text-success').removeClass('hide');
			}
		});
	}

	return false;
});
/*
 * 删除前的确认
 */
( function($) {
		// 普通链接删除。
		$(document).delegate('.j_remove', 'click', function() {
			return window.confirm('确认删除吗？');
		});
	}(jQuery)); 

