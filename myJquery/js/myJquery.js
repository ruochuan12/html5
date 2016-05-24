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

//获取CLASS节点数组
Base.prototype.getClass = function (className, idName) {
	var node = null;
	if (arguments.length == 2) {
		node = document.getElementById(idName);
	} else {
		node = document;
	}
	var all = node.getElementsByTagName('*');
	for (var i = 0; i < all.length; i ++) {
		if (all[i].className == className) {
			this.elements.push(all[i]);
		}
	}
	return this;
}


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

//设置鼠标移入移出方法
Base.prototype.hover = function (over, out) {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
	}
	return this;
};

//设置显示
Base.prototype.show = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'block';
	}
	return this;
}

//设置隐藏
Base.prototype.hide = function () {
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.display = 'none';
	}
	return this;
}


//设置物体居中
Base.prototype.center = function (width, height) {
	var top = (document.documentElement.clientHeight - 250) / 2;
	var left = (document.documentElement.clientWidth - 350) / 2;
	for (var i = 0; i < this.elements.length; i ++) {
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';
	}
	return this;
}


//触发浏览器窗口事件
Base.prototype.resize = function (fn) {
	window.onresize = fn;
	return this;
}
