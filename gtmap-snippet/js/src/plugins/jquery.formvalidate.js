/*
 * @name: jquery 表单验证插件
 * @author: zhangyang
 */
(function($){
  
  var ruleMap = {
    'required' : {
      'exp' : /^\S+$/,
      'tip' : '不能为空'
    },
    'number' : {
      'exp' : /^[\-\+]?((([0-9]{1,3})([,][0-9]{3})*)|([0-9]+))?([\.]([0-9]+))?$/,
      'tip' : '无效数字'
    },
    'chs' : {
      'exp' : /^[\u4e00-\u9fa5]+$/,
      'tip' : '无效中文'
    },
    'eng' : {
      'exp' : /^[a-zA-Z\ \']+$/,
      'tip' : '无效英文'
    }
  }
  
  var Element = function( elem, ruleIds, options ){
    this.elem = elem;
    this.options = options;
    this.$elem = $(elem);
    this.rules = [];
    this.init( ruleIds );
  }
  Element.prototype = {
    init : function( ruleIds ){
      var self = this;
      self.$elem.blur(function(){
        self.check();
      });
      var ruleIdArray = $.trim(ruleIds).split(',');
      for( var i in ruleIdArray ){
        this.rules.push( ruleMap[$.trim(ruleIdArray[i])] );
      }
    },
    check : function(){
      var val = $.trim( this.$elem.val() );
      var self = this;
      for( var i in this.rules ){
        if( this.rules[i].exp.test( val ) ){
          this.options.onSuccess( this.elem );
        }else{
          this.options.onFailure( this.elem, this.rules[i].tip );
          return;
        }
      }
    }
  }
  
  var Form = function( elem, options ){
    this.$elem = $(elem);
    this.options = options;
    this.list = [];
    this.init();
  }
  Form.prototype = {
    init : function(){
      var self = this;
      self.$elem.find('input[data-validate]').each(function(){
        var rules = $(this).attr('data-validate');
        if( /^\S+$/.test( rules ) ){
          self.list.push( new Element( this, rules, self.options ) );
        }
      });
    },
    validateAll : function(){
      for( var i in this.list ){
        this.list[i].check();
      }
    }
  }
  
  var defaults = {
    onSuccess : function( elem ){
      var $td = $( $(elem).parents('td')[0] );
      var $tip = $td.children('.tip-info');
      $td.removeClass('error').addClass('success');
      $tip.length && $tip.addClass('hide');
    },
    onFailure : function( elem, tip ){
      var $td = $( $(elem).parents('td')[0] );
      var $tip = $td.children('.tip-info');
      $td.addClass('error');
      ( $tip.length && $tip.removeClass('hide').html(tip) ) || $td.prepend('<span class="tip-info">'+ tip +'</span>');
    }
  }
  
  $.fn.formvalidate = function( options ){
    var opts = $.extend(true, defaults, options);
    var form = new Form(this, opts);
    this.data('form', form);
    return this;
  }
  
}(jQuery));