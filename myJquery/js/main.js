window.onload=function(){
	console.log($().getId('div1').html());
	$().getId('div1').click(function(){
		alert(1);
	});

}