Ext.define('Notes.controller.Notes', {
  extend : 'Ext.app.Controller',
  config : {
    refs : {
      notesListView : 'notesListView',
      noteEditorView : 'noteEditorView'
    },
    control : {
      notesListView : {
        newNoteCommand : 'createNewNote'
      },
      noteEditorView : {
        saveNoteCommand : 'saveNote',
        removeNoteCommand : 'removeNote',
        backCommand : 'backView'
      }
    }
  },
  // Service 层
  createNewNote : function(){
    var noteEditor = this.getNoteEditorView();
    var newNote = Ext.create('Notes.model.Note',{
      title : '',
      content : ''
    });
    console.debug(newNote);
    noteEditor.setRecord(newNote);
    Ext.Viewport.animateActiveItem(noteEditor, {
      type : 'slide',
      direction : 'left'
    });
  },
  backView : function(){
    Ext.Viewport.animateActiveItem(0, {
      type : 'slide',
      direction : 'right'
    });
  },
  saveNote : function(){
    var note = this.getNoteEditorView().getRecord();
    var value = this.getNoteEditorView().getValues();
    var store = Ext.getStore('notesStore');
    note.set('title', value.title);
    note.set('content', value.content);
    store.add(note);
    this.backView();
  },
  removeNote : function(){
    var note = this.getNoteEditorView().getRecord();
    var store = Ext.getStore('notesStore');
    store.remove( note );
    store.sync();
    this.backView();
  },
  // 初始化
  init : function(){
    
  },
  launch : function(){
    Ext.getStore('notesStore').load();
  }
});