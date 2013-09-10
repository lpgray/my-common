/*!
 * @name: loading jquery plugin
 * @author: ray zhang
 * @datetime: 2013-06-28
 * @version: 1.2
 *
 * Copyright (c) 2013 Gtmap Ltd. All Rights Reserved.
 *
 * change-log
 * 1.0 init
 * 1.1 支持指定容器而非全屏
 */
(function($){
	var LoadingPanel = function () {
        return this;
    };

    LoadingPanel.prototype = {
        tmpl: "<div id='_loadingWrap' class='._loading_wrap'><div class='_inner'><div class='_main'></div><div class='_cover'></div></div></div>",
        
        show: function (text, ctn) {
        	$('._loading_wrap').remove();
        	var wrap = ctn || 'body'
        		, txt = text || '正在努力加载'
        		, tmpl = $(this.tmpl)
            	, loading;
            this.elem = tmpl;
            loading = this.elem.find('._main');
            loading.html(txt);
            $(wrap).css('position','relative').append(this.elem);
        	this.elem.css('display','block');
        	loading.css('margin-left', '-' + loading.outerWidth()/2 + 'px');
        	
        },

        hide: function () {
            this.elem.fadeOut('fast',function(){
                $('._loading_wrap').remove();
            });
        }
    };
   	window.loading = new LoadingPanel();
}(jQuery));