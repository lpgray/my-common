Ext.define('MySite.controller.Articles', {
  extend : 'Ext.app.Controller',
  config : {
    refs : {
      main : 'mainview'
    }
  },
  launch : function(){
    Ext.getStore('articlesStore').load();
  }
});