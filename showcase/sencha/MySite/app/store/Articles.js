Ext.define("MySite.store.Articles", {
  extend : "Ext.data.Store",
  config : {
    storeId : 'articlesStore',
    model : "MySite.model.Article",
    data : [
      { title : '文章1-hello world', content : 'hello world......' },
      { title : '文章1-hello world', content : 'hello world......' }
    ]
  }
});