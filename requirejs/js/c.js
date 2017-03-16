// CMD的写法
/*define(function(require){
	console.log('c模块');
	var aM = require('a');	
	aM.aFn();		// 输出'这里是a函数模块'
	var cFn = function(){
		console.log('这里是c模块的cFn函数');
	}
	// requirejs也支持CMD的写法，但是依旧是先加载。先输出a模块，再输出c模块，然后再输出"这里是a模块的aFn函数"。
	// 由于 RequireJS 是执行的 AMD 规范, 因此所有的依赖模块都是先执行。与seajs不同。
	return {
		cFn:cFn
	}
});*/
// AMD写法->与CMD写法执行结果是一样的。（建议写法）
define(['a'], function(aM){
	console.log('c模块');
	// var aM = require('a');	
	aM.aFn();		// 输出'这里是a函数模块'
	var cFn = function(){
		console.log('这里是c模块的cFn函数');
	}
	// requirejs也支持CMD的写法，但是依旧是先加载。先输出a模块，再输出c模块，然后再输出"这里是a模块的aFn函数"。
	// 由于 RequireJS 是执行的 AMD 规范, 因此所有的依赖模块都是先执行。与seajs不同。
	return {
		cFn:cFn
	}
});