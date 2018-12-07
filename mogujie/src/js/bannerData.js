(function fn() {
//获取轮播图的数据
    $.ajax({
        type: "get",
        url: "../json/banner.json",
        datatype: "json",
        success: function (arr) {
            var str = $(".mslide_banners").html();
            var pageNum = arr.length / 4;
            for (var j = 1; j <= pageNum; j++) {
                str += `<div class="preload_box_${j - 1} mslide_banner mslide_banner_show style="">`;
                for (var i = (j - 1) * 4; i < j * 4; i++) {
                    //解决最后一页的bug  下标越界 
                    if (i < arr.length) {
                        str += `<div class="fl item-box cube-acm-node has-log-mod" data-id="${arr[i].id}" data-src="${arr[i].src}">
                                        <a rel="nofollow" class="goods-image J_dynamic_imagebox J_loading_success" href="#"  img-src="${arr[i].src}" >
                                            <img class="J_dynamic_img fill_img" src="${arr[i].src}"  alt="">
                                        </a>
                                        <a class="goods-title" href="##">
                                              ${arr[i].title}
                                        </a>
                                        <div class="goods-price">
                                            <em>￥${arr[i].price}</em>
                                            <del>￥${arr[i].delprice}</del>
                                        </div>
                                    </div>`;
                    }
                }
                str += "</div>"
                $(".mslide_banners").html(str);
                $(".mslide_banner").eq(0).css({ left: 0 }).end().nextAll().css({ left: -950 });
                $(".mslide_banners").autoPlay($(".mslide_banner")).onBtn($(".mslide_toggle_btn"), $(".mslide_banner")).enter().leave($(".mslide_banner"));
                //实例化一个对象，数据渲染后调用点击事件的函数
                var a = new ClickFn();
                a.onClick();

            }
        }
    })

})()
