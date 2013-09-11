// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
// stop default link behavior
$(document).on('click', '[href="#"],.disabled', function(e) {
  e.preventDefault();
});

var Utils = {};

Utils.filterFileName = function(fullPath){
	if (fullPath) {
		var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
		var filename = fullPath.substring(startIndex);
		if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
			filename = filename.substring(1);
		}
		return filename;
	}
};
//检测移动终端
Utils.isMobile = function(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};
//xml编码，将尖括号转换为可显示文本
Utils.encodeXML = function(code){
	return code.replace(/</g,'&lt;').replace(/>/g,'&gt;');
};
/* 将带有多级属性的对象转换成单级 */
Utils.multipleToSingle = function(obj, prefix) {
	var back = {}, sObj;
	prefix ? ( prefix = prefix + ".") : ( prefix = "")
	for (i in obj ) {
		if (Object.prototype.toString.apply(obj[i]) !== '[object Object]') {
			back[prefix + i] = obj[i];
		} else {
			sObj = multipleToSingle(obj[i], i);
			$.extend(true, back, sObj);
		}
	}
	return back;
};
/* 获取当前url中的参数值  */
Utils.getUrlParam = function(paramName) {
	paramValue = "";
	isFound = false;
	if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
		arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
		i = 0;
		while (i < arrSource.length && !isFound) {
			if (arrSource[i].indexOf("=") > 0) {
				if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
					paramValue = arrSource[i].split("=")[1];
					isFound = true;
				}
			}
			i++;
		}
	}
	return paramValue;
};
// 添加原生getElementsByClassName方法
document.getElementsByClassName || (document.getElementsByClassName = function(searchClass,node,tag){
	node = node || document;
	tag = tag || '*';
	var returnElements = []
	var els = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag);
	var i = els.length;
	searchClass = searchClass.replace(/\-/g, "\\-");
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
	while (--i >= 0) {
		if (pattern.test(els[i].className)) {
			returnElements.push(els[i]);
		}
	}
	return returnElements;
});
//快捷ajax方法
function ajax(url, success) {
  $.ajax({
    url : url,
    dataType : 'json',
    type : 'get',
    cache : false,
    success : success,
    error : function(){
      console.error(arguments);
    }
  });
}
// 删除询问
$(document).on('click', '.remove', function(){
  var ask = $(this).attr('data-ask') || '确定执行删除操作吗？'
  return window.confirm(ask);
});