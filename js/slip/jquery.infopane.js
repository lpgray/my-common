/*!
 * 信息提示框
 * v0.1
 * Author: Ray Zhang
 */
(function($){
  $.infopane = {};
  $.infopane.show = function( text, classname, callback ){
    $.infopane.pane = $.infopane.pane || $('#_infopane');
    text && $.infopane.setText(text);
    (classname && $.infopane.pane.attr('class', classname)) || $.infopane.pane.attr('class', '')
    $.infopane.pane.fadeIn('fast',callback);
  }
  
  $.infopane.setText = function( text ){
    $.infopane.pane.html(text);
  }
  
  $.infopane.hide = function(){
    $.infopane.pane.fadeOut();
  }
  
  $.infopane.animate = function(text, classname){
    $.infopane.show(text, classname, function(){
      setTimeout( $.infopane.hide, 800 );
    });
  }
}(jQuery));