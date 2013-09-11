var Utils = Utils || {};
Utils.pagin = function(dom, page, size, count, max, pre) {
	var maxnum = 5, 
  		pagin = $(dom), 
  		pagePre = 'page.page', 
  		sizePre = 'page.size', 
  		prev = pagin.children('.prev'), 
  		next = pagin.children('.next'), 
  		href = location.href, 
  		prefix = '?';
	
	if (!pre) {
		if (href.indexOf('?') > -1 && href.indexOf(pagePre) == -1) {
			prefix = href + '&';
		} else if (href.indexOf(pagePre) > -1) {
			prefix = href.substring(0, href.indexOf(pagePre));
		} else {
			prefix = '?';
		}
	} else {
		prefix = pre;
	}
	
	var total = Math.ceil(count / size);
	
	if (page == 1) {
		prev.addClass('disabled');
	}
	if (page == total) {
		next.addClass('disabled');
	}
	
	pagin.children('span').children().remove();
	
	var back = '';
	for ( i = 1; i <= total; i++) {
		if (i == page) {
			back += '<a class="active" href="#">'+i+'</a>';
		}else{
		  back += '<a href="'+ prefix + pagePre + '=' + i + '&' + sizePre + '=' + size +'">'+i+'</a>';
		}
	}
	pagin.children('span').html(back);
	
	prev.attr({
		'href' : prefix + pagePre + '=' + (page - 1) + '&' + sizePre + '=' + size + ''
	});
	next.attr({
		'href' : prefix + pagePre + '=' + (page + 1) + '&' + sizePre + '=' + size + ''
	});
	
	function simplify(page) {
		var items = pagin.children('span').children('a'), 
			active = pagin.children('span').children('.active'), 
			aIndex, 
			disNum = [];
			
		if (items.length > max) {
			// get active index
			aIndex = active.index() + 1;
	
			items.each(function(i, link) {
				if (disNum.length >= max)
					return false;
	
				i = i + 1;
	
				if (i === aIndex || i === aIndex - 1 || i === aIndex + 1 || i === 1 || i === 2 || i === items.length - 1 || i === items.length) {
					disNum.push(i);
					return;
				}
			})
			for (var i = aIndex - 2; i > 2; i--) {
				if (disNum.length >= max)
					break;
				disNum.contains(i) || disNum.push(i);
			}
	
			for (var i = aIndex + 2; i < items.length - 1; i++) {
				if (disNum.length >= max)
					break;
				disNum.contains(i) || disNum.push(i);
			}
	
			disNum.sort(function(a, b) {
				return a > b;
			});
	
			items.each(function(i, link) {
				i = i + 1;
				disNum.contains(i) || $(this).remove();
			});
	
			items = pagin.children('span').children('a');
	
			for (var i = 1; i < disNum.length; i++) {
				if (disNum[i] - disNum[i - 1] > 1) {
					$(items[i - 1]).after('<strong> ... </strong>');
				}
			}
		}
	}
	simplify(page);
};