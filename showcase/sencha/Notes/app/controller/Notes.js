Ext.define('Notes.controller.Notes', {
  extend : 'Ext.app.Controller',
  config : {
    refs : {
      notesListView : 'notesListView',
      noteEditorView : 'noteEditorView'
    },
    control : {
      notesListView : {
        newNoteCommand : 'createNewNote',
        editNoteCommand : 'editNote'
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
      // id : new Date().getTime().toString(),
      title : '',
      content : ''
    });
    
    noteEditor.setRecord(newNote);
    this.animateView(1, 'left');
  },
  backView : function(){
  	this.animateView(0, 'right');
  },
  saveNote : function(){
    var note = this.getNoteEditorView().getRecord();
    var value = this.getNoteEditorView().getValues();
    var store = Ext.getStore('notesStore');
    note.set('title', value.title);
    note.set('content', value.content);
    console.debug(note);
    store.add(note);
    store.sync();
    this.backView();
  },
  removeNote : function(){
    var note = this.getNoteEditorView().getRecord();
    var store = Ext.getStore('notesStore');
    store.remove( note );
    store.sync();
    this.backView();
  },
  editNote : function(list, record){
  	var editView = this.getNoteEditorView();
  	editView.setRecord(record);
  	this.animateView(1, 'left');
  },
  // 切换视图
  animateView : function( idx, direction ){
  	Ext.Viewport.animateActiveItem(idx, {
      type : 'slide',
      direction : direction
    });
  },
  // 初始化
  init : function(){
    
  },
  launch : function(){
    Ext.getStore('notesStore').load();
  }
});