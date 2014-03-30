var platform = navigator.userAgent.toLowerCase()
    , winWidth
    , winHeight
    , ieVersion;
isIE6 = $.browser.msie && $.browser.version == "6.0" && !$.support.style;
isIE7 = $.browser.msie && $.browser.version == "7.0" && !$.support.style;
isIE9 = $.browser.msie && $.browser.version == "9.0" && !$.support.style;
isIDevice = /iphone|ipod|ipad/gi.test(platform);
isIPad = /ipad/gi.test(platform);
isAndroid = /android/gi.test(platform);
isSafari = /safari/gi.test(platform) && !/chrome/gi.test(platform);
isIDeviceWechat = isIDevice && /micromessenger/gi.test(platform);
isAndroidWechat = isAndroid && /micromessenger/gi.test(platform);

var partners = [
    {
        name : '中国电信'
    },
    {
        name : 'SIEMENS'
    },
    {
        name : 'Atos'
    },
    {
        name : '太平洋保险'
    },
    {
        name : '凤凰传媒'
    },
    {
        name : 'HELLA'
    },
    {
        name : '东南大学'
    },
    {
        name : '苏源高科'
    },
    {
        name : '话机世界'
    },
    {
        name : '江苏教育频道'
    },
    {
        name : '平安银行'
    },
    {
        name : '凤凰出版社'
    }
];

var lastPage = 0
    , currentPage = 1
    , totalPage = 0
    , pageTransition = true
    , pageEvents = {}
    , pageReverts = {};

function goToPage(targetPage, mode) {
    var $targetPage = $("#page-" + targetPage);

    if(lastPage && lastPage != targetPage){
        $('#page-' + lastPage).removeClass('page' + lastPage + '-loaded');
        pageReverts[lastPage] && pageReverts[lastPage].call();
    }

    if (mode == "slide" && lastPage != targetPage) {
        $page.animate({top: -winHeight * (targetPage - 1)}, 1000)
        
    } else if (mode == "fade" && lastPage != targetPage) {
        $pages.addClass("absolute").hide();
        $page.removeClass("animate").css({
            top: 0
        });
        $targetPage.fadeIn(1000).siblings("div.page").fadeOut(1000);
        setTimeout(function() {
            $pages.removeClass("absolute").show();
            $page.css({top: -winHeight * (targetPage - 1)});
        }, 1000);
    } else {
        $page.css({top: -winHeight * (targetPage - 1)});
    }
    if (lastPage != targetPage) {
        currentPage = targetPage;
        $indicators.eq(currentPage - 1).addClass("current").siblings().removeClass("current");
        $targetPage.addClass("current").siblings("div.page").removeClass("current");
        pageTransition = true;
        setTimeout(function() {
            pageTransition = false;
            lastPage = currentPage;
            $targetPage.addClass('page'+targetPage+'-loaded');
            pageEvents[targetPage] && pageEvents[targetPage].call();
        }, 800);
    }
}

function resetPage(e) {
    var e = e || $("div.page");
    window.scrollTo(0, 0);
    setTimeout(function() {
        if (!isAndroid)
            window.scrollTo(0, 0);
        winWidth = $(window).width();
        winHeight = $(window).height();
        e.height(winHeight);
        totalPage = $(".page:visible").length;
        goToPage(currentPage);
        
        if (winWidth > winHeight) {
            $("body").addClass("horizontal")
        } else {
            $("body").removeClass("horizontal")
        }
    }, 100);
}

/**
 * 延迟遍历数组
 * @param  {[type]} arr  [数组]
 * @param  {[type]} func [回调]
 * @param  {[type]} time [延迟时间]
 */
function loopWithPause(arr, func, time){
    if(!arr.length){
        return;
    }

    function one(idx, arr){
        if(idx === arr.length){
            return;
        }else{
            setTimeout(function(){
                func.call(arr[idx], idx, arr[idx]);
                idx++;
                one(idx, arr);
            }, time);
        }
    }

    func.call(arr[0], 0, arr[0]);
    one(1, arr);
}

