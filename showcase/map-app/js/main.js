$.infopane.show('地图初始化...');

var esriRepoUrl = "http://127.0.0.1:8080/arcgis_js_api/library/3.5/3.5/js/esri"
    , dojoRepoUrl = "http://127.0.0.1:8080/arcgis_js_api/library/3.5/3.5/js/dojo/dojo"
    , dijitRepoUrl = "http://127.0.0.1:8080/arcgis_js_api/library/3.5/3.5/js/dojo/dijit"
    , dojoxRepoUrl = "http://127.0.0.1:8080/arcgis_js_api/library/3.5/3.5/js/dojo/dojox"
    , settings = {
        baseUrl : "./js" , 
        packages : [
          { name : "gtmap", location : "gtmap" }
          , { name : "dojo", location : dojoRepoUrl }
          , { name : "esri", location : esriRepoUrl }
          , { name : "dijit", location : dijitRepoUrl }
          , { name : "dojox", location : dojoxRepoUrl }
      ]}
		, map
    , services = []
    , measurement
    , identifyTask
    , identifyParams
    , identifyServiceUrl = "http://www.arcgisonline.cn/ArcGIS/rest/services/Thematic_Drawings/MapServer"
    , identifyRunner
    , symbol;

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


require(settings, ['gtmap/ctrl', 'esri/map'], function(ctrl, Map) {
	$('#mapTypesTree').listtree();

	map = new Map('map', {
		logo : false,
		sliderStyle : 'large'
	});
	
	var baseMap = new esri.layers.ArcGISTiledMapServiceLayer("http://www.arcgisonline.cn/ArcGIS/rest/services/ChinaCities_Community_BaseMap_CHN/NanJing_Community_BaseMap_CHN/MapServer");
	var jsMap = new esri.layers.ArcGISDynamicMapServiceLayer(identifyServiceUrl);
	
	map.addLayers([baseMap, jsMap]);

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