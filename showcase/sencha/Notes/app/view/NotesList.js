Ext.define('Notes.view.NotesList',{
  extend : 'Ext.Container',
  alias : 'widget.articleview',
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
            text : '创建'
          }
        ]
      },
      {
        xtype : 'list',
        itemTpl : '<strong>{title}</strong><p>{content}</p>',
        loadingText : '正在加载日记...',
        emptyText : '没有日记',
        store : 'notesStore'
      }
    ]
  }
});
