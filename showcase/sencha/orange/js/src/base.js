/*
 * @name: base.js
 * @description: 常用的基础js,包括防止console报错，阻止href=#, ajax方法，对该文件的修改要慎重，以为该文件中作用全局上下文
 * @version: 0.1
 * @creator: lpgray 
 */
// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
// stop default link behavior
$(document).on('click', '[href="#"],.disabled', function(e) {
  e.preventDefault();
});

function ajax(url, success, error) {
  $.ajax({
    url : url,
    dataType : 'json',
    type : 'get',
    cache : false,
    success : success,
    error : function(){
      console.error(arguments);
    }
  });
}