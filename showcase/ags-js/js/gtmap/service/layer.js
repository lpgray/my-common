define(['esri/map'], function( Map ) {
  
  var $mapCtn = $('#mapCtn');
  
  function createSplitMap() {
    var $newMap = $('<div/>');
    $newMap.addClass('map');
    var $children = $mapCtn.children();
    if( $children.length <= 4 ){
      $mapCtn.prepend($newMap);
      if( $children.length == 2 ){
        $mapCtn.children().css({'width':'49.8%'});
      }else if( $children.length == 3 ){
        $mapCtn.children().css({'width':'33.2%'});
      }else if( $children.length == 4 ){
        $mapCtn.children().css({'width':'49.9%', 'height':'50%'});
      }
      var baseMap = new esri.layers.ArcGISTiledMapServiceLayer(baseMapUrl);
          
      var newmap = new Map($newMap[0], {
        logo : false,
        sliderStyle : 'large',
        zoom : 11
      });
      
      newmap.addLayer(baseMap);
      
    }else{
      $.infopane.animate('图层过多!,请先关闭几个','error');
    }
  }

  return {
    'layerCompare' : function() {
      var $self = $(this);
      $self[ $self.hasClass('active') ? 'removeClass' : 'addClass' ]('active');
      createSplitMap();
    },
    'layerShowHide' : function() {
      var $self = $(this);
      map.getLayer($self.attr('data-id'))[ $self.is(':checked') ? 'show' : 'hide' ]();
    }
  }
});