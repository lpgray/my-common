Ext.define("MySite.model.Article", {
  extend : 'Ext.data.Model',
  config : {
    idProperty : 'id',
    fields: [
      { name: 'id', type: 'int' },
      { name: 'dateCreated', type: 'date', dateFormat: 'c' },
      { name: 'title', type: 'string' },
      { name: 'content', type: 'string' }
    ]
  }
});