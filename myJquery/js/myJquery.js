//前台调用
var $ = function () {
	return new myJquery();
}

//基础库
function myJquery(){};

//创建一个数组，来保存获取的节点和节点数组
myJquery.prototype.elements = [];

//获取ID节点
myJquery.prototype.getId = function (id) {
	this.elements.push(document.getElementById(id));
	return this;
};

//获取TagName
myJquery.prototype.getTagName = function(tag) {
	this.elements.push(document.getElementsByTagName(tag));
	return this;
};

//设置innerHTML
myJquery.prototype.html = function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length === 0){
			//这里不需要链式操作了。
			return this.elements[i].innerHTML;
		
		}else if(arguments.length === 1){
			this.elements[i].innerHTML = str;
		}
	}
	return this;
};

//添加点击事件
myJquery.prototype.click = function(fn) {
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
	return this;
};