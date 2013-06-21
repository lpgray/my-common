/*
 * 将带有多级属性的对象转换成单级别
 */
window.multipleToSingle = function(obj, prefix) {
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
/*
 * 获取当前url中的参数值
 */
window.getUrlParam = function(paramName) {
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
}
/*
 * 表单序列化成json
 *
 * 支持 name.name1.name2这种 input name转化
 */
( function($) {
		$.fn.serializeObject = function() {
			var o = {}, a = this.serializeArray(), back = {}, p;
			$.each(a, function() {
				if (this.name.indexOf('.') > -1) {
					var nArray = this.name.split('.');
					for ( i = 0; i < nArray.length; i++) {
						if (i == 0) {
							if (back[nArray[i]]) {
								back[nArray[i]] = $.extend({}, back[nArray[i]]);
							} else {
								back[nArray[i]] = {};
							}
							p = back[nArray[i]];
						} else if (i == (nArray.length - 1)) {
							p[nArray[i]] = this.value || '';
						} else {
							if (p[nArray[i]]) {
								p[nArray[i]] = $.extend({}, p[nArray[i]]);
							} else {
								p[nArray[i]] = {};
							}
							p = p[nArray[i]];
						}
					}
					if (o[nArray[0]]) {
						o[nArray[0]] = $.extend({}, o[nArray[0]], back[nArray[0]]);
					} else {
						o[nArray[0]] = back[nArray[0]];
					}
					return;
				}
				if (o[this.name] !== undefined) {
					if (!o[this.name].push) {
						o[this.name] = [o[this.name]];
					}
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
			});
			return o;
		};
	}(jQuery));
