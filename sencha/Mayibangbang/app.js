Ext.application({
	name : 'mybb',
	views : ['Main', 'NewsList'],
	launch : function(){
		var mainView = {
		  xtype : 'mainview'
		};
		Ext.Viewport.add([mainView]);
	}
});