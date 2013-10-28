Ext.application({
	name : 'mybb',
	views : ['NewsList'],
	launch : function(){
		var newsView = {
			xtype : 'newslistview'
		}
		Ext.Viewport.add(newsView);
	}
})
