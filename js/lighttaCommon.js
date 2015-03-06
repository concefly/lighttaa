var loginFlag = false;
$(function(){
	isLogin();
});

/**
*
*功能：显示登录层
*
*/
function showLogin(){
	$('#myModal').modal('show');
}
/**
*
*功能：显示登录层
*
*/
function toRegister(){
	window.location.href = "/register.html";
}
/**
*
*功能：是否需要提示登陆
*
*/
function needLogin(){
	if(!loginFlag){
		$('#myModal').modal('show');
		return true;
	}else{
		return false;
	}	
}
/**
*
*功能：判断用户是否已经登陆
*
*/
function isLogin(){
	var userName = $.cookie('lightTa');
	if(typeof(userName) == "undefined"||userName==""){
		$.ajax({
	        type: "GET", 
	        url: "index!getLoginState.action",
	        data: {pageCount:3},
	        dataType: "json",
	        cache:false,
	        success: function(data){
	            if(data.email!=""){
	            	loginFlag = true;
	            }
	         }
	    });
	}else{
		var text = "<li class='dropdown'>"+
						  "<a href='#' class='dropdown-toggle' data-toggle='dropdown'>"+userName+" <b class='caret'></b></a>"+
						  "<ul class='dropdown-menu'>"+
							"<li><a href='#' onclick='toMyHome()'>我的聚光塔</a></li>"+
						  "</ul>"+
					 "</li>"+
					 "<li><a href='#' onclick='loginOff()' >退出</a></li>";
		
		$("#welcome").html(text);
		loginFlag = true;
	}
}
/**
*
*功能：跳转到我的cumps
*
*/
function toMyHome(){

	if(!needLogin()){
		window.location.href = "/index!myHome.action";
	}
}
/**
*
*功能：注册
*
*/
function register(){
	window.location.href = "/register.html";
}
/**
*
*功能：注销
*
*/
function loginOff(){
    if(confirm("确定退出聚光塔？")){
		$.ajax({
	        type: "POST", 
	        url: "/user!loginOff.action",
	        data: {pageCount:3},
	        dataType: "json",
	        cache:false,
	        success: function(data){
	            if(data.status=="success"){
	            	window.location.href = "/";
	            }else{
	            	alert("不好意思，注销失败了");
	            }
	         }
	    });
    }
}
/**
*
*功能：忘记密码
*
*/
function forgetPassword(){
	window.location.href = "/forgetPassword.html";
}

/**
*
*功能：跳转到频道
*
*/
function gotoChannel(code){
	var url = "/html/cyxt/"+code+"/list/1.html";
	window.location.href = url;
}
/**
*
*功能：跳转安卓的app下载--应用宝
*
*/
function toDownLodaAndroidApp(){
   //window.open("/html/app/downLoad/lightta(beta).apk");
   window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=cn.buaa.lightta";
}
/**
*
*功能：跳转安卓的app下载--本地
*
*/
function toDownLodaAndroidAppIndex(){
   window.open("/html/app/downLoad/lightta(beta).apk");
   //window.open("http://zhushou.360.cn/detail/index/soft_id/2183133");
}
/**
*
*功能：跳转到频道
*
*/
function toDownLodaIphoneApp(){
   window.open("https://itunes.apple.com/cn/app/lightta/id910428313?mt=8");
}

/**
*
*功能：发表评论
*
*/
function publishComment(){
	var content = $("#content").val();
	if(content==""){
		alert("评论不能为空！");
		return;
	}
	$.ajax({
		cache: false,
		type: "POST",
		url:"/comment!publishComment.action",	 
		data:$('#commentForm').serialize(),	 
		async: false,
		dataType: "json",
		error: function(request) {
		    alert("发表失败！");
		},
		success: function(data) {
			if(data.status=="noLogin"){
				alert("请先登录！");
			}
			if(data.status=="success"){
			    alert("发表成功！");
			    window.location.reload();
			}

		}
	});
}

/**
*
*功能：创建我的项目
*
*/

function createMyProject(){
	if(!needLogin()){
		window.open("/project!toCreateMyProject.action");
	}
}

/**
*
*功能：创建业务共享
*
*/

function createOutsourcing(){
	if(!needLogin()){
		window.open("/outsourcing!toCreateMyOutsourcing.action");
	}
}
