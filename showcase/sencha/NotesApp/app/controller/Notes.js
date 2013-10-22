Ext.define("NotesApp.controller.Notes", {
  extend : "Ext.app.Controller",
  requires : "Ext.MessageBox",
  config : {
    refs : {
      // newNoteBtn : "#new-note-btn"
      notesList : "noteslistview",
      noteEditor : "noteeditorview",
    },
    control : {
      notesList : {
        newNoteCommand : "onNewNoteCommand",
        editNoteCommand : "onEditNoteCommand"
      },
      noteEditor : {
        saveNoteCommand : "onSaveNoteCommand",
        delCommand : "onDeleteNoteCommand",
        backCommand : "onBackCommand"
      }
    }
  },
  
  onNewNoteCommand : function() {
    console.debug("tap onNewNote");
    
    var now = new Date();
    var noteId = (now.getTime()).toString();

    var newNote = Ext.create("NotesApp.model.Note", {
        id: noteId,
        dateCreated: now,
        title: "",
        narrative: ""
    });
    
    this.activateNoteEditor(newNote);
  },
  onEditNoteCommand : function(list, record) {
    // var noteEditor = this.getNoteEditor();
    // noteEditor.setRecord(record);
    // Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
    this.activateNoteEditor(record);
  },
  onBackCommand : function(){
     // console.debug('back...');
     this.activateNoteList();
  },
  onSaveNoteCommand : function(){
      // console.log("onSaveNoteCommand");
      var noteEditor = this.getNoteEditor();
  
      var currentNote = noteEditor.getRecord(); // 已经set过的record
      var newValues = noteEditor.getValues(); // 获取fieldsSet对象
  
      // Update the current note's fields with form values.
      currentNote.set("title", newValues.title);
      currentNote.set("narrative", newValues.narrative);
  
      var errors = currentNote.validate();
  
      if (!errors.isValid()) {
          Ext.Msg.alert('Wait!', errors.getByField("title")[0].getMessage(), Ext.emptyFn);
          currentNote.reject();
          return;
      }
  
      var notesStore = Ext.getStore("Notes");
  
      if (null == notesStore.findRecord('id', currentNote.data.id)) {
          notesStore.add(currentNote);
      }
  
      notesStore.sync();
  
      notesStore.sort([{ property: 'dateCreated', direction: 'DESC'}]);
  
      this.activateNoteList();
  },
  onDeleteNoteCommand : function(){
    var noteEditor = this.getNoteEditor();
    var currentNote = noteEditor.getRecord();
    var notesStore = Ext.getStore("Notes");
    
    notesStore.remove(currentNote);
    notesStore.sync();
    this.activateNoteList();
  },
  
  activateNoteEditor: function (record) {
    // console.debug( record );
    var noteEditor = this.getNoteEditor();
    noteEditor.setRecord(record); // load() is deprecated.
    Ext.Viewport.animateActiveItem(noteEditor, this.slideLeftTransition);
  },
  activateNoteList : function(){
    Ext.Viewport.animateActiveItem(this.getNotesList(), this.slideRightTransition);
  },
  
  slideLeftTransition: { type: 'slide', direction: 'left' },
  slideRightTransition: { type: 'slide', direction: 'right' },
  
  launch : function() {
    this.callParent();
    Ext.getStore("Notes").load();
    console.debug("Notes controller launched!");
  },

  init : function() {
    this.callParent();
    console.debug("init Notes controller.");
  }
}); 