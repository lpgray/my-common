Ext.define("NotesApp.view.NotesListContainer", {
  extend : "Ext.Container",
  alias : 'widget.noteslistcontainer',
  initialize : function(){
    this.callParent(arguments);
    var newButton = {
      xtype : "button",
      text : "New",
      ui : "action",
      handler : this.onNewButtonTap,
      scope : this
    };
    var topToolBar = {
      xtype : "toolbar",
      title : "My Notes",
      docked : "top",
      items : [
        { xtype : "spacer" },
        newButton
      ]
    };
    var notesList = {
      xtype : "noteslist",
      // store : Ext.getStore("notesstore"),
      listeners : {
        disclose : {
          fn : this.onNotesListDisclose, 
          scope : this
        }
      }
    }
    this.add([topToolBar, notesList]);
  },
  config: {
    layout: {
      type:'fit'
    }
  },
  onNewButtonTap : function(){
    // console.debug('new button tap...');
    this.fireEvent("newNoteCommand", this);
  },
  onNotesListDisclose : function(list, record, target, index, evt, options){
    // console.log("editNoteCommand");
    this.fireEvent('editNoteCommand', this, record);
  }

  // config : {
    // items : [{
      // xtype : "toolbar",
      // docked : "top",
      // title : "My Notes",
      // items : [{
        // xtype : "spacer"
      // }, {
        // xtype : "button",
        // text : "New",
        // ui : "action",
        // id : "new-note-btn"
      // }]
    // }]
  // }
});