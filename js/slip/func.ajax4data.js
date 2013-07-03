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
 */
Utils.ajax4data = function() {
	$(document).delegate('.a4d', 'click', function() {
		var url = $(this).attr('data-url') || $(this).attr('href')
		, sCtn = $(this).attr('data-result-ctn')
		, method , ctn;

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
		// loading.show('正在请求数据');
		url && $.ajax({
			url : url,
			dataType : 'html',
			success : function(msg){
				ctn[method](msg);
				ctn.find('form').validationEngine();
				// loading.hide();
			}
		});
		return false;
	});
};
Utils.ajax4data();
