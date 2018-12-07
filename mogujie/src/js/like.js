(function(){
    //获取猜你喜欢的数据
    $.ajax({
        type:"get",
        url:"../json/hotProduct.json",
        datatype:"json",
        success: function(data){
                var str = '';
               $(data).each(function(index,ele){
                    str += `
                            <div class="iwf goods_item"  data-id="${data[index].id}" data-src="${data[index].img}">
                                <a class="likeLink yahei"   >找相似</a>
                                <a class="img pagani_log_link J_dynamic_imagebox loading_bg_120 J_loading_success"   img-src="${data[index].img}"
                                    need-remove="no" >
                                    <img  class="J_dynamic_img fill_img" src="${data[index].img}"  alt="" style="">
                                </a>
                                <a href="#" class="pagani_log_link goods_info_container"  >
                                    <p class="title yahei fl" style="height:40px;margin-bottom:3px">${data[index].content}</p>
                                    <div class="goods_info fl">
                                        <b class="price_info yahei">${data[index].price}</b>
                                        <span class="fav_num fr">
                                        <img  class="fav_num_img" src="//s18.mogucdn.com/p2/160908/upload_27g4f1ch6akie83hacb676j622b9l_32x30.png"   alt="">480</span>
                                    </div>
                                </a>
                        </div>`;
               });
               $(".like_content").html(str);
               var like = new ClickLike();
               like.onClick();
            //    console.log($(".bannerDivs"));
        }
    })

})()