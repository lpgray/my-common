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

(function($){
  "use strict";
  
  var defaults = {
    fetchCallback : null
    , hideCallback : function( item ){
      item.find('.icon-folder-open').addClass('icon-folder-close').removeClass('icon-folder-open');
    }
    , openCallback : function( item ){
      console.log(item);
      item.find('.icon-folder-close').removeClass('icon-folder-close').addClass('icon-folder-open');
    }
  }
  
  , options
  
  , Tree = function(option, elem){
    this.options = option;
    this.elem = $(elem);
    this.init();
  };
  
  Tree.prototype = {
    init : function(){
      var self = this;
      $(self.elem).children('tr,li').each(function(){
        self.renderItem( this );
      });
      
      $(self.elem).delegate('._treetoggle', 'click', function(){
        self.move($(this).parents('li,tr')[0]);
      });
    }
    , renderItem : function( item ){
      if( !$(item).find('._treetoggle, ._root').length ){
        var pNum = this.parentNumber( item )// parents number
        , cStatus = this.childrenStatus( item );// children status
        // add blank based on parents
        // add toggle based on children
        this.addPrefix(pNum, cStatus, item);
        return item;
      }
    }
    , parentNumber : function( item ){
      var parentId = $(item).attr('data-parent')
        , num = 0;
      if( parentId ){
        num = num + 1;
        num = num + this.parentNumber( '#'+parentId );
      }
      return num;
    }
    // 1: 有且显示着， 0：没，不需要显示； 2：有，但是目前没有显示，需要异步加载
    , childrenStatus : function( item ){
      var back = $( '[data-parent="' + $(item).attr('id') + '"]' ).length ? 1 : 0;
      if( !back && $(item).attr('data-has-child') === 'true' ){
        back = 2;
      }
      return back;
    }
    , move : function( item ){
      var id = $(item).attr('id')
        , toggle = $(item).find('._treetoggle')
        , cStatus = this.childrenStatus( item );
      if( toggle.hasClass('_open') ){
        this.hideChildren(id);
      } else if ( toggle.hasClass('_close') && cStatus === 1 ){
        this.elem.find('[data-parent='+ id +']').removeClass('hide');
        $(item).find('._close').removeClass('_close').addClass('_open');
        this.options.openCallback( $(item) );
      } else {
        this.fetch( item );
      }
    }
    , hideChildren : function( id ){
      var self = this;
      this.elem.find('[data-parent='+ id +']').each(function(){
        $(this).addClass('hide');
        self.hideChildren( $(this).attr('id') );
      });
      $('#'+id).find('._open').removeClass('_open').addClass('_close');
      self.options.hideCallback( $('#'+id) );
    }
    , addPrefix : function(pNum, cStatus, item){
      var blank = "<i class='ico ico-blank'></i>"
        , open = "<i class='_treetoggle ico _open'></i>"
        , close = "<i class='_treetoggle ico _close'></i>"
        , root = "<i class='ico _root'></i>"
        , cell;
        
      cell = $(item).children('td:first-child').length ? $(item).children('td:first-child') : $(item).children('a');
      cell.html('<span>'+ cell.html() +'</span>');
      
      switch(cStatus){
        case 1:
          cell.prepend(open);
          break;
        case 0:
          cell.prepend(root);
          break;
        case 2:
          cell.prepend(close);
          break;
      }
      
      for( var i=0 ; i<pNum ; i++ ){
        cell.prepend(blank);
      }
    }
    , fetch : function( item ){
      var self = this
        , reqUrl = $(item).attr('data-url');
      if( !reqUrl ){
        alert('没有设置标签属性data-url');
        return;
      }
      reqUrl && $.ajax({
        url : reqUrl,
        dataType : 'html',
        success : function(msg){
          var div = $('<div />');
          div.html(msg);
          $(item).after(div.html())
               .find('._treetoggle')
               .removeClass('_close')
               .addClass('_open');
          $( $(item).parents('ul,table')[0] ).children('tr,li').each(function(){
            self.renderItem( this );
          });
        }
      })
    }
  };
  
  $.fn.listtree = function( option ){
    return this.each( function(){
      $(this).addClass('_listtree');
      var options = $.extend( {}, defaults, option );
      var tree = $(this).data('tree');
      if( !tree ) $(this).data('tree', (tree = new Tree(options, this)));
    });
  };
  
  $.fn.gridtree = function( option ){
    return this.each( function(){
      var options = $.extend( {}, defaults, option );
      $(this).addClass('_gridtree');
      var tree = $(this).data('tree');
      if( !tree ) $(this).data('tree', (tree = new Tree(options, this)));
    });
  }

}(jQuery));
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