$.infopane.show('地图初始化...');

var map
    , services = []
    , identifyTask
    , identifyParams
    , identifyServiceUrl = "http://192.168.0.202:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer"
    , identifyRunner
    , symbol

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

require(['gtmap/ctrl', 'esri/map'], function(ctrl, Map) {
	map = new Map('mainMap', {
		logo : false,
		sliderStyle : 'large'
	});
	
	var map1 = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.0.202:8080/oms/arcgisrest/道路/JCDL_2013/MapServer");
	dojo.connect( map1, 'onLoad', ctrl.loadServiceTree );
	var map2 = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.0.202:8080/oms/arcgisrest/行政区/JSXZQ/MapServer");
	dojo.connect( map2, 'onLoad', ctrl.loadServiceTree );
	
	var map3 = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.0.202:8080/oms/arcgisrest/底图/JiangsuIndex/MapServer");
  dojo.connect( map3, 'onLoad', ctrl.loadServiceTree );
  
  var map4 = new esri.layers.ArcGISDynamicMapServiceLayer("http://192.168.0.202:8080/oms/arcgisrest/测试/JCDL_TEST/MapServer");
  dojo.connect( map4, 'onLoad', ctrl.loadServiceTree );
	
	services.push(map1, map2, map3, map4);
	
	map.addLayers(services);
  
	dojo.connect(map, 'onLoad', function() {
		ctrl.bindHandler();
		
		$.infopane.setText('完成!');
		$.infopane.hide();
    
		symbol = new esri.symbol.SimpleMarkerSymbol();
		symbol.setStyle(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE);
		symbol.setSize(10);
		symbol.setColor(new dojo.Color([255, 255, 0, 0.5]));
		
	});
});