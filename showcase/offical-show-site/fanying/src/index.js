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
    , has3d;
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
function goToPage(lastPage, targetPage, mode) {
    var $page = $("#page")
        , $pages = $(".page")
        , $targetPage = $("#page-" + targetPage)
        , $indicators = $("#page-indicator li");
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
        }, 1000)
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
        }, 1000);
        // pageEvent[t]()
    }
}
$(function() {
    has3d = has3d();
    
    if (window.isIE6 || window.isIE7) {
        $("body").addClass("ieLow")
    }
    
    winWidth = $(window).width();
    winHeight = $(window).height();
    resetPage();
    $(window).resize(function() {
        resetPage()
    });
    goToPage(lastPage, currentPage);
    totalPage = $(".page:visible").length;
    
    var e = 1;
    $(document).bind("mousewheel", function(t, i, a, n) {
        if (!pageTransition) {
            if (i <= -e) {
                if (currentPage + 1 <= totalPage) {
                    currentPage = currentPage + 1;
                    goToPage(lastPage, currentPage, "slide")
                }
            } else if (i >= e) {
                if (currentPage - 1 >= 1) {
                    currentPage = currentPage - 1;
                    goToPage(lastPage, currentPage, "slide")
                }
            }
        }
    });
    
    $("#page-indicator li, #site-navigation li").click(function() {
        var targetPage = parseInt($(this).find("a").attr("rel"));
        if (!pageTransition)
            goToPage(lastPage, targetPage, "fade");
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
        goToPage(currentPage, currentPage);
        
        if (winWidth > winHeight) {
            $("body").addClass("horizontal")
        } else {
            $("body").removeClass("horizontal")
        }
    }, 100);
}