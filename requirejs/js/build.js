/**
 * [dir description]：构建优化成一个js文件
 * @type {String}
 */
({
	dir:'./dist',
	modules:[{
		name:'main'
	}],
	fileExclusionRegExp:'/^(r|build)\.js$/',
	removeCombined:true
});