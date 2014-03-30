var http = require('http');
var url = require('url');

var startServer = function(route, handler){
	var onRequest = function(req, resp){
		// var postData = "";
		// console.log('接收到请求...' + url.parse(req.url).pathname);
		// req.addListener('data', function(postDataChunk){
			// postData += postDataChunk;
		// });
// 		
		// req.addListener('end', function(){
		route(handler, url.parse(req.url).pathname, req, resp);
		// });
	}
	
	http.createServer(onRequest).listen(8888);
	console.log('nodejs server listening on 8888.');
}

exports.start = startServer;