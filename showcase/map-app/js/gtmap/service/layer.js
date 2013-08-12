define(function(){
  
  function createSplitMap(){
    
  }
    
    return {
      'layerCompare' : function(){
        var $self = $(this);
        $self[ $self.hasClass('active') ? 'removeClass' : 'addClass' ]('active');
      }
      , 'layerShowHide' : function(){
        var $self = $(this);
        map.getLayer($self.attr('data-id'))[ $self.is(':checked') ? 'show' : 'hide' ]();
      }
    }
  }
);