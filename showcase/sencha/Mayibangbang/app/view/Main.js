Ext.define('mybb.view.Main', {
  extend : 'Ext.TabPanel',
  alias : 'widget.mainview',
  config : {
    fullscreent : true,
    tabBarPosition : 'bottom',
    layout : {
      type : 'card',
      animation : {
        type : 'flip'
      }
    },
    cls : 'c-tabpanel',
    items : [
      {
        title : '首页',
        xtype : 'newslistview',
        iconCls : 'home',
        cls : 'home'
      },
      {
        title : '自己',
        html : '这里是个人中心界面'
      },
      {
        title : '消息',
        html : '这里是消息界面'
      },
      {
        title : '更多',
        html : '这里是更多界面'
      }
    ]
  }
});