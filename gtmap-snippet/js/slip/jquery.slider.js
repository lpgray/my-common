// Place any jQuery/helper plugins in here.
(function($){
  var Slider = function( elem ){
    this.slider = $(elem).find('.slider');
    this.toggles = $(elem).find('.toggles').children('a');
    this.items = this.slider.children('li');
    this.items.css('display','none');
    this.showByIdx(0);
    this.autoRun();
  };
  
  Slider.prototype = {
    showByIdx : function( idx ){
      if( this.current === idx ) return;
      
      var self = this
        , desc = $(self.items[idx]).find('.banner-desc')
        , top = 0;
      
      this.items.fadeOut();
      this.items.find('.banner-desc').animate({'opacity':0, 'top': top-20 + 'px'},600);
      
      $(this.items[idx]).fadeIn(800, function(){
        desc.animate({'opacity':1, 'top': top + 'px'},400);
      });
                        
      this.current = idx;
      this.showToggleByIdx(idx);
      return idx;
    }
    , showToggleByIdx : function( idx ){
      $(this.toggles).addClass('cloze').removeClass('open');
      $(this.toggles[idx]).removeClass('cloze').addClass('open');
    }
    , autoRun : function( idx ){
      var start = idx ? idx : 0,
        self = this;
      this.funcAuto = setInterval(function(){
        self.current === (self.items.length - 1) && (start = 0);
        self.showByIdx( start );
        start++;
      }, 8000);
    }
  };
  
  $.fn.slider = function(){
    var slider = new Slider(this);
    this.find('.toggles').children('a').click(function(){
      clearInterval( slider.funcAuto );
      slider.showByIdx( $(this).index() );
    });
  };
}(jQuery));