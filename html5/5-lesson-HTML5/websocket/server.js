var http = require('http');

var serv = http.createServer(function(req, res) {
	
	console.log('有人进来了');
	
	/*res.writeHeader(200, {
		'content-type' : 'text/html;charset="utf-8"'
	});*/
	
	/*res.writeHeader(404, {
		'content-type' : 'text/html;charset="utf-8"'
	});
	
	res.write('你要访问的页面资源不存在！');
	res.end();*/
	
	console.log(req);
	
}).listen(8888);

console.log('服务器开启成功');