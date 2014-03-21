var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
      end();
    }
  });
}

var i = 0, found = {'_img': true, '_common': true, '_js' : true, '_controls' : true};

function func(data) {
	var index = data.indexOf('imgs.xici.net/');
	if(index > -1){
		// 截取imgs.xici.net后的几个字符串
		// console.info(data.substring(index - 12, 10));
		var target = data.substring(index, index+40);
		var firstIndex = target.indexOf('/');

		var sub = target.substring(firstIndex+1);
		var secondIndex = sub.indexOf('/');

		var key = sub.substring(0, secondIndex);
		// console.info(key);
		// console.info(key, target);
		// var str = target.substring(0, lastIndex);
		if(!found[key]){
			i++
			console.info(i, target, data.substring(0, 5));
			found[key] = true;
		}
	}
}

function end(){
	console.info(found);
}

var input = fs.createReadStream('tmp/imgs_result.txt');
readLines(input, func);