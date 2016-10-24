define(function(){
	console.log('b');
	function bFn(){
		console.log('这里是b模块');
	}
	return {
		bFn:bFn
	}
});