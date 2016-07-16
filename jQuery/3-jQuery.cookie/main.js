$(function() {
	console.log('jq');
    //回滚原来的位置
    var str = window.location.href;
    str = str.substring(str.lastIndexOf("/") + 1);
    if ($.cookie(str)) {
        $("html,body").animate({ scrollTop: $.cookie(str) }, 100000000);
        console.log('cookie');
    };
    $(window).scroll(function() {
    	// console.log('scroll');
        var str = window.location.href;
        str = str.substring(str.lastIndexOf("/") + 1);
        var top = $(document).scrollTop();
        $.cookie(str, top, { path: '/' });
        return $.cookie(str);
    });


    // //点击跳页面
    // $('.shop_info span').bind('click',function(e){
    // 	e.preventDefault();
    // 	var id=$(this).attr('id');
    // 	window.location.href='/shop/category/'+id+'.html';
    // });

});
