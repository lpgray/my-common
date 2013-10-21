Ext.define("NotesApp.view.NotesList", {
  extend : "Ext.dataview.List",
  alias : "widget.noteslist",
  config : {
    loadingText : "loading...",
    emptyText : 'No notes Found',
    onItemDisclosure : true, // 显示list item按钮
    itemTpl : '<strong>{title}</strong><br />{narrative}',
    store : 'Notes'
  }
});