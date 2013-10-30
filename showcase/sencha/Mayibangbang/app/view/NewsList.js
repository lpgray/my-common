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
				cls : 'c-toolbar',
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
					{ id : '3', avator : 'img/miao.jpg', nickName : '小猫小猫笑嘻嘻' },
					{ id : '4', avator : 'img/esri.jpg', nickName : '小张杨可爱多' },
          { id : '5', avator : 'img/face.jpg', nickName : '蚂蚁帮帮' },
          { id : '6', avator : 'img/miao.jpg', nickName : '小猫小猫笑嘻嘻' }
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
									'<p>大赛将大赛将登记撒迪欧扫地扫的飞洒了第三方的款了风刀霜剑房顶上监控</p>' + 
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