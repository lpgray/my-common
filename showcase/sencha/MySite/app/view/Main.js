Ext.define("MySite.view.Main",{
  extend : "Ext.Container",
  alias : "widget.mainview",
  require : "Ext.dataview.List",
  config : {
    layout : {
      type : 'hbox'
    },
    items : [
      {
        xtype : 'toolbar',
        docked : 'top',
        title : 'My Site'
      },
      {
        xtype : 'container',
        flex : 1,
        layout : {
          type : 'fit'
        },
        items : [
          {
            xtype : 'toolbar',
            docked : 'top',
            title : 'Articles'
          },
          {
            xtype : 'list',
            emptyText : 'No Article Found',
            store : 'articlesStore',
            itemTpl : '<h3 class="a-lst-title">{title}</h3><p class="a-lst-ctn">{content}</p>'
          }
        ]
      },
      // {
        // xtype : 'list',
        // emptyText : 'No Article Found',
        // store : 'articlesStore',
        // itemTpl : '{title} <br /> {content}',
        // flex : 1
      // },
      {
        xtype : 'container',
        flex : 3,
        layout : {
          type : 'fit'
        }
        // items : [
          // {
            // xtype : 'list',
            // emptyText : 'No Article Found',
            // store : 'articlesStore',
            // itemTpl : '{title} <br /> {content}',
            // flex : 1
          // }
        // ]
      }
    ]
  }
});