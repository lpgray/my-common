var platform = navigator.userAgent.toLowerCase()
    , winWidth
    , winHeight;
isIE6 = $.browser.msie && $.browser.version == "6.0" && !$.support.style;
isIE7 = $.browser.msie && $.browser.version == "7.0" && !$.support.style;
isIDevice = /iphone|ipod|ipad/gi.test(platform);
isIPad = /ipad/gi.test(platform);
isAndroid = /android/gi.test(platform);
isSafari = /safari/gi.test(platform) && !/chrome/gi.test(platform);
isIDeviceWechat = isIDevice && /micromessenger/gi.test(platform);
isAndroidWechat = isAndroid && /micromessenger/gi.test(platform);

var lastPage = 0
    , currentPage = 1
    , totalPage = 0
    , pageTransition = true
    , has3d
    , pageEvents = {}
    , pageReverts = {};
function has3d() {
    var e = document.createElement("p")
    , t
    , i = {
        webkitTransform: "-webkit-transform",
        OTransform: "-o-transform",
        msTransform: "-ms-transform",
        MozTransform: "-moz-transform",
        transform: "transform"
    };
    document.body.insertBefore(e, null);
    for (var a in i) {
        if (e.style[a] !== undefined) {
            e.style[a] = "translate3d(1px,1px,1px)";
            t = window.getComputedStyle(e).getPropertyValue(i[a])
        }
    }
    document.body.removeChild(e);
    return t !== undefined && t.length > 0 && t !== "none"
}
function goToPage(targetPage, mode) {
    var $targetPage = $("#page-" + targetPage);

    if(lastPage && lastPage != targetPage){
        $('#page-' + lastPage).removeClass('page' + lastPage + '-loaded');
        pageReverts[lastPage] && pageReverts[lastPage].call();
    }

    if (mode == "slide" && lastPage != targetPage) {
        if (has3d) {
            $page.addClass("animate").css({
                "-webkit-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                "-moz-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                "-ms-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                "-o-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                transform: "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)"
            });
        } else {
            $page.animate({top: -winHeight * (targetPage - 1)}, 1000)
        }
    } else if (mode == "fade" && lastPage != targetPage) {
        $pages.addClass("absolute").hide();
        $page.removeClass("animate").css({
            top: 0,
            "-webkit-transform": "translate3d(0px, 0px, 0px)",
            "-moz-transform": "translate3d(0px, 0px, 0px)",
            "-ms-transform": "translate3d(0px, 0px, 0px)",
            "-o-transform": "translate3d(0px, 0px, 0px)",
            transform: "translate3d(0px, 0px, 0px)"
        });
        $targetPage.fadeIn(1000).siblings("div.page").fadeOut(1000);
        setTimeout(function() {
            $pages.removeClass("absolute").show();
            if (has3d) {
                $page.removeClass("animate").css({
                    "-webkit-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                    "-moz-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                    "-ms-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                    "-o-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                    transform: "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)"
                })
            } else {
                $page.css({top: -winHeight * (targetPage - 1)})
            }
        }, 1000);
    } else {
        if (has3d) {
            $page.removeClass("animate").css({
                "-webkit-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                "-moz-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                "-ms-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                "-o-transform": "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)",
                transform: "translate3d(0px, -" + 100 * (targetPage - 1) + "%, 0px)"
            })
        } else {
            $page.css({top: -winHeight * (targetPage - 1)})
        }
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
        }, 1200);
    }
}
$(function() {
    has3d = has3d();

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
    goToPage(currentPage);
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

    var $page1 = $('#page-1')
        , $drawer = $page1.find('.modules-box')
        , $itemsInDrawer = $page1.find('.modules')
        , $drawerTrig = $page1.find('.collapsible-arrow')
        , $lis = $drawer.find('.modules-list').find('li');
    function openDrawer(){
        if ($drawer.hasClass("on")) {
            $drawer.removeAttr("style").removeClass("on");
            $itemsInDrawer.removeClass("wrapper");
        } else {
            $drawer.height($lis.height() * 5 - 50).addClass("on");
            $itemsInDrawer.addClass("wrapper")
        }
    }
    $drawerTrig.click(openDrawer);


    var $page2 = $('#page-2')
        , $page2selection = $page2.find('.desc')
        , $page2layers = $page2.find('.layer')
        , $pag2layersWrapper = $page2.find('.page2-device');
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
    function activeTriggerAndLayer(idx){
        $page2.find('.desc').eq(idx).addClass('active').siblings().removeClass('active');
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
    pageReverts[2] = function(){
        $page2selection.removeClass('active animate');
        $page2layers.each(function(idx, item){
            idx++;
            $(item).removeClass('layer' + idx + '-ignore layer' + idx + '-active active');
        });
    }


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

    var $page4descs = $('.page4-desc');
    pageEvents[4] = function(){
        setTimeout(function(){
            loopWithPause($page4descs, function(idx, item){
                idx++;
                $(item).addClass('page4-desc' + idx + '-animate');
            }, 300);
        }, 1200);
    };
    pageReverts[4] = function(){
        $.each($page4descs, function(idx, item){
            idx++;
            $(item).removeClass('page4-desc' + idx + '-animate');
        });
    }
});
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