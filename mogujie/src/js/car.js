
(function fn() {
    //首页用户名的显示
    var url = $(location).attr("href");
    var userName = url.split("?")[1];
    // var $items = null;
    var str = `<img src="https://s10.mogucdn.com/mlcdn/c45406/181016_143l3ehl4ebad6c2326gjk6d4h41g_48x48.png"
    class="header-login-icon" alt="">${userName},您好`
    $(".J_header-login").html(str);
    //从localStorage 中获取数据 存在页面
    var str_ = '';
    for (var i = 0; i < localStorage.length; i++) {

        var key = localStorage.key(i);
        //将localStorage获取的字符串转对象
        var val = JSON.parse(localStorage.getItem(key));
        str_ += `

       <tr class="cart_mitem s-undo "  data-ls="${key}" >
           <td class="vm ">
               <div style="display: block;"> 
               <input type="checkbox" class="cart_thcheck" > </div>
           </td>
           <td class="cart_table_goods_wrap">
               <div >
                   <a href="//shop.mogujie.com/detail/1km0leo?ptpfrom=1.uSCk8gW7._items.4.Y0bmFhBA"  target="_blank" class="cart_goods_img"> 
                       <img class="cartImgTip" src="${val.src}" width="78" height="78" alt="${val.title}">
                       <img class="pintuanImgTip" src="https://s3.mogucdn.com/mlcdn/c45406/170818_883j546lh5964hicagc652lga5g23_78x42.png">
                   </a> 
                   <a href="//shop.mogujie.com/detail/1km0leo?ptpfrom=1.uSCk8gW7._items.4.Y0bmFhBA"   target="_blank" class="cart_goods_t cart_hoverline" title="复古港味新款气质宽松百搭长袖套头毛衣显瘦纽扣针织衫学生上衣潮">
                   ${val.title} 
                   </a>
               </div>
           </td>
           <td>
               <div  >
                   <p class="cart_lh20">颜色：酒红色</p>
                   <p class="cart_lh20">尺码：均码</p>
               </div>
           </td>
           <td class="cart_alcenter">
               <div >
                   <!-- 单价 -->
                   <p class="cart_lh20 cart_throughline cart_lightgray">${val.delprice}</p>
                   <p class="cart_lh20 cart_bold cart_data_sprice" data-price="63.00">${val.price}</p>
                   <p> <span class="cart_tip_yellow cart_tip_focuswidth">拼团价</span> </p>
               </div>
           </td>
           <td class="cart_alcenter">
               <div >
                   <div>
                           <div class="cart_num cart_counter" > 
                               <input type="text" class="cart_num_input cart_bold"  maxlength="3" value="${val.num}">
                               <span class="cart_num_add"></span>
                               <span class="cart_num_reduce disable"></span> 
                           </div>
                   </div>
               </div>
           </td>
           <td class="cart_alcenter">
               <div >
                   <p class="cart_deep_red cart_font16 item_sum" data-price="${val.price}">${val.price}</p>
               </div>
           </td>
           <td class="cart_alcenter">
               <div >
                   <a href="javascript:;" class="cart_hoverline delete">删除</a> 
               </div>
           </td>
       </tr>
   `;


    }
    // "type":"like","id":"1","src":"../images/img/hotProduct1.jpg","title":"宽松落肩不对称条纹男女同款长袖衬衫_灰色","price":"￥ 507","num":"1"}

    $(".cart_table>tbody").html(str_);
})()

function Car() {
    this.price = 0;
}
$.extend(Car.prototype, {
    init: function () {

        this.checked();
        // this.goodsNum();
        this.addList();
        this.reductList();
        this.delList();

    },
    addList: function () {
        var _this = this;
        $(".cart_num_add").click(function () {
            //input的页面数量 
            var num = Number($(this).prev().val());
            $(this).prev().val(num + 1);
            //商品localstorage的数量
            var tid = $(this).parent().parent().parent().parent().parent().attr("data-ls");
            var json = JSON.parse(localStorage.getItem(tid));
            json.num++;
            localStorage.setItem(tid, JSON.stringify(json));

            //一个商品的总计
            var str = $(this).parent().parent().parent().parent().prev().children(0).children().eq(1).html();//获取单价
            var p = Number($(this).prev().val()) * Number(str);//单价*数量
            $(this).parent().parent().parent().parent().next().children(0).children(0).html(p);
            //商品总计
            $(".goodsSum").html(_this.goodsNum(_this).toFixed(2));
        })

    },
    reductList: function () {
        var _this = this;
        $(".cart_num_reduce").click(function () {
            
            //商品localstorage的数量
            var tid = $(this).parent().parent().parent().parent().parent().attr("data-ls");
            var json = JSON.parse(localStorage.getItem(tid));
            json.num<=1 ? 1 : json.num--;
            localStorage.setItem(tid, JSON.stringify(json));

            //页面上的商品数量
            var num = Number($(this).prev().prev().val());
            if (num <= 1) {
                $(this).prev().prev().val(1);
            } else {
                $(this).prev().prev().val(num - 1);
            }
            //一个商品的总计
            var str = $(this).parent().parent().parent().parent().prev().children(0).children().eq(1).html();//获取单价
            var p = Number($(this).prev().prev().val()) * Number(str);//单价*数量
            $(this).parent().parent().parent().parent().next().children(0).children(0).html(p);
            //商品总计
            $(".goodsSum").html(_this.goodsNum(_this).toFixed(2));

        })
    },
    goodsNum: function (_this) {
        _this.price = 0;
        //购物结算的颜色
        if ($(".cart_thcheck:checked").length) {
            $("#payBtn").removeClass("cart_paybtn_disable");
        } else {
            $("#payBtn").addClass("cart_paybtn_disable");
        }
        //选中的商品进行总计价格
        $(".cart_thcheck:checked").each(function (index, ele) {

            var str = $(this).parent().parent().parent().children().eq(5).children(0).children(0).text();
            _this.price += parseInt(str);
        })
        // console.log(_this.price);
        return _this.price;
    },
    //全选
    checked: function () {
        //全选
        var _this = this;
        $(".s_all").click(function () {
            var flag = ($(this).prop('checked'));
            $(".goodsSum").html(_this.goodsNum(_this).toFixed(2));

            flag ? $(".s_all").prop('checked', true) && $(".cart_thcheck").prop('checked', true) : $(".s_all").prop('checked', false) && $(".cart_thcheck").prop('checked', false);
        })
        //商品全被选中，全选自动选中
        $(".cart_thcheck").click(function () {
            $(".goodsSum").html(this.goodsNum(this).toFixed(2));
            $(".cart_thcheck:checked").length == $(".cart_thcheck").length ? $(".s_all").prop('checked', true) : $(".s_all").prop('checked', false);
        }.bind(this));


    },

    delList: function () {
        $(".delete").click(function () {
            //localStorage删除
            var tid = $(this).parent().parent().parent().attr("data-ls");
            localStorage.removeItem(tid);

            //页面删除
            $(this).parent().parent().parent().remove();

        });
    },

})
// 总计的类名 goodsSum
new Car().init();







