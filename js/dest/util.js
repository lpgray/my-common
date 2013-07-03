var Utils = {};

Utils.hasFeature = function(str){
	return document.getElementsByTagName('html')[0].className.indexOf(str) > -1;
};

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

Utils.isMobile = function(){
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
};

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
/* 获取当前url中的参数值 */
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