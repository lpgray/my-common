define(function(){
    return {
      'city-chose' : function(){
        var self = $(this)
            , city = self.html()
            , cityCtn = $('#cities').children('strong');
        cityCtn.html(city);
      }
    }
  }
);