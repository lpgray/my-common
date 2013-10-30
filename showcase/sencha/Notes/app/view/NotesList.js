Ext.define('Notes.view.NotesList',{
  extend : 'Ext.Container',
  alias : 'widget.notesListView',
  config : {
    layout : {
      type : 'fit'
    },
    items : [
      {
        xtype : 'toolbar',
        title : 'Notes',
        docked : 'top',
        items : [
          { xtype : 'spacer' },
          {
            xtype : 'button',
            text : '创建',
            itemId : 'btnCreate'
          }
        ]
      },
      {
        xtype : 'list',
        itemTpl : '<b>{title}</b><p>{content}</p>',
        store : 'notesStore',
        itemId : 'J_noteList',
        disableSelection : true,
        itemCls : 'n-note-item',
        grouped : true
      }
    ],
    listeners : [
      {
        delegate : '#btnCreate',
        event : 'tap',
        fn : 'onBtnCreateTap'
      },
      {
        delegate : '#J_noteList',
        event : 'itemsingletap',
        fn : 'onNoteItemTap'
      }
    ]
  },
  // Event获取并发布
  onBtnCreateTap : function(){
    this.fireEvent('newNoteCommand', this);
  },
  onNoteItemTap : function(list, index, target, record, e, eOpts){
  	this.fireEvent('editNoteCommand', this, record);
  }
});