/*! pagin  */
		function refreshPagin(page, size, count, pre) {
			var maxnum = 5
				, pagin = $('#J_PAGIN')
				, pagePre = 'page.page'
				, sizePre = 'page.size'
				, prev = pagin.children('.prev')
				, next = pagin.children('.next')
				, href = location.href
				, prefix = '?';

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
			for ( i = 1; i <= total; i++) {
				var a = $('<a />').attr({
					'href' : prefix + pagePre + '=' + i + '&' + sizePre + '=' + size + ''
				}).html(i);
				pagin.children('span').append(a);
				if (i == page) {
					a.addClass('active');
					a.attr('href', '#');
				}
			}

			prev.attr({
				'href' : prefix + pagePre + '=' + (page - 1) + '&' + sizePre + '=' + size + ''
			});
			next.attr({
				'href' : prefix + pagePre + '=' + (page + 1) + '&' + sizePre + '=' + size + ''
			});

			function simplify(page) {
				var items = pagin.children('span').children('a')
					, active = pagin.children('span').children('.active')
					, aIndex;
				if( items.length > 20 ){
					// get active index
					aIndex = active.index();
					
					items.each(function(i, link){
						/*if( !( i===(aIndex-1) || i===aIndex || i===(aIndex+1) ) ){
							
							
							
						}*/
					});
					
					// display 1 2 .. active -1 active active + 1 .. last-1 last
				}
				
				/*if (total > maxnum) {
					if (page - 1 > 2) {
						for ( i = 3; i <= page - 1; i++) {
							$(items[i - 1]).remove();
						}
						$('<span> .. </span>').insertAfter($(items[1]));
					}

					if (total - page > 2) {
						for ( i = page + 1; i <= total - 2; i++) {
							$(items[i - 1]).remove();
						}
						$('<span> .. </span>').insertAfter($(items[page - 1]));
					}
				}*/
			}

			simplify(page);
			pagin.find('a').addClass('j_pagin_link');
		}glbl.refreshPagin = refreshPagin;


	}(window, window.jQuery));