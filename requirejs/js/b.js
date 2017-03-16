define(function(){
	console.log('b模块');
	var bFn = function(){
		console.log('这里是b模块的bFn函数');
	}
	return {
		bFn:bFn
	}
});