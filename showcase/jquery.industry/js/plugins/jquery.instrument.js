(function($){
	// 仪表盘类定义
	var Instrument = function(id, opts){
		this.$elem = $('#' + id);
		this.elem = Raphael(id);
		this.options = opts;
		
		this.init();
	}
	Instrument.prototype = {
		init : function(){
			var w = this.$elem.width()
					, h = this.$elem.height()
					, x = w > h ? h : w
					, r = this.options.radius
					, x = w/2
					, y = h/2;
					
			this.origin = { x:x, y:y }
			
			this.elem.circle( x, y, this.options.radius );												// 创建表盘
			
			this.createTriangle();																								// 创建初始指针
			
			var origin = this.elem.circle( x, y, this.options.origin_radius ); 		// 创建圆心
					origin.attr({ fill:'#000' });
					
			_utils.createScale( this.elem, this.options.radian, this.origin, 10, 50, 0, 100 ); // 创建刻度
			
			// 创建警示彩条
			this.createStrip();
		}
		, createStrip : function(){
			_utils.createStripe( this.elem, this.options.radian / 2, 177, 35, 10, this.origin );
			_utils.createStripe( this.elem, 183 , 360 - this.options.radian / 2, 35, 10, this.origin );
		}
		, createTriangle : function(){
			var path = _utils.calcPathOfTriangle.call( this, this.origin, 50, 5, 20 );
			this.triangle = this.elem.path( path );
			console.log( this.triangle );
		}
	}
	
	, _utils = {
			/*
			 * @name: 创建刻度
			 * 
			 * @param: 	svg: raphael 对象, 
			 * 					radian: 下方张开的度数
			 * 					orgin: 	圆点坐标{x:'',y:''}
			 * 					length: 绘制的刻度长度
			 * 					radius: 绘制刻度半径
			 * 					min:	最小刻度值
			 * 					max:	最大刻度值
			 */
			createScale : function(paper, radian, orgin, length, radius, min, max){
				var startPoint = radian/2,
					unitDegree = (360 - radian)/(max-min),
					cx = orgin['x'],
					cy = orgin['y'],
					r1 = radius,
					r2 = r1 + length,
					r3 = r2 + 5,
					r4 = r3 + 10;
					
				for ( i=min ; i<=max ; i++ ){
					var x1 = cx - r1*Math.sin(_utils.degress_to_radians(startPoint)),
							y1 = cy + r1*Math.cos(_utils.degress_to_radians(startPoint)),
							x2 = cx - r2*Math.sin(_utils.degress_to_radians(startPoint)),
							y2 = cy + r2*Math.cos(_utils.degress_to_radians(startPoint)),
							x3 = cx - r3*Math.sin(_utils.degress_to_radians(startPoint)),
							y3 = cy + r3*Math.cos(_utils.degress_to_radians(startPoint)),
							x4 = cx - r4*Math.sin(_utils.degress_to_radians(startPoint)),
							y4 = cy + r4*Math.cos(_utils.degress_to_radians(startPoint));
						
					startPoint = startPoint += unitDegree;
					
					if(i%2!=0) continue;
					if(i%10==0){
						paper.path('M'+x1+' '+y1+' L'+x3+' '+y3);
						paper.text(x4, y4, '' + i + '');
					}else{
						paper.path('M'+x1+' '+y1+' L'+x2+' '+y2);
					}
				}
			}
			 /*
				 * @name: 绘制警示彩带
				 * 
				 * @param:	paper: raphael对象
				 * 			startRadian: 开始的弧度
				 * 			endRadian: 结束的弧度
				 * 			radius: 绘制的内侧半径
				 * 			width: 彩带宽度
				 * 			origin: 圆点
				 */
			, createStripe : function(paper, startRadian, endRadian, radius, width, origin){
					var r1 = radius + width,
						r2 = radius,
						cx = origin['x'],
						cy = origin['y'];
						
					var x1 = cx - r1*Math.sin(_utils.degress_to_radians(startRadian)),
						y1 = cy + r1*Math.cos(_utils.degress_to_radians(startRadian)),
						x2 = cx - r1*Math.sin(_utils.degress_to_radians(endRadian)),
						y2 = cy + r1*Math.cos(_utils.degress_to_radians(endRadian)),
						x3 = cx - r2*Math.sin(_utils.degress_to_radians(endRadian)),
						y3 = cy + r2*Math.cos(_utils.degress_to_radians(endRadian)),
						x4 = cx - r2*Math.sin(_utils.degress_to_radians(startRadian)),
						y4 = cy + r2*Math.cos(_utils.degress_to_radians(startRadian));
					
					var start = 'M'+x4+','+y4+'',
						l1 = 'L'+x1+','+y1+'',
						a1 = 'A'+''+r1+','+r1+' 0 0,1 ' +x2+','+y2+'',
						l2 = 'L'+x3+','+y3+'',
						a2 = 'A'+''+r2+','+r2+' 0 0,0 ' +x4+','+y4+'';
					
					paper.path(start+l1+a1+l2+a2+'Z');
				}
			/*
			 * @name : 计算三角绘制路径字符串
			 * 
			 * @param: 	origin: 圆心
			 * 					high: 三角形的高
			 *					width: 三角形的底边
			 * 					radian: 弧度
			 * */
			, calcPathOfTriangle : function(origin, high, width, radians){
					var w2 = width/2,
						cx = origin['x'],
						cy = origin['y'],
						xtop = cx - high*Math.sin(_utils.degress_to_radians(radians)),	// 顶点坐标 x
						ytop = cy + high*Math.cos(_utils.degress_to_radians(radians)),	// 顶点坐标 y
						x1 = cx - w2*Math.sin(_utils.degress_to_radians(radians - 90)), // 一个底边顶点坐标 x
						y1 = cy + w2*Math.cos(_utils.degress_to_radians(radians - 90)), // 一个底边顶点坐标y
						x2 = cx - w2*Math.sin(_utils.degress_to_radians(radians + 90)),					
						y2 = cy + w2*Math.cos(_utils.degress_to_radians(radians + 90)),
						start = 'M'+cx+','+cy+'',
						l1 = 'L'+x1+','+y1+'',
						l2 = 'L'+xtop+','+ytop+'',
						l3 = 'L'+x2+','+y2+'';
						
					return start+l1+l2+l3+'Z';
			}
			 /*
			 * @name: 将刻度计算，得出弧度
			 * 
			 * @param: 	group:刻度组
			 * 			radians: 下方开口弧度
			 * 			scale: 要转换的刻度
			 */
			, scale_to_radians : function(group, scale, radians){
				var unit = (360 - radians) / (group[group.length - 1] - group[0]);
				if( scale > group[group.length - 1])
					return (group[group.length - 1] + 1) * unit + radians/2;
				return scale * unit + radians/2 - group[0] * unit;
			}
			/*
			 * @name: 弧度转角度
			 * 
			 * @param: radians:弧度
			 */
			, radians_to_degress : function(radians){
				return radians*180/Math.PI;
			}
			/*
			 * @name: 角度转弧度
			 * 
			 * @param: degree:角度
			 */
			, degress_to_radians : function(degree){
				return degree*Math.PI/180;
			}
	}
	
	// Plugin definition
	$.fn.instrument = function( options ){
		var opts = $.extend({}, $.fn.instrument.defaults, options);
		if( !this.data('_svg') ) this.data( '_svg' , new Instrument(this.attr('id'), opts) );
		return this;
	}
	
	$.fn.instrument.defaults = {
		origin : {x:100, y:100},	// 原点
		radius : 100,				// 半径
		origin_radius : 5,	// 圆心轴半径
		start : 0,					// 开始刻度
		end : 100,					// 结束刻度
		radian : 80,				// 下方开口角度
		group : [0,20,40,60,80,100],// 刻度分级，用不同颜色的警示彩带标明
		initVal : 0,				//初始刻度值
		measurement : '默认LABEL',	//计量单位默认值
		classStyle : 'default'
	}
	
}(jQuery));