Ext.application({
  name : "Notes",
  views: ["NotesList", "NoteEditor"],
  controllers: ["Notes"],
  models : ["Note"],
  stores : ["Notes"],
  launch : function() {
    var notesListView = {
      xtype : "notesListView"
    };
    var noteEditorView = {
      xtype : "noteEditorView"
    };
    Ext.Viewport.add([notesListView, noteEditorView]);
  }
});