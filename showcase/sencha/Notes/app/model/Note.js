Ext.define('Notes.model.Note', {
  extend : 'Ext.data.Model',
  config : {
    fields : [
      { name : 'id' , type : 'int' },
      { name : 'title', type : 'string' },
      { name : 'content', type : 'string' }
    ]
  }
});