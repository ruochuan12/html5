define(function(require){
	console.log('c');
	var aM = require('a');
	aM.aFn();
	function cFn(){
		console.log('这里是c模块');
	}
	//requirejs也支持CMD的写法，但是依旧是先加载。先输出a，在输出c。
	//由于 RequireJS 是执行的 AMD 规范, 因此所有的依赖模块都是先执行。与seajs不同。
	return {
		cFn:cFn
	}
});