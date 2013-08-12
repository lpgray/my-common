define(function(){
    return {
      'layerCompare' : function(){
        console.log('对比功能启用');
      }
      , 'layerShowHide' : function(){
        var $self = $(this);
        map.getLayer($self.attr('data-id'))[ $self.is(':checked') ? 'show' : 'hide' ]();
      }
    }
  }
);