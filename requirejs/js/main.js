console.log('这里是main模块');
require.config({
	paths:{
		jquery:'libs/jquery-3.1.0.min'
	}
	//paths中可以写成['libs/angular','']，第二个是备选，第一个加载失败时加载第二个，比如使用cdn的时候。
	//shim:把没有支持amd写法的转成支持 amd写法。
});
require(['a','b','c'],function(a,b,cM){
	//如果是a.js则是相对于requirejs/这个文件夹。如果是a则是相对于data-main里的文件路径（也就是默认baseUrl）
	a.aFn();
	b.bFn();
	cM.cFn();
});
//requirejs如何结合使用jquery
/*
require(['jquery'],function(){			//这里不管参数是啥（即使为空），jquery都运行正常。
	// $('body').before('<p>加载了jquery</p>');
	$('body').append('<p>append----加载了jquery</p>');
});
*/