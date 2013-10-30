Ext.define('mybb.view.NewsList', {
	extend : 'Ext.Container',
	alias : 'widget.newslistview',
	config : {
		layout : {
			type : 'fit'
		},
		items : [
			{
				xtype : 'toolbar',
				docked : 'top',
				title : '最新周边',
				items : [
					{
						xtype : 'button',
						text : '创建'
					},
					{ xtype : 'spacer' },
					{
						xtype : 'button',
						text : '刷新'
					}
				]
			},
			{
				xtype : 'list',
				data : [
					{ id : '1', avator : 'img/esri.jpg', nickName : '小张杨可爱多' },
					{ id : '2', avator : 'img/face.jpg', nickName : '蚂蚁帮帮' },
					{ id : '3', avator : 'img/miao.jpg', nickName : '小猫小猫笑嘻嘻' }
				],
				disableSelection : true,
				itemTpl : '<div class="c-news-item c-news-item-wrap">' + 
							'<div class="c-news-item-left">' + 
								'<i class="c-avator" style="background-image: url({avator});"></i>' + 
								'<i class="c-news-type"></i>' + 
							'</div>' + 
							'<div class="c-news-item-right">' + 
								'<h2 class="c-nickname">{nickName}</h2>' + 
								'<div class="c-news-item-line c-relative">' + 
									'<span class="c-distance">距你 1.2 km</span>' + 
									'<span class="c-aword c-right">陪您看电影</span>' + 
								'</div>' + 
								'<div class="c-news-item-line c-split-bottom">' +
									'<p>测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述测试任务描述</p>' + 
								'</div>' + 
								'<div class="c-news-item-line c-relative">' + 
									'<span class="c-chart-num">0</span>' + 
									'<span class="c-sent-time c-right">2分钟前</span>' + 
								'</div>' + 
							'</div>' + 
						'</div>'
			}
		]
	}
});