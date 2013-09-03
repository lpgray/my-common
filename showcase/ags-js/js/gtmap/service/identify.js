define(function(){
    function doIdentify( e ){
      $.infopane.show('正在识别地块属性');
      identifyParams.geometry = e.mapPoint;
      identifyParams.mapExtent = map.extent;
      identifyTask.execute(identifyParams, function(results){
        showResult(e, results );
        $.infopane.setText('完成！');
        $.infopane.hide();
      }, function(err){
        $.infopane.show(err, 'error');
        $.infopane.hide();
        console.error(err);
      });
    }
    
    function showResult( e, results ){
      map.graphics.clear();
      var feature = results[0].feature;
      feature.setSymbol(symbol);
      map.graphics.add(feature);
      map.infoWindow.setContent(formatContent( feature.attributes ));
      map.infoWindow.show(e.screenPoint, map.getInfoWindowAnchor(e.screenPoint));
    }
    
    function formatContent( attributes ){
      var back = '';
      for( name in attributes ){
        back += '<strong>' + name + ': </strong>' + attributes[name] + '<br />';
      }
      return back;
    }
    
    function taskDefinition(){
      identifyParams = new esri.tasks.IdentifyParameters();
      identifyParams.tolerance = 3;
      identifyParams.returnGeometry = true;
      identifyParams.layerIds = [5, 2]; // query 省级 and 市级
      identifyParams.width  = map.width;
      identifyParams.height = map.height;
      identifyTask = new esri.tasks.IdentifyTask( identifyServiceUrl );
      console.log('init task..');
    }
    
    return {
      'identify' : function(){
        identifyTask || taskDefinition();
        setNavSelect(this);
        identifyRunner = dojo.connect(map, "onClick", doIdentify);
        $.infopane.animate('属性识别功能启用');
      }
    }
  }
);