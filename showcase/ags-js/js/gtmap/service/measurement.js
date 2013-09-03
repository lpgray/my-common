define(['esri/dijit/Measurement'], function( Measure ){
    var measurement;
    
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
        $.infopane.animate('量算启用');
      }
    }
  }
);