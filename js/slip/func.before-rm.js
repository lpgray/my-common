/*!
 * 点击链接询问
 */
function beforeRemove(){
	$('.j_btn_del,.j_ask').click(function(){
		var ask = $(this).attr('data-ask') || '确定执行删除操作吗？'
		return window.confirm(ask);
	});
}