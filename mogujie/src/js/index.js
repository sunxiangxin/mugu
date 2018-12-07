
(function fn() {
    //首页用户名的显示
    var url = $(location).attr("href");
    var userName = url.split("?")[1];
    var str = `<img src="https://s10.mogucdn.com/mlcdn/c45406/181016_143l3ehl4ebad6c2326gjk6d4h41g_48x48.png"
    class="header-login-icon" alt="">${userName},您好`
    $(".J_header-login").html(str);

    //点击购物车，跳转
    $("#shopCar").click(function(){
        $(location).attr('href', `./car.html?${userName}`);
    });
})()

//点击轮播图 跳转详情页
function ClickFn() {
    this.onClick = function () {
        $(".item-box").on("click", function(){
            var id = $(this).attr("data-id");   
            //将id  传入详情页
            $(location).attr('href', `./detail.html?id=${id}&type=banner`);
        })        
    }
}
//点击猜你喜欢  跳转详情页
function ClickLike() {
    this.onClick = function () {
        $(".goods_item").on("click", function(){
            var id = $(this).attr("data-id");   
            console.log(id);
            //将id  传入详情页
            $(location).attr('href', `./detail.html?id=${id}&type=like`);
        })        
    }
}




