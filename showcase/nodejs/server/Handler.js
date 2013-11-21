var fs = require('fs');
var formidable = require('formidable');

var index = function(req, resp){
	var html = '<!doctype html>';
		html += '<html lang="en">';
		html += ' <head>';
		html += '<meta charset="UTF-8" />';
		html += '<title>Document</title>';
		html += '</head>';
		html += '<body>';
		html += '<h1>首页</h1>';
		html += '<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="thumnail" multiple="multiple"/> <button type="submit">提交</button></form>'
		html += '</body>';
		html += '</html>';
	resp.write(html);
	resp.end();
}

var upload = function(req, resp){
	if( req.method.toLowerCase() === 'post' ){
		console.info('上传文件');
		var form = new formidable.IncomingForm();
		form.uploadDir = 'tmp';
		form.parse(req, function(err, fields, files){
			fs.renameSync(files.thumnail.path, "tmp/test2.png");
			resp.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
			resp.write('<h1>上传成功</h1>');
			resp.write('<img src="/show">');
			resp.end();
		});
	}else{
		resp.writeHead(500, {"Content-Type": "text/html;charset=utf-8"});
		resp.write('<h1>请使用post方式上传图片</h1>');
		resp.end();
	}
}

var show = function(req, resp){
	fs.readFile('tmp/test2.png', function(err, file){
		if(err){
			resp.writeHead(500, {'Content-type' : 'text/html;charset=utf-8'});
			resp.write(err + '');
			resp.end();
		}else{
			resp.writeHead(200, {'Content-type' : 'image/png'});
			resp.write(file, 'binary');
			resp.end();
		}
	});
}

var handles = {}
handles["/"] = index;
handles['/index'] = index;
handles['/upload'] = upload;
handles['/show'] = show;

exports.handles = handles;