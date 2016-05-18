//sea下的参数 : 不允许修改的,
//可以按顺序写一个，两个，三个，但建议全写上
define(function(require,exports,module){
	// require是依赖。
	function show(){
		alert(1);
	}
	//exports : 对外提供接口的对象
	exports.show = show;
});