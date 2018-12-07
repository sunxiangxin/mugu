<?php
	//接收客户端传递的数据
	$uname = $_GET["username"];
	
	header("content-type:text/html;charset=utf-8");
	$db = mysql_connect("localhost","root","root");
	mysql_select_db( "data" , $db );
	mysql_query("set names utf8");
	
	$sql = "select * from user where uname='$uname'";
	
	$res = mysql_query($sql);
	
	$arr = mysql_fetch_array($res);
	
	if( $arr ){
		echo 2;//不可用
	}else{
		echo 1;//可以
	}
?>