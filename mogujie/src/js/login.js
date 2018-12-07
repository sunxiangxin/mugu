//登录功能
(function fn() {
     $(".loginBtn").on("click", () => {
          var uname = $(".userName").val();
          var upwd = $(".userPwd").val();
          var data = `status=login&uname=${uname}&upwd=${upwd}`;
          var ajax = new XMLHttpRequest();
          ajax.open("GET", "http://127.0.0.1/mogujie/src/php/login_register.php?" + data);
          ajax.send();

          ajax.onreadystatechange = function () {
               if (ajax.status == 200 && ajax.readyState == 4) {
                    var res = ajax.responseText;
                    if (res == 1) {
                         alert("登录成功");
                         // location.href = "../html/index.html?"+uname;
                         $(location).attr("href", "../html/index.html?" + uname);
                    } else if (res == 2) {
                         alert("密码错误");
                    } else if (res == 0) {
                         alert("用户名不存在");
                    }
               }
          }
     })
     $(".resBtn").on("click", () => {
          $(location).attr("href", "./res.html");
     })
})()
