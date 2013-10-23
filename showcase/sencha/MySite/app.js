Ext.application({
  name : "MySite",
  views: ["Main"],
  models : ["Article"],
  stores : ["Articles"],
  controllers : ["Articles"],
  launch : function() {
    var mainView = {
      xtype : "mainview"
    }
    Ext.Viewport.add(mainView);
  }
});