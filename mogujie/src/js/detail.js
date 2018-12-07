//商品详情页
(function fn() {
    var url = $(location).attr("href");
    //获取当前页面商品的id         ?id=${id}&type=banner`
    var arr = url.split("?")[1].split("&");
    var json = {
        type: null,
        id: null
    };
    var  Index;
    var imgStr = "";
    $(arr).each(function (index, ele) {
        if (ele.split("=")[0] == "id") {
            json.id = ele.split("=")[1];
            aIndex = parseInt(json.id) - 1;
        }
        if (ele.split("=")[0] == "type") {
            json.type = ele.split("=")[1];
        }
    })

    if (json.type == "banner") {
        // jsonUrl = "../json/banner.json";
        $.ajax({
            type: "get",
            url: "../json/banner.json",
            dataType: "json",
            success: function (data) {
                json.src = data[aIndex].src;
                json.title = data[aIndex].title;
                json.price = data[aIndex].price;
                json.delprice = data[aIndex].delprice;
                //主要商品信息
                $(".goods-title>span").html(data[aIndex].title);
                $("#J_OriginPrice").html(data[aIndex].delprice);
                $("#J_NowPrice").html(data[aIndex].price);
                $("#J_BigImg").attr("src", data[aIndex].src);
                $(".list_1>img").attr("src", data[aIndex].src);
                $(".list_2>img").attr("src", data[aIndex].detailImage[3]);
                $(".list_3>img").attr("src", data[aIndex].detailImage[4]);
                $(".list_4>img").attr("src", data[aIndex].detailImage[5]);
                $(".list_5>img").attr("src", data[aIndex].detailImage[6]);
  
                $(".middle_img").html();

                //商品图片详情
                $(data[aIndex].detailImage).each(function (index, ele) {
                    imgStr += ` <div class="middle_img">
                                            <div class="list">
                                                <img  src="${ele}"> 
                                            </div>
                                        </div> `;
                });
                $(".middle_wrap").html(imgStr);
                arr = [];
                for (let i = 0; i < 3; i++) {
                    var random = Math.floor(Math.random() * data.length);
                    if (arr.indexOf(random) == -1) {
                        $(".box>ul>li>a>img").eq(i).attr("src", data[random].src);
                        $(".box>ul>li>span").eq(i).html('￥' + data[random].price);
                        arr.push(random);

                    } else {
                        i--;
                    }
                }
            }
        })
    } else if (json.type == "like") {
    // jsonUrl = "../json/hotProduct.json";
    $.ajax({
        type: "get",
        url: "../json/hotProduct.json",
        dataType: "json",
        success: function (data) {
            // data代表获取的数据，相当于res
            //  //给商品加自定义属性，存贮图片地址
            //  $(".list>ul>li>")
            json.src = data[aIndex].img;
            json.title = data[aIndex].content;
            json.price = data[aIndex].price;
            json.delprice = data[aIndex].delprice;
            
            //主要商品信息
            $(".goods-title>span").html(data[aIndex].content);
            //  $("#J_OriginPrice").html(data[index].delprice);
            $("#J_NowPrice").html(data[aIndex].price);
            $("#J_BigImg").attr("src", data[aIndex].img);
            $(".list_1>img").attr("src", data[aIndex].img);
            $(".list_2>img").attr("src", data[aIndex].minImg[0]);
            $(".list_3>img").attr("src", data[aIndex].minImg[1]);
            $(".list_4>img").attr("src", data[aIndex].minImg[2]);
            $(".middle_img").html();

            //商品图片详情
            $(data[aIndex].minImg).each(function (index, ele) {
                imgStr += ` <div class="middle_img">
                                    <div class="list">
                                        <img  src="${ele}"> 
                                    </div>
                                </div> `;
            });
            $(".middle_wrap").html(imgStr);
            arr = [];
            for (let i = 0; i < 3; i++) {
                var random = Math.floor(Math.random() * data.length);
                if (arr.indexOf(random) == -1) {
                    $(".box>ul>li>a>img").eq(i).attr("src", data[random].img);
                    $(".box>ul>li>span").eq(i).html(data[random].price);
                    arr.push(random);

                } else {
                    i--;
                }
            }


        }
    })
}
//鼠标移入小图变大
new HoverSmallImg().hover();
//加减事件   添加购物车
var click = new AddCar();
click.init();
click.addList(json);

//点击购物车事件
$(".header-cart-center").click(function(){
    $(location).attr("href","./car.html");
})

}) ()
//鼠标移入小图变大
function HoverSmallImg() {
    this.hover = function () {
        $(".list>ul>li").on("mouseenter", function () {
            var src = $(this).children(0).attr("src");
            $("#J_BigImg").attr("src", src);
        })
    }
}

function AddCar() {
    this.init = function () {
        this.onAdd();
    }
    //加减按钮
    this.onAdd = function () {
        $(".num-add").on("click", function () {
            var a = Number($(".num-input").val()) + 1;
            $(".num-input").val(a);
        })
        $(".num-reduce").on("click", function () {
            var a = Number($(".num-input").val()) - 1;
            if (a < 1) {
                $(".num-input").val(1);
            } else {
                $(".num-input").val(a);
            }
        })
    }
    //点击加购，将id和数量存入localStorage,
    this.addList = function (json) {
        $("#J_BuyCart").click(function () {
            json.num = $(".num-input").val();
            // console.log(json);            
            var str = JSON.stringify(json);
             localStorage.setItem( json.type+json.id , str);
        });
    }
}

// localStorage