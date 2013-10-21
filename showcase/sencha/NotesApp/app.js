Ext.application({
  name : "NotesApp",
  views: ["NotesListContainer", "NotesList", "NoteEditor"], //使用视图配置来通知程序在NoteListContainer视图上有一个依赖
  controllers: ["Notes"],
  models : ["Note"],
  stores : ['Notes'],
  launch : function() {
    // var notesListContainer = Ext.create("NotesApp.view.NotesListContainer");
    var notesListContainer = {
      xtype : "noteslistcontainer"
    }
    var noteView = {
      xtype : "noteeditor"
    }
    Ext.Viewport.add([notesListContainer, noteView]);
    console.debug("App launched!");
  }
});