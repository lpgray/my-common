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
        itemId : 'J_noteList'
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
        event : '',
        fn : 'onNoteItemTap'
      }
    ]
  },
  // Event获取并发布
  onBtnCreateTap : function(){
    this.fireEvent('newNoteCommand', this);
  }
});