// var wifiwx = {
//     domain: "wifiwx.com",
//     childDomain: {
//         main: "www",
//         cms: "html",
//         img: "img"
//     },sourcePath: {img: "/statics/v2/img/",js: "/statics/js/",css: "/statics/css/"},appDownloadLink: {iphone: "https://itunes.apple.com/cn/app/wu-xian-wu-xi-xin-wen-shi/id558160497?mt=8",ipad: "https://itunes.apple.com/cn/app/wu-xian-wu-xi-hd-cheng-shi/id580020830?mt=8",android: "http://app.wifiwx.com/download/android.php?ver=2.0.1"}};
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



// function getResponseImg(e, t) {
//     var i = e.split("."), a = i[i.length - 1], n = "";
//     for (var r = 0; r < i.length - 1; r++) {
//         if (r == i.length - 2) {
//             n += i[r]
//         } else {
//             n += i[r] + "."
//         }
//     }
//     var s = {retina: "-2x",fix: "-fix"};
//     var o = n.substring(n.length - s.retina.length) == s.retina ? e : n + s.retina + "." + a, d = n.substring(n.length - s.fix.length) == s.fix ? e : n + s.fix + "." + a;
//     if (n.substring(n.length - s.retina))
//         if (t == "retina" || t == "2x") {
//             return o
//         } else if (t == "fix" || t == "ie6") {
//             return d
//         } else {
//             return e
//         }
// }
// function _scrollTo(e) {
//     var t = e.attr("data-offsettop") ? e.attr("data-offsettop") : e.offset().top;
//     $("html,body").animate({scrollTop: e.offset().top}, 200)
// }
// function scrollToAnchor() {
//     $('a[href^="#"]').each(function() {
//         var e = $(this).attr("href");
//         if (e.indexOf("=") < 0) {
//             var t = $(e);
//             if (t.length > 0) {
//                 $(this).attr("href", "javascript:;").click(function() {
//                     _scrollTo(t)
//                 })
//             }
//         }
//     })
// }
// function active(e, t, i) {
//     t = t || 1;
//     i = i || "hover";
//     switch (t) {
//         case 1:
//             for (var a = 0; a < e.length; a++) {
//                 $(e[a]).hover(function() {
//                     $(this).addClass("active")
//                 }, function() {
//                     $(this).removeClass("active")
//                 })
//             }
//             break;
//         case 2:
//             for (var a = 0; a < e.length; a++) {
//                 $(e[a]).bind(i, function() {
//                     $(this).addClass("active").siblings().removeClass("active")
//                 })
//             }
//             break
//     }
// }
// function getApp(e, t) {
//     if (e == 0) {
//         var i = $(".cover-bar"), a = i.find(".tip");
//         if (!i.hasClass("animating")) {
//             i.addClass("animating").fadeIn(100);
//             a.animate({left: "47%"}, 200).animate({left: "43%"}, 2e3, "linear", function() {
//                 i.fadeOut(100)
//             }).animate({left: "-20%"}, 200, function() {
//                 a.css("left", "110%");
//                 i.removeClass("animating")
//             })
//         }
//         return false
//     }
//     window.location.href = wifiwx.appDownloadLink[t]
// }
// var pageEvent = {
//     1: function() {
//         var e = $("#page-1")
//             , t = e.find("ul.banners li")
//             , i = e.find(".modules-box")
//             , a = i.children(".modules")
//             , n = i.children("span.collapsible-arrow")
//             , r = i.find("ul.modules-list")
//             , s = r.find("li")
//             , o = i.find("ul.mudules-description li");
//         var d = {
//             item: t,
//             length: t.length,
//             current: 0,
//             timer: 5e3,
//             animate: function() {
//                 var e = d.current;
//                 e = e < d.length - 1 ? e + 1 : 0;
//                 if (has3d()) {
//                     d.item.eq(e).addClass("current").siblings().removeClass("current")
//                 } else {
//                     d.item.eq(e).addClass("hide current").siblings().removeClass("current");
//                     setTimeout(function() {
//                         d.item.eq(e).fadeIn(500).siblings().fadeOut(500)
//                     }, 100)
//                 }
//                 d.current = e
//             }
//         };
//         if (!e.data("inited")) {
//             t.eq(0).addClass("current");
//             var l = setInterval(d.animate, d.timer);
//             n.click(function() {
//                 if (i.hasClass("on")) {
//                     i.removeAttr("style").removeClass("on");
//                     a.removeClass("wrapper")
//                 } else {
//                     i.height(s.height() * 5 - 50).addClass("on");
//                     try {
//                         clearTimeout(T)
//                     } catch (e) {
//                     }
//                     r.removeAttr("style");
//                     a.addClass("wrapper")
//                 }
//             });
//             s.each(function(e) {
//                 $(this).hover(function() {
//                     $(this).addClass("active").siblings().removeClass("active");
//                     o.eq(e).addClass("active").siblings().removeClass("active")
//                 }).click(function() {
//                     i.height(s.height() * 5 - 50).addClass("on");
//                     try {
//                         clearTimeout(T)
//                     } catch (e) {
//                     }
//                     r.removeAttr("style");
//                     a.addClass("wrapper")
//                 })
//             });
//             function c(e) {
//                 var e = e || window.event;
//                 var t = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
//                 return t
//             }
//             var f = 0;
//             var u = s.width() * s.length;
//             var g = winWidth - u;
//             var m;
//             if ("ontouchstart" in window) {
//                 r.data("curX", 0);
//                 var h, p, w;
//                 var v, b, x, C, P;
//                 var T, I = false;
//                 r.bind({
//                     touchstart: function(e) {
//                         clearTimeout(T);
//                         I = true;
//                         p = e.originalEvent.touches[0].pageX;
//                         v = p;
//                         x = (new Date).getTime();
//                         b = 0;
//                         C = 0;
//                         h = r.data("curX") ? r.data("curX") + p : p;
//                         W(r.data("curX"))
//                     },
//                     touchmove: function(e) {
//                         e.preventDefault();
//                         w = e.originalEvent.touches[0].pageX - p;
//                         b = e.originalEvent.touches[0].pageX;
//                         C = (new Date).getTime();
//                         clearTimeout(P);
//                         P = setTimeout(function() {
//                             v = b;
//                             x = (new Date).getTime()
//                         }, 1e3);
//                         h = r.data("curX") ? r.data("curX") + w : w;
//                         W(h)
//                     },
//                     touchend: function(e) {
//                         clearTimeout(P);
//                         I = false;
//                         e.preventDefault();
//                         r.data("curX", h);
//                         var t = 0, i = 0, a = 100, n = (b - v) / (C - x) * a * 5;
//                         function s() {
//                             var e = y(t, i, n, a);
//                             W(e + h);
//                             r.data("curX", e + h);
//                             if (!I) {
//                                 if (t++ < a && e + h < winWidth / 4 && e + h > g - winWidth / 4) {
//                                     T = setTimeout(s, 10)
//                                 } else {
//                                     if (e + h > 0) {
//                                         r.animate({left: 0 + "px"});
//                                         r.data("curX", 0)
//                                     } else if (e + h < g) {
//                                         r.animate({left: g + "px"});
//                                         r.data("curX", g)
//                                     }
//                                 }
//                             }
//                         }
//                         if (v != b)
//                             s()
//                     }
//                 });
//                 function y(e, t, i, a) {
//                     return -i * ((e = e / a - 1) * e * e * e - 1) + t
//                 }
//                 function W(e) {
//                     if (e < g - winWidth / 4)
//                         e = g - winWidth / 4;
//                     if (e > winWidth / 4)
//                         e = winWidth / 4;
//                     r.css({left: e + "px"})
//                 }
//             } else {
//                 if (winWidth < u) {
//                     e.bind({
//                         mousemove: function(e) {
//                             f = (c(e) - winWidth / 2) / 300;
//                             g = winWidth - s.width() * s.length
//                         },
//                         mouseover: function() {
//                             m = setInterval(function() {
//                                 var e = parseInt(r.css("left")) - f;
//                                 if (e > 0) {
//                                     e = 0
//                                 } else if (e < g) {
//                                     e = g
//                                 }
//                                 r.css("left", e)
//                             }, 10)
//                         },mouseout: function() {
//                             clearInterval(m)
//                         }
//                     });
//                 }
//             }
//             e.data("inited", "inited")
//         }
//     }
//     ,2: function() {
//         var e = $("#page-2")
//         , t = e.find("ul.banners");
//         bannerItem = t.find("li");
//         var i = {
//             length: bannerItem.length,
//             current: 0,
//             timer: 5e3,
//             animate: function(e, a) {
//                 var n = i.current;
//                 n = n < i.length - 1 ? n + 1 : 0;
//                 n = e || n;
//                 if (n != i.current || a) {
//                     bannerItem.eq(n).addClass("current").siblings().removeClass("current");
//                     bannerItem.find("p").removeClass("animate").removeClass("done").removeAttr("style");
//                     t.css("left", -n * bannerItem.width());
//                     i.current = n
//                 }
//                 if (has3d()) {
//                     setTimeout(function() {
//                         bannerItem.find("p").addClass("animate").addClass("done")
//                     }, 1e3)
//                 } else {
//                     setTimeout(function() {
//                         bannerItem.find("p").each(function(e) {
//                             var t = $(this);
//                             setTimeout(function() {
//                                 t.addClass("hide").addClass("done");
//                                 setTimeout(function() {
//                                     t.fadeIn(500)
//                                 }, 100)
//                             }, 100 * e)
//                         })
//                     }, 1e3)
//                 }
//             }
//         };
//         if (e.data("inited") == "inited") {
//             i.animate(0, "reset")
//         } else {
//             i.animate();
//             var a = setInterval(i.animate, i.timer);
//             e.data("inited", "inited")
//         }
//     }
//     ,3: function() {
//         var e = $("#page-3")
//         , t = e.find(".timeline li")
//         , i = t.length
//         , a = e.find("span.dot");
//         var n = i - 1;
//         function r(e) {
//             n = e;
//             a.stop().animate({left: t.eq(e).offset().left + t.eq(e).width() / 2 - a.width() / 2}, 500);
//             t.eq(e).addClass("current").siblings().removeClass("current")
//         }
//         if (e.data("inited") == "inited") {
//         } else {
//             r(n);
//             var s = setInterval(function() {
//                 n = n < i - 1 ? n + 1 : 0;
//                 r(n)
//             }, 5e3);
//             t.each(function(e) {
//                 var t = $(this), a = $(this).find("span.circle");
//                 a.hover(function() {
//                     r(e)
//                 });
//                 t.hover(function() {
//                     clearInterval(s)
//                 }, function() {
//                     s = setInterval(function() {
//                         n = n < i - 1 ? n + 1 : 0;
//                         r(n)
//                     }, 5e3)
//                 })
//             });
//             e.data("inited", "inited")
//         }
//     }
//     ,4: function() {
//         var e = $("#page-4")
//         , t = e.find("ul.banners");
//         bannerItem = t.find("li");
//         var i = {
//             length: bannerItem.length,
//             current: 0,
//             timer: 5e3,
//             animate: function(e, a) {
//                 var n = i.current;
//                 n = n < i.length - 1 ? n + 1 : 0;
//                 n = e || n;
//                 if (n != i.current || a) {
//                     bannerItem.eq(n).addClass("current").siblings().removeClass("current");
//                     bannerItem.find("dl").removeClass("animate").removeClass("done").removeAttr("style");
//                     t.css("left", -n * bannerItem.width());
//                     i.current = n
//                 }
//                 setTimeout(function() {
//                     bannerItem.find("dl").each(function(e) {
//                         var t = $(this);
//                         if (has3d()) {
//                             setTimeout(function() {
//                                 t.addClass("animate").addClass("done")
//                             }, 100 * e)
//                         } else {
//                             setTimeout(function() {
//                                 t.addClass("hide").addClass("done");
//                                 setTimeout(function() {
//                                     t.fadeIn(500)
//                                 }, 100)
//                             }, 100 * e)
//                         }
//                     })
//                 }, 800)
//             }
//         };
//         if (e.data("inited") == "inited") {
//             i.animate(0, "reset")
//         } else {
//             i.animate();
//             e.data("inited", "inited")
//         }
//     }
//     ,5: function() {
//     }
// };
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
function goToPage(e, t, i) {
    var a = $("#page")
        , n = $(".page")
        , r = $("#page-" + t)
        , s = $("#page-indicator li");
    if (i == "slide" && e != t) {
        if (has3d) {
            a.addClass("animate").css({"-webkit-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-moz-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-ms-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-o-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)",transform: "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)"})
        } else {
            a.animate({top: -winHeight * (t - 1)}, 1e3)
        }
    } else if (i == "fade" && e != t) {
        n.addClass("absolute").hide();
        a.removeClass("animate").css({top: 0,"-webkit-transform": "translate3d(0px, 0px, 0px)","-moz-transform": "translate3d(0px, 0px, 0px)","-ms-transform": "translate3d(0px, 0px, 0px)","-o-transform": "translate3d(0px, 0px, 0px)",transform: "translate3d(0px, 0px, 0px)"});
        r.fadeIn(1e3).siblings("div.page").fadeOut(1e3);
        setTimeout(function() {
            n.removeClass("absolute").show();
            if (has3d) {
                a.removeClass("animate").css({"-webkit-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-moz-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-ms-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-o-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)",transform: "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)"})
            } else {
                a.css({top: -winHeight * (t - 1)})
            }
        }, 1500)
    } else {
        if (has3d) {
            a.removeClass("animate").css({"-webkit-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-moz-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-ms-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)","-o-transform": "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)",transform: "translate3d(0px, -" + 100 * (t - 1) + "%, 0px)"})
        } else {
            a.css({top: -winHeight * (t - 1)})
        }
    }
    if (e != t) {
        currentPage = t;
        s.eq(currentPage - 1).addClass("current").siblings().removeClass("current");
        r.addClass("current").siblings("div.page").removeClass("current");
        pageTransition = true;
        setTimeout(function() {
            pageTransition = false;
            lastPage = currentPage
        }, 1500);
        // pageEvent[t]()
    }
}
$(function() {
    has3d = has3d();
    if (window.devicePixelRatio >= 1.5) {
        $("body").addClass("retina");
        $("img").each(function() {
            var e = $(this), t = e.attr("src");
            if (e.hasClass("has2x"))
                e.attr("src", getResponseImg(t, "retina"))
        })
    }
    if (window.isIE6) {
        $("body").addClass("ie6");
        DD_belatedPNG.fix(".icon");
        $("#page-1, #page-2, #page-3, #page-4, #page-indicator").remove();
        $("#page-5 .download-top img").attr("src", "statics/v2/img/p4-top1.png")
    }
    if (window.isIE6 || window.isIE7) {
        $("body").addClass("ieLow")
    }
    // if ($("body").hasClass("getapp")) {
    //     (function() {
    //         setTimeout(function() {
    //             if (window.isIDevice) {
    //                 if (window.isIPad) {
    //                     getApp(1, "ipad")
    //                 } else {
    //                     getApp(1, "iphone")
    //                 }
    //             } else {
    //                 getApp(1, "android")
    //             }
    //         }, 1e3)
    //     })()
    // }
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
    // if ("ontouchstart" in window) {
    //     $(document).bind("touchstart", function(e) {
    //         e.preventDefault
    //     })
    // }
    // $(document).hammer().on("swipeup", function() {
    //     if (!pageTransition) {
    //         if (currentPage + 1 <= totalPage) {
    //             currentPage = currentPage + 1;
    //             goToPage(lastPage, currentPage, "slide")
    //         }
    //     }
    // });
    // $(document).hammer().on("swipedown", function() {
    //     if (!pageTransition) {
    //         if (currentPage - 1 >= 1) {
    //             currentPage = currentPage - 1;
    //             goToPage(lastPage, currentPage, "slide")
    //         }
    //     }
    // });
    $("#page-indicator li, #site-navigation li").click(function() {
        var e = parseInt($(this).find("a").attr("rel"));
        if (!pageTransition)
            goToPage(lastPage, e, "fade")
    });
    // if ($("body").hasClass("download")) {
    //     $(".download-iPhone a.dbutton").hover(function() {
    //         $(".download-Android").addClass("trick")
    //     }, function() {
    //         $(".download-Android").removeClass("trick")
    //     })
    // }
    // var t = window.isIDeviceWechat ? "wechat-tip-ios.png" : "wechat-tip-others.png";
    // if (window.isIDeviceWechat || window.isAndroidWechat) {
    //     $("body").append('<div id="wechat-tip" style="position:absolute;z-index:999;width:100%;top:0;left:0;"><img src="' + wifiwx.sourcePath.img + t + '" width="100%" alt="" /></div>')
    // }
    


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
        // $("#page-1 ul.banners img").each(function() {
        //     var e = $(this);
        //     e.height(winHeight - $("#global-header").height()).css({"margin-left": (winWidth - e.width()) / 2});
        //     e.load(function() {
        //         e.height(winHeight - $("#global-header").height()).css({"margin-left": (winWidth - e.width()) / 2})
        //     })
        // });
        // $("#page-2 ul.banners li").each(function() {
        //     var e = $(this);
        //     var t = winHeight * .07;
        //     e.height(winHeight - t * 2).css({"margin-top": t})
        // });
        // try {
        //     $("#page-3 span.dot").css({left: $("#page-3 .timeline li.current").offset().left + $("#page-3 .timeline li.current").width() / 2 - $("#page-3 span.dot").width() / 2})
        // } catch (t) {
        // }
        // $("#page-4 .block-black").height(winHeight * .07);
        // $("#page-4 .focus").height(winHeight * .86 - $("#page-4 h1").outerHeight());
        // $("#page-4 ul.banners li").each(function() {
        //     var e = $(this);
        //     e.height($("#page-4 .focus").height())
        // });
        if (winWidth > winHeight) {
            $("body").addClass("horizontal")
        } else {
            $("body").removeClass("horizontal")
        }
    }, 100)
}