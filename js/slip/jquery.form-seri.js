/*!
 * 表单序列化成json插件定义
 *
 * 支持 name.name1.name2这种 input name转化
 *
 * change log:
 * 0.2 将所有 " 转换为 \"
 */
(function($){
	$.fn.serializeObject = function() {
		var html_transfer = function(str) {
			str = str.replace(/"/g, '\\"')
					 .replace(/'/g, '\\"')
					 .replace(/‘/g, '\\"')
					 .replace(/’/g, '\\"')
					 .replace(/“/g, '\\"')
					 .replace(/”/g, '\\"');
			return str;
		}
		var o = {};
		var a = this.serializeArray();
		var back = {}, p;
		$.each(a, function() {
			this.value = html_transfer(this.value);
			//console.log(this.name + "  " + this.value.replace(/"/g,'\\"'));
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