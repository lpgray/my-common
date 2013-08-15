$(document).ready(function(){
	$('header').css({'position':'fixed', 'top':0 , 'margin-top' : 0});
	$('header').find('nav').find('a').click(function(){
		var self = $(this),
				domId = self.attr('href').substring(1);
		
		$('body, html').animate({scrollTop : $('#'+domId).offset().top}, 500, function(){
			self.parents('ul').children().removeClass('active');
			self.parent('li').addClass('active');
		});
		return false;
	});
	
	var checkSection = function(){
		$(window).scroll(function(){
			
		});
	}
});
