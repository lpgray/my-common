(function($){
	var LoadingPanel = function (text) {
        this.$elem = $(this.tmpl);
        $('body').append(this.$elem);
        this.$loading = this.$elem.find('._gtis_ui_loading');
        this.$cover = this.$elem.find('._gtis_ui_cover');
        this.setText(text);
        return this;
    };

    LoadingPanel.prototype = {
        tmpl: "<div id='_GTIS_UI_LOADING_WIN'><div class='_gtis_ui_loading'></div><div class='_gtis_ui_cover'></div></div>",

        setText: function (text) {
            $(this.$loading).html(text + '...');
        },

        show: function (text) {
            this.$cover.css('display','block');
            this.$loading.fadeIn();
            text && this.setText(text);
            var loading = this.$loading
                , ml = loading.outerWidth();
        	loading.css('margin-left', '-' + ml/2 + 'px');
        },

        hide: function () {
            var self = this;
            this.$loading.fadeOut('fast',function(){
                self.$cover.css('display','none');
            });
        }
    };
   	window.loading = new LoadingPanel('初始化文字');
}(jQuery));