$(function() {

    $page = $("#page");
    $pages = $(".page");
    $indicators = $("#page-indicator li");

    if (window.isIE6 || window.isIE7) {
        $("body").addClass("ieLow")
    }
    
    winWidth = $(window).width();
    winHeight = $(window).height();
    resetPage();
    $(window).resize(function() {
        resetPage()
    });
    totalPage = $(".page").length;
    
    var e = 1;
    $(document).bind("mousewheel", function(t, i, a, n) {
        if (!pageTransition) {
            if (i <= -e) {
                if (currentPage + 1 <= totalPage) {
                    currentPage = currentPage + 1;
                    goToPage(currentPage, "slide")
                }
            } else if (i >= e) {
                if (currentPage - 1 >= 1) {
                    currentPage = currentPage - 1;
                    goToPage(currentPage, "slide")
                }
            }
        }
    });
    
    $("#page-indicator li, #site-navigation li").click(function() {
        var targetPage = parseInt($(this).find("a").attr("rel"));
        if (!pageTransition)
            goToPage(targetPage, "fade");
    });

    (function(){
        var $page1 = $('#page-1')
            , $drawer = $page1.find('.modules-box')
            , $itemsInDrawer = $page1.find('.modules')
            , $drawerTrig = $page1.find('.collapsible-arrow')
            , $list = $drawer.find('.modules-list')
            , $lis = $list.find('li')
            , $descs = $('.mudules-description').children()
            , $hideTrigLeft = $page1.find('.hide-trigger-left')
            , $hideTrigRight = $page1.find('.hide-trigger-right')
            , listOuterWidth = $lis.length * 110;
        function openDrawer(idx){
            if ($drawer.hasClass("on")) {
                $drawer.removeClass("on").attr('style','');
                $itemsInDrawer.removeClass("wrapper");
                $lis.removeClass('active');
            } else {
                $drawer.height($lis.height() * 4 - 50).addClass("on");
                $itemsInDrawer.addClass("wrapper");
            }
        }
        function showDesc(idx){
            $descs.eq(idx).addClass('active').siblings().removeClass('active');
        }
        
        $drawerTrig.click(function(){
            openDrawer();
            showDesc(0);
        });

        $lis.click(function(){
            var $self = $(this);
            var idx = $self.index();
            if(!$drawer.hasClass("on")){
                openDrawer(idx);
            }
            showDesc(idx);
            $self.addClass('active').siblings().removeClass('active');
        });

        var leftMoved = 1;
        var rightMoved = 0;
        var moving = 0;
        
        $hideTrigLeft.mouseover(function(){
            if(moving || leftMoved){
                return;
            }
            moving = 1;
            $list.animate({
                left : 0
            }, 800, function(){
                moving = 0;
                leftMoved = 1;
                rightMoved = 0;
            });
        });
        
        $hideTrigRight.mouseover(function(){
            if(moving || rightMoved){
                return;
            }
            moving = 1;
            var l = listOuterWidth - winWidth;
            $list.animate({
                left : '-' + l + 'px'
            }, 800, function(){
                moving = 0;
                rightMoved = 1;
                leftMoved = 0;
            });
        });

        if($.browser.version < 10){
            var $device = $page1.find('.page1-device')
                , $title = $page1.find('.page1-title')
                , $desc = $page1.find('.page1-desc');
            $device.css('display', 'none');
            $title.css('display', 'none');
            $desc.css('display', 'none');
            pageEvents[1] = function(){
                $device.fadeIn(400);
                $title.fadeIn(400);
                $desc.fadeIn(400);
            }
            pageReverts[1] = function(){
                $device.css('display', 'none');
                $title.css('display', 'none');
                $desc.css('display', 'none');
            }
        }
    }());

    (function(){
        var $page2 = $('#page-2')
            , $page2selection = $page2.find('.desc')
            , $page2layers = $page2.find('.layer');
        function activeTriggerAndLayer(idx){
            $page2selection.eq(idx).addClass('active').siblings().removeClass('active');
            $.each($page2layers, function(i, item){
                if(i>=idx){
                    i++;
                    $(item).removeClass('layer' + i + '-ignore');
                }else{
                    i++;
                    $(item).addClass('layer' + i + '-ignore');
                }
            });
        }
        $page2selection.mouseover(function(){
            activeTriggerAndLayer($(this).index());
        });
        if($.browser.version < 10){
            $page2selection.css('opacity', '0');
            pageEvents[2] = function(){
                loopWithPause($page2selection, function(idx, item){
                    $(item).animate({
                        top : 0,
                        opacity : 1   
                    });
                    if(idx === $page2selection.length-1){
                        loopWithPause($page2layers, function(idx, layer){
                            var top = -150 + (idx*40);
                            $(layer).animate({
                                top : top
                            });
                        }, 200);
                    }
                }, 100);
            }
            pageReverts[2] = function(){
                $page2selection.css('opacity', '0');
                $page2layers.css('top', 0);
            }    
        }else{
            pageEvents[2] = function(){
                loopWithPause($page2selection, function(idx, item){
                    $(item).addClass('animate');
                    if(idx === $page2selection.length-1){
                        $.each($page2layers, function(idx, layer){
                            idx++;
                            $(layer).addClass('layer'+idx+'-active');
                        });
                        setTimeout(function(){
                            activeTriggerAndLayer(0);
                        }, 1000);
                    }
                }, 100);
            }
            pageReverts[2] = function(){
                $page2selection.removeClass('active animate');
                $page2layers.each(function(idx, item){
                    idx++;
                    $(item).removeClass('layer' + idx + '-ignore layer' + idx + '-active active');
                });
            }
        }
    }());

    (function(){
        var $page3 = $('#page-3')
            , $timelineLis = $page.find('.timeline li')
            , timelineLen = $timelineLis.length
            , $dot = $page3.find('span.dot')
            , page3Timer = 0
            , page3AutoRun = 0
            , page3pause = 0
            , page3Current = 0;
        function activeDotAndTimeline(idx) {
            var $target = $timelineLis.eq(idx);
            $dot.stop().animate({
                left: $target.offset().left + $target.width() / 2 - $dot.width() / 2
            }, 500);
            $target.addClass("current").siblings().removeClass("current");
        }
        $timelineLis.mouseover(function(){
            var self = this;
            clearTimeout(page3Timer);
            page3Timer = setTimeout(function(){
                page3Current = $(self).index()
                activeDotAndTimeline(page3Current);
            }, 500);
            page3pause = 1;
        }).mouseout(function(){
            clearTimeout(page3Timer);
            page3pause = 0;
        });
        pageEvents[3] = function(){
            pageReverts[3]();
            activeDotAndTimeline(page3Current);
            page3Current++;
            page3AutoRun = setInterval(function(){
                if(page3pause){
                    return;
                }

                if(page3Current >= $timelineLis.length){
                    page3Current = 0;
                }

                activeDotAndTimeline(page3Current);
                page3Current++;
            }, 2000);
        };
        pageReverts[3] = function(){
            page3pause = 0;
            clearInterval(page3AutoRun);
        }
    }());

    (function(){
        var $page4 = $('#page-4')
            , $page4descs = $page4.find('.page4-desc')
            , page4timer = 0;
        if($.browser.version < 10){
            var $page4circle = $page4.find('.page4-circle')
                , $page4shadow = $page4.find('.page4-shadow');

            $page4descs.css('opacity', 0);
            $page4circle.css('display', 'none');
            $page4shadow.css('display', 'none');
            
            pageEvents[4] = function(){
                page4timer = setTimeout(function(){
                    loopWithPause($page4descs, function(idx, item){
                        idx++;
                        if(idx === 1 || idx === 4){
                            $(item).animate({
                                'opacity' : 1,
                                'left' : -220
                            });
                        }else{
                            $(item).animate({
                                'opacity' : 1,
                                'left' : '90%'
                            });
                        }
                    }, 300);
                }, 1000);
                $page4circle.fadeIn();
                $page4shadow.fadeIn();
            };
            pageReverts[4] = function(){
                $page4descs.css('opacity', 0);
                $page4circle.css('display', 'none');
                $page4shadow.css('display', 'none');
                clearTimeout(page4timer);
            };
        }else{
            pageEvents[4] = function(){
                page4timer = setTimeout(function(){
                    loopWithPause($page4descs, function(idx, item){
                        idx++;
                        $(item).addClass('page4-desc' + idx + '-animate');
                    }, 300);
                }, 1000);
            };
            pageReverts[4] = function(){
                setTimeout(function(){
                    $.each($page4descs, function(idx, item){
                        idx++;
                        $(item).removeClass('page4-desc' + idx + '-animate');
                    });
                }, 1200);
                clearTimeout(page4timer);
            };
        }
    }());

    (function(){
        var $partners = $('#page-5').find('.partners');
        var tmpl = '';
        $.each(partners, function(idx, item) {
            tmpl += '<li class="p5-logo logo-' + idx + '"><a href="###">' + item.name + '</a></li>';
        });
        $partners.html(tmpl);
        pageEvents[5] = function(){
            loopWithPause($partners.children(), function(idx, item){
                $(item).addClass('p5-logo-active');
            }, 16);
        }
        pageReverts[5] = function(){
            $partners.children().removeClass('p5-logo-active');
        }
    }());
    
    (function(){
        var $mapCtn = $('#J_mapCtn')
            , mapInited = 0
            , map;
        pageEvents[6] = function() {
            if (mapInited) {
                return false;
            }
            mapInited = 1;
            map = new BMap.Map('J_mapCtn');
            map.centerAndZoom(new BMap.Point(118.819224,31.950503), 32);
            var marker = new BMap.Marker(new BMap.Point(118.819224,31.950503));
            var control = new BMap.NavigationControl({
                anchor : BMAP_ANCHOR_TOP_LEFT
            });
            map.addControl(control);
            map.addOverlay(marker);
            var opts = {      
                width : 220,     // 信息窗口宽度      
                height: 60,     // 信息窗口高度      
                title : "南京泛盈信息科技有限公司"  // 信息窗口标题     
            }
            var infoWindow = new BMap.InfoWindow("地址：南京市江宁区胜太路68号科创中心 <br /> 电话：025-52123550", opts);  // 创建信息窗口对象      
            
            marker.addEventListener('click', function(){
                map.openInfoWindow(infoWindow, marker.getPosition());      // 打开信息窗口
            });
        };
    }());
});