Ext.define('Notes.store.Notes', {
  extend : 'Ext.data.Store',
  require : 'Ext.data.proxy.LocalStorage',
  config : {
    storeId : 'notesStore',
    model : 'Notes.model.Note',
    // data : [
      // { title : '日记', content : '这是日记一的内容' },
      // { title : '日记', content : '这是日记一的内容' },
      // { title : '日记', content : '这是日记一的内容' },
      // { title : '日记', content : '这是日记一的内容' }
    // ]
    proxy : {
      type : "localstorage",
      id : "notes"
    },
    grouper : {
      groupFn : function( record ){
        var date2 = record.data.createdAt;
        return date2.getFullYear() + '年' + (date2.getMonth() + 1) + '月' + date2.getDate() + '日';
      },
      sortProperty : 'createdAt'
    }
  }
});