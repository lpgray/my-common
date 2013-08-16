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

$(document).ready(function(){
	var $sections = $('body').children('section')
	   ,$header = $('body').children('header')
	   ,topMap = {}
	   ,current
	   ,$nav = $('header').find('nav');
	   
	$sections.each(function(){
	  var self = $(this);
	  topMap[self.offset().top] = self.attr('id');
	});
	
	$header.css({'position':'fixed', 'top':0 , 'margin-top' : 0});
	
	$header.find('a').click(function(){
		var self = $(this),
				domId = self.attr('href').substring(1);
		
		$('body, html').animate({scrollTop : $('#'+domId).offset().top}, 500);
		return false;
	});
	
	$(window).scroll(function(){
	  var scrollTop = $(this).scrollTop();
	  for( var k in topMap ){
	    if( (scrollTop - k) >= 0 && (scrollTop - k) < 100 && current !== k){
	      current = k;
	      var $currentLink = $nav.find('a[href=#'+topMap[current]+']');
	      $currentLink.parents('ul').children('li').removeClass('active');
	      $currentLink.parent().addClass('active');
	      break;
	    }
	  }
	});
});
