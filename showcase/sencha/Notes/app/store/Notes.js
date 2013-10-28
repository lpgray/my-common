Ext.define('Notes.store.Notes', {
  extend : 'Ext.data.Store',
  config : {
    storeId : 'notesStore',
    model : 'Notes.model.Note',
    data : [
      { title : '日记一', content : '这是日记一的内容' },
      { title : '日记一', content : '这是日记一的内容' },
      { title : '日记一', content : '这是日记一的内容' },
      { title : '日记一', content : '这是日记一的内容' }
    ]
  }
});