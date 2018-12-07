//二级栏的显示
$(".nav_list>li").on("mouseenter",function(){
    var index = $(this).index();
    $(".nav_more_content").show();
    $(".nav_more_content>div").eq(index).show().siblings().hide();
}).on("mouseleave",function(){
    $(".nav_more_content").hide();
})
$(".nav_more_content").on("mouseenter",function(){
    $(this).show();
}).on("mouseleave",function(){
    $(this).hide();
})

//导航栏




//查看数据测试
// $.ajax({
//     type: "get",
//     // url: "/Ajax/Product/AjaxProBrowseHV13.aspx?pagesize=7",
//     url: "/h5/mwp.shopappservice.goodsAll/1/?mw-appkey=100028&mw-t=1543894537210&mw-uuid=b439d8d8-a05d-49a7-b68b-f2865edca918&mw-ttid=NMMain%40mgj_pc_1.0&mw-sign=80fa7d92f214b1f6bf613aa21fa389d3&data=%7B%22shopId%22%3A%2214eim%22%2C%22page%22%3A1%2C%22shopType%22%3A%22mgjpc%22%2C%22pageSize%22%3A60%2C%22sort%22%3A%22%22%7D&callback=mwpCb6&_=1543894537213",
//     dataType: "json",
//     beforeSend: function(xhr){
//         xhr.setRequestHeader("Referer","https://shop.mogujie.com/14eim");
//     },
//     success: function (data) {
//         // data代表获取的数据，相当于res
//         getData(data);
//     }
// })
// function getData(data){
//     console.log(1);
//     console.log(data);
// }

//              /h5/mwp.shopappservice.goodsAll/1/?mw-appkey=100028&mw-t=1543894537210&mw-uuid=b439d8d8-a05d-49a7-b68b-f2865edca918&mw-ttid=NMMain%40mgj_pc_1.0&mw-sign=80fa7d92f214b1f6bf613aa21fa389d3&data=%7B%22shopId%22%3A%2214eim%22%2C%22page%22%3A1%2C%22shopType%22%3A%22mgjpc%22%2C%22pageSize%22%3A60%2C%22sort%22%3A%22%22%7D&callback=mwpCb6&_=1543894537213

