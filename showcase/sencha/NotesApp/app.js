Ext.application({
  name : "NotesApp",
  views: ["NotesList", "NoteEditor"], //使用视图配置来通知程序在NoteListContainer视图上有一个依赖
  controllers: ["Notes"],
  models : ["Note"],
  stores : ["Notes"],
  launch : function() {
    // var notesListContainer = Ext.create("NotesApp.view.NotesListContainer");
    // var notesListContainer = {
      // xtype : "noteslistcontainer"
    // }
    
    var notesListView = {
      xtype : "noteslistview"
    }
    var noteView = {
      xtype : "noteeditorview"
    }
    Ext.Viewport.add([notesListView, noteView]);
    console.debug("App launched!");
  }
});