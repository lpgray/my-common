Ext.application({
  name : "Notes",
  views: ["NotesList"],
  models : ["Note"],
  store : ["Notes"],
  launch : function() {
    var articleview = {
      xtype : "articleview"
    }
    Ext.Viewport.add(articleview);
  }
});