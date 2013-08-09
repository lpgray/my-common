require.config({
  paths : {
    jquery: 'lib/jquery-1.9.1.min',
  }
});

require(['service/find'], function( find ){
  // 你可以在这里写 main 的代码。
  
  return {
    'main' : 'main'
  }
});