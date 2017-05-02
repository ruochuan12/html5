<?php
header('Content-type:text/html; charset="utf-8"');
$upload_dir = 'uploads/';

if(strtolower($_SERVER['REQUEST_METHOD']) != 'post'){
	exit_status(array('code'=>1,'msg'=>'错误提交方式'));
}

if(array_key_exists('file',$_FILES) && $_FILES['file']['error'] == 0 ){
	
	$pic = $_FILES['file'];
	
	if(move_uploaded_file($pic['tmp_name'], $upload_dir.$pic['name'])){
		exit_status(array('code'=>0,'msg'=>'上传成功','url'=>$upload_dir.$pic['name']));
	}
	
}
echo $_FILES['file']['error'];
exit_status(array('code'=>1,'msg'=>'出现了一些错误'));

function exit_status($str){
	echo json_encode($str);
	exit;
}
?>