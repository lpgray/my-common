Ext.define("NotesApp.view.NotesList", {
  extend : "Ext.Container",
  alias : "widget.noteslistview",
  // config : {
    // loadingText : "loading...",
    // emptyText : 'No notes Found',
    // onItemDisclosure : true, // 显示list item按钮
    // itemTpl : '<strong>{title}</strong><br />{narrative}',
    // store : 'Notes',
    // grouped : true
  // }
  require : "Ext.dataview.List",
  config : {
    layout : {
      type : 'fit'
    },
    items : [
      {
        xtype : "toolbar",
        title : "My Notes",
        docked : "top",
        items : [
          {
            xtype : "spacer"
          }, {
            xtype : "button",
            text : "New",
            ui : "action",
            itemId : "newButton"
          }
        ]
      },{
        xtype : "list",
        store : "Notes",
        itemId : "notesList",
        loadingText : "Loading Notes...",
        emptyText : "No Notes Found.",
        itemTpl : "{title} <br /> {narrative}",
        onItemDisclosure : true
      }
    ],
    listeners : [{
        delegate : "#newButton",
        event : "tap",
        fn : "onNewBtnTap"
      },{
        delegate : "#notesList",
        event : "disclose",
        fn : "onNotesListDisclose"
      }
    ],
  },
  onNewBtnTap : function(){
    this.fireEvent("newNoteCommand", this);
  },
  onNotesListDisclose : function(list, record, target, index, evt, options){
    this.fireEvent("editNoteCommand", this, record);
  }
});