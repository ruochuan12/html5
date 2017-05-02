var http = require('http');
var fs = require('fs');
var io = require('socket.io');

var documentRoot = 'E:/HTML5/websocket/www';

var httpServer = http.createServer(function(req, res) {
	
	var url = req.url;
	//console.log(url);
	
	var file = documentRoot + url;
	console.log(file);
	
	fs.readFile(file, function(err, data) {
		
		if (err) {
			res.writeHeader(404, {
				'content-type' : 'text/html;charset="utf-8"'
			});
			res.write('<h1>404</h1><p>你要找的页面被LEO吃了</p>');
			res.end();
		} else {
			res.writeHeader(200, {
				'content-type' : 'text/html;charset="utf-8"'
			});
			res.write(data);
			res.end();
		}
		
	});
	
}).listen(8888);

var socket = io.listen(httpServer);

socket.sockets.on('connection', function(socket) {
	
	//socket
	
	//console.log('有人通过socket连接进来了');
	
	socket.emit('hello', '欢迎');
	
	/*socket.on('hellotoo', function(data) {
		console.log(data);
	})*/
	
	//socket.broadcast.emit('a');
	
	socket.broadcast.emit('a', '有新人进来了');
	
	socket.on('move', function(data) {
		
		socket.broadcast.emit('move2', data);
		
	});
	
});