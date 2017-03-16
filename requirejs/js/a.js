define([],function(){
	console.log('a模块');
	var aFn = function(){
		console.log('这里是a模块的aFn函数');
	}
	return {
		aFn:aFn
	}
});