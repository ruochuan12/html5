//Download by http://www.codefans.net.
//Modify by Rowboat
//@罗小川chuan，http://weibo.com/lxchuan12
var fadeEffect = function() {
    
    var buttons = document.getElementById('buttons');
	// var fadeIn = buttons.getElementsByTagName('button')['0'];
	// var fadeOut = buttons.getElementsByTagName('button')['1'];
	console.log(buttons);
	
	var fadeIn_Out = function() {
	    return {
	        init: function(id, flag, target) {
	            this.elem = document.getElementById(id);
	            clearInterval(this.elem.si);
	            this.target = target ? target: flag ? 100 : 0;
	            this.flag = flag || -1;
	            this.alpha = this.elem.style.opacity ? parseFloat(this.elem.style.opacity) * 100 : 0;
	            this.si = setInterval(function() {
	                fadeIn_Out.tween();
	            },
	            20);
	        },
	        tween: function() {
	            if (this.alpha == this.target) {
	                clearInterval(this.si);
	            } else {
	                var value = Math.round(this.alpha + ((this.target - this.alpha) * .05)) + (1 * this.flag);
	                this.elem.style.opacity = value / 100;
	                this.elem.style.filter = 'alpha(opacity=' + value + ')';
	                this.alpha = value;
	            }
	        }
	    }
	}();

	fadeIn_Out.init('fade','1');
} ();
