var router = function(handler, pathname, req, resp){
	if( handler[pathname] ){
		handler[pathname](req, resp);
	}else{
		resp.writeHeader(404, {'Content-type' : 'text/html;charset=utf-8'});
		resp.write('404, 无法找到资源');
		resp.end();
	}
}
exports.route = router;