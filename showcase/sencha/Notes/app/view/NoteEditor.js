Ext.define('Notes.view.NoteEditor', {
  alias : 'widget.noteEditorView',
  extend : 'Ext.form.Panel',
  require : 'Ext.form.FieldSet',
  config : {
    scrollable:'vertical',
    items : [
      {
        xtype : 'toolbar',
        title : '编辑日记',
        docked : 'top',
        items : [
          {
            xtype : 'button',
            ui : 'back',
            iconCls : 'arrow_left',
            itemId : 'btnBack'
          },
          { xtype : 'spacer' },
          {
            xtype : 'button',
            text : '保存',
            itemId : 'btnSave'
          }
        ]
      },
      {
        xtype : 'fieldset',
        title : '编辑日记',
        instructions : '请编辑你的日记吧！',
        items : [
          {
            xtype : 'textfield',
            name : 'title',
            label : '日记名称'
          },
          {
            xtype : 'textareafield',
            name : 'content',
            label : '日记正文'
          }
        ]
      },
      {
        xtype : 'toolbar',
        docked : 'bottom',
        items : [
          {
            xtype : 'button',
            ui : 'decline',
            iconCls : 'trash',
            itemId : 'btnRemove'
          }
        ]
      }
    ],
    listeners : [
      {
        delegate : '#btnSave',
        event : 'tap',
        fn : 'onBtnSaveTap'
      },
      {
        delegate : '#btnBack',
        event : 'tap',
        fn : 'onBtnBackTap'
      },
      {
        delegate : '#btnRemove',
        event : 'tap',
        fn : 'onBtnRemoveTap'
      }
    ]
  },
  onBtnSaveTap : function(){
    this.fireEvent('saveNoteCommand', this);
  },
  onBtnBackTap : function(){
    this.fireEvent('backCommand', this);
  },
  onBtnRemoveTap : function(){
    this.fireEvent('removeNoteCommand', this);
  }
});
