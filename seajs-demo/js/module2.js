define(function(require,exports,module){
	// require('module3.js');			//100
	var a = require('module3.js').a;	//200
	// 
	function show(){
		alert(2);
	}
	exports.show = show;
	function showA(){
		alert(a);
	}
	exports.showA = showA;
});