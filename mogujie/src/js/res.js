//注册

//注册的正则验证功能
(function flag() {
    //用户名至少3位，开头不能为数字
    var regName = /^[a-zA-Z_]\w{2,}$/;
    var regPwd = /^\w{6,}$/; //密码至少六位
    var userFlag = false;
    var pwdFlag = false;
    var repwdFlag = false;
    //用户名
    $(".userName").on("keyup", () => {

        if ($(".userName").val().length > 2) {
            userFlag = regName.test($(".userName").val());
            if (userFlag) {
                $(".userSpan").html("用户名可用");

            } else {
                $(".userSpan").html("用户名不可用");
            }
        } else {
            $(".userSpan").html("用户名不可用");
        }

        //检测用户名是否存在
        var txt = $(".userName").val();//发送的文本
        var ajax = new XMLHttpRequest();
        ajax.open("get", "http://127.0.0.1/mogujie/src/php/checkNameDB.php?username=" + encodeURI(txt));
        ajax.send();
        ajax.onreadystatechange = function () {
            if (ajax.status == 200 && ajax.readyState == 4) {
                //获取服务器返回的结果
                if (ajax.responseText == "1") {
                    $(".userSpan").html("用户名可用");
                } else {
                    $(".userSpan").html("用户名已存在");
                    userFlag = false;
                    // alert("注册失败");
                    // location.href = "../html/res.html";
                }
            }
        }
    })
    //密码
    $(".userPwd").on("keyup", () => {
        if ($(".userPwd").val().length > 5) {
            pwdFlag = regPwd.test($(".userPwd").val());
            if (pwdFlag) {

                $(".pwdSpan").html("密码合法");
            } else {
                $(".pwdSpan").html("密码不合法");
            }
        } else {
            $(".pwdSpan").html("密码不合法");
        }
    })
    //确认密码
    $(".reuserPwd").on("keyup", () => {

        if ($(".reuserPwd").val() == $(".userPwd").val()) {
            repwdFlag = true;
            $(".repwdrSpan").html("输入正确");
        } else {
            repwdFlag = false;
            $(".repwdrSpan").html("密码不一致");
        }
    })
    //提交注册
    $(".resbtn").on("click", () => {
        var uname = $(".userName").val();
        var upwd = $(".userPwd").val();
        var data = `status=register&uname=${uname}&upwd=${upwd}`;
        if (userFlag && pwdFlag && repwdFlag) {
            var ajax = new XMLHttpRequest();
            ajax.open("GET", "http://127.0.0.1/mogujie/src/php/login_register.php?" + data);
            ajax.send();

            ajax.onreadystatechange = function () {


                if (ajax.status == 200 && ajax.readyState == 4) {
                    //php返回的数字
                    if (ajax.responseText == 1) {

                        alert("注册成功");
                        $(location).attr("href", "../html/login.html");
                    } else {
                        alert("注册失败");
                        $(location).attr("href",  "../html/res.html");                   
                    }
                }
            }
        } else {
            alert("输入有误");
        }

    })
})()


