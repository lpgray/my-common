// 仪表盘插件
(function($){
	// 仪表盘类定义
	var Instrument = function(elem, opts){
		this.$elem = elem;
		_this = this;
		this.options = opts;
		var svgWrap = this.$elem.svg({onLoad: function(svg){
				svg.circle( opts.origin['x'] , opts.origin['y'] , opts.radius );// 创建表盘
				
				createScale(svg, opts.radian, opts.origin, 5, opts.radius/1.7, opts.start, opts.end);	// 创建刻度
				
				var stripeOpt = {
						origin : opts.origin,
						radius : opts.radius/1.7 - 7,
						width : 5,
						radian : opts.radian,
						group : opts.group
					};
				createStripeGroup(svg, stripeOpt);// 创建警示彩带
				
				var pointerOpt = {
						origin : opts.origin ,
						high : opts.radius/1.45,
						width : opts.origin_radius - 2,
					};
				_this.pointer = createPointer(svg , pointerOpt , scale_to_radians( opts.group , opts.initVal , opts.radian  ));	// 创建指针
				_this.pointer.val = opts.initVal;
				svg.circle(opts.origin['x'] , opts.origin['y'] , opts.origin_radius , {'class':'origin'});// 创建圆心
				
				_this.label = createLabel(svg, opts.origin, 70, 55, opts.initVal, opts.measurement);// 创建label		}});
			$(svgWrap).addClass(opts.classStyle);
	}
	Instrument.prototype = {
		movePointer : function( val ){
			if(this.pointer.val == val) return;
			var _this = this;
			var current = this.pointer.val;
			var now = this.pointer.val;
			var itv = setInterval(function(){
				if( current > val)
					now = now - 1;
				else
					now = now + 1;
				var radian = scale_to_radians( _this.options.group, now, _this.options.radian ),
						pointerOpt = {
							origin : _this.options.origin ,
							high : _this.options.radius/1.45,
							width : _this.options.origin_radius - 2,
						};
					$(_this.pointer).attr('d', calcPathOfPointer(pointerOpt , radian) );
				_this.changeLabel(now);
				if( current > val && now <= val)
					clearInterval(itv);
				else if (current < val && now >= val)
					clearInterval(itv);
				
			},20);
			this.pointer.val = val;
			this.changeLabel(val);
		},
		
		changeLabel : function(val){
			$(this.label).text(val);
		}
	}
	
	$.fn.instrument = function( options ){
		var opts = $.extend({}, $.fn.instrument.defaults, options);
		if( !this.data('_svg') ) this.data( '_svg' , new Instrument(this, opts) );
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
	/*
	 * @name: 将刻度计算，得出弧度
	 * 
	 * @param: 	group:刻度组
	 * 			radians: 下方开口弧度
	 * 			scale: 要转换的刻度
	 */
	function scale_to_radians(group, scale, radians){
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
	function radians_to_degress(radians){
		return radians*180/Math.PI;
	}
	/*
	 * @name: 角度转弧度
	 * 
	 * @param: degree:角度
	 */
	function degress_to_radians(degree){
		return degree*Math.PI/180;
	}
	/*
	 * @name: 创建描述
	 * 
	 * @param: svg: svg容器
	 */
	function createLabel(svg, origin, width, y, label, measurement){
		svg.rect(origin['x'] - width/2, origin['y'] + y, width, 20, 10, 10);
		var back = svg.text(origin['x'], origin['y']  + y + 15, label+'' , {'text-anchor':'middle','class':'label'});
		svg.text(origin['x'], origin['y']  + y + 34, measurement , {'text-anchor':'middle','class':'measurement'});
		return back;
	}
	/*
	 * @name: 计算指针绘制路径
	 * 
	 * @param: option:选项， radians: 弧度
	 */
	function calcPathOfPointer(options, radians){
		var defaults = {
				origin : {x:101,y:101},	// 圆心
				high : 65,				// 指针高
				width : 6,				// 指针底边长
			},
			opts = $.extend({}, defaults, options);
		
		var high = opts.high,
			w2 = opts.width/2,
			cx = opts.origin['x'],
			cy = opts.origin['y'],
			xtop = cx - high*Math.sin(degress_to_radians(radians)),	// 顶点坐标 x
			ytop = cy + high*Math.cos(degress_to_radians(radians)),	// 顶点坐标 y
			x1 = cx - w2*Math.sin(degress_to_radians(radians - 90)),// 一个底边顶点坐标 x
			y1 = cy + w2*Math.cos(degress_to_radians(radians - 90)),// 一个底边顶点坐标y
			x2 = cx - w2*Math.sin(degress_to_radians(radians + 90)),					
			y2 = cy + w2*Math.cos(degress_to_radians(radians + 90)),
			start = 'M'+cx+','+cy+'',
			l1 = 'L'+x1+','+y1+'',
			l2 = 'L'+xtop+','+ytop+'',
			l3 = 'L'+x2+','+y2+'';
			
		return start+l1+l2+l3+'Z';
	}
	/*
	 * @name: 创建指针
	 * 
	 * @param: 	svg: svg容器
	 * 			options: 参数, 见defaults
	 */
	function createPointer(svg,options,radians){
		var defaults = {
				origin : {x:101,y:101},	// 圆心
				high : 65,				// 指针高
				width : 6,				// 指针底边长
			},
			opts = $.extend({}, defaults, options);
		
		return svg.path( calcPathOfPointer(opts, radians) ,{'class':'pointer'});
	}
	/*
	 * @name: 绘制警示彩带组
	 * 
	 * @param: 	svg: svg容器
	 * 			options: 参数，见 defaults
	 */
	function createStripeGroup(svg, options){
		var defaults = {
				origin : {x:101,y:101},	// 彩带圆点
				radius : 45,		// 彩带内侧半径
				width : 5,			// 彩带宽度
				radian : 80,		// 下方张开的度数
				group : [20, 40, 60, 80, 100] // 从初始开始的每个单位等级
			},
			opts = $.extend({}, defaults, options),
			unity = (360 - opts.radian)/(opts.group[opts.group.length - 1] - opts.group[0]),
			last = opts.radian/2;
		
		for( i in opts.group){
			if( i==opts.group.length-1) break;
			var iu = opts.group[parseInt(i)+1] - opts.group[i],
				start = last,
				last = end = unity*iu + start;
			createStripe(svg, start+2, end-2, opts.radius, opts.width, opts.origin, 'level_'+(parseInt(i)+1)+'');
		}
	}
	/*
	 * @name: 绘制警示彩带
	 * 
	 * @param:	svg: svg容器
	 * 			startRadian: 开始的弧度
	 * 			endRadian: 结束的弧度
	 * 			radius: 绘制的内侧半径
	 * 			width: 彩带宽度
	 * 			origin: 圆点
	 * 			level: 强度等级
	 */
	function createStripe(svg, startRadian, endRadian, radius, width, origin, level){
		var r1 = radius + width,
			r2 = radius,
			cx = origin['x'],
			cy = origin['y'];
			
		var x1 = cx - r1*Math.sin(degress_to_radians(startRadian)),
			y1 = cy + r1*Math.cos(degress_to_radians(startRadian)),
			x2 = cx - r1*Math.sin(degress_to_radians(endRadian)),
			y2 = cy + r1*Math.cos(degress_to_radians(endRadian)),
			x3 = cx - r2*Math.sin(degress_to_radians(endRadian)),
			y3 = cy + r2*Math.cos(degress_to_radians(endRadian)),
			x4 = cx - r2*Math.sin(degress_to_radians(startRadian)),
			y4 = cy + r2*Math.cos(degress_to_radians(startRadian));
		
		var start = 'M'+x4+','+y4+'',
			l1 = 'L'+x1+','+y1+'',
			a1 = 'A'+''+r1+','+r1+' 0 0,1 ' +x2+','+y2+'',
			l2 = 'L'+x3+','+y3+'',
			a2 = 'A'+''+r2+','+r2+' 0 0,0 ' +x4+','+y4+'';
		
		svg.path(start+l1+a1+l2+a2+'Z',{'class':level});
	}
	/*
	 * @name: 创建刻度
	 * 
	 * @param: 	svg: svg容器, 
	 * 			radian: 下方张开的度数
	 * 			length: 绘制的刻度长度
	 * 			orgin: 	圆点坐标{x:'',y:''}
	 * 			radius: 绘制刻度半径
	 * 			min:	最小刻度值
	 * 			max:	最大刻度值
	 */
	function createScale(svg, radian, orgin, length, radius, min, max){
		var startPoint = radian/2,
			unitDegree = (360 - radian)/(max-min),
			cx = orgin['x'],
			cy = orgin['y'],
			r1 = radius,
			r2 = r1 + length,
			r3 = r2 + 5,
			r4 = r3 + 10;
			
		for ( i=min ; i<=max ; i++ ){
			var x1 = cx - r1*Math.sin(degress_to_radians(startPoint)),
				y1 = cy + r1*Math.cos(degress_to_radians(startPoint)),
				x2 = cx - r2*Math.sin(degress_to_radians(startPoint)),
				y2 = cy + r2*Math.cos(degress_to_radians(startPoint)),
				x3 = cx - r3*Math.sin(degress_to_radians(startPoint)),
				y3 = cy + r3*Math.cos(degress_to_radians(startPoint)),
				x4 = cx - r4*Math.sin(degress_to_radians(startPoint)),
				y4 = cy + r4*Math.cos(degress_to_radians(startPoint));
				
			startPoint = startPoint += unitDegree;
			
			if(i%2!=0) continue;
			if(i%10==0){
				svg.line(x1,y1,x3,y3,{'class':'bold'});
				svg.text(x4,y4 + 5,''+i+'',{'style':'font-size:12px;','text-anchor':'middle'});
			}else{
				svg.line(x1,y1,x2,y2);
			}
		}
	}
}(jQuery));