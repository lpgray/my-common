define(['esri/dijit/Measurement'], function( Measure ){
    function measureDefinition(){
      measurement = new Measure({
        map : map
      }, dojo.byId('measureCtn'));
      measurement.startup();
    }
    
    return {
      'measurement' : function(){
        setNavSelect(this);
        measurement || measureDefinition();
        $('#measureCtn').parent('.widget').fadeIn();
      }
    }
  }
);