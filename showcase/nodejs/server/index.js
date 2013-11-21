var server = require('./Server');
var router = require('./Router');
var handle = require('./Handler');

server.start(router.route, handle.handles);