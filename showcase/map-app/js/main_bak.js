$.infopane.show('地图初始化...');
dojo.require('esri.map');

var map
    , services = []
    , measurement
    , identifyTask
    , identifyParams
    , identifyServiceUrl = "http://192.168.0.202:6080/arcgis/rest/services/JCDL/XZFW/MapServer"
    , identifyRunner
    , symbol;
    

dojo.addOnLoad(function() {
  $('#mapTypesTree').listtree();

  map = new esri.Map('map', {
    logo : false,
    sliderStyle : 'large'
  });

  var cnxzbj = "http://192.168.0.202:6080/arcgis/rest/services/JCDL/XZFW/MapServer";
  services.push(new esri.layers.ArcGISTiledMapServiceLayer(cnxzbj));
  map.addLayers(services);
  
  dojo.connect(map, 'onLoad', function(){
    
    require(['js/gtmap/core/event.js'], function(e) {
      e.bindHandler();
    });
    
    $.infopane.setText('完成!');
    $.infopane.hide();
    
    symbol = new esri.symbol.SimpleMarkerSymbol();
    symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
    symbol.setSize(10);
    symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
  });
});

function clearOverlay(){
  map.graphics.clear();
  map.infoWindow.hide();
  dojo.disconnect(identifyRunner);
}

function setNavSelect( obj ){
  var self = $(obj);
  self.parents('ul').children().removeClass('active');
  self.parent('li').addClass('active');
  
  $('.widget').fadeOut('fast');
  $('.widget').find('.esriButtonChecked').find('.dijitButtonNode').click();
  clearOverlay();
}

function setNavWithChildrenSelect( obj ){
  var self = $(obj);
  $( self.parents('li.open')[0] ).children('a').children('span').html( self.html() );
  setNavSelect( $( self.parents('li.open')[0] ).children('a') );
  clearOverlay();
}