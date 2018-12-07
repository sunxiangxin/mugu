//主banner和背景图颜色切换
$.extend({
    banner_a: function () {
        var bgFlag = true;
        var timer = setInterval(function () {
            if (bgFlag) {
                var color = "rgb(212, 212, 213)";
                $(".autoA>img").eq(1).hide().end().eq(0).show();
            } else {
                var color = "rgb(255, 178, 172)";
                $(".autoA>img").eq(0).hide().end().eq(1).show();
            }
            bgFlag = !bgFlag;
            $(".bgbanner").css("backgroundColor", color);
        }, 3000);
        // $(".closeAutoplay").on("mouseenter", function () {
        //     clearInterval(timer);
        //     console.log(timer);
        // }).bind(this).on("mouseleave",function(){});
        return this;
    }
})
$.banner_a();

//4图轮播  定位，动画改变left        
$.fn.extend({
    autoPlay: function (bannerArr, a) {//参数是轮播图所有的图片
        if (a) {
            this.index = a;
        } else {
            this.index = 0;
        }
        this.flag = true;
        clearInterval(this.timer);
        this.timer = setInterval(function () {

            this.index = this.toImg(bannerArr, this.index);
            // console.log(this.index);
        }.bind(this), 3000)
        return this;
    },

    //正向轮播
    toImg: function (bannerArr, index) {
        this.flag = false;

        bannerArr.eq(index == bannerArr.size() ? 0 : index).css("left", "0").animate({
            left: -950
        }, 1500).end().eq((index + 1) > 6 ? 0 : (index + 1)).css("left", 1000).stop(true).animate({
            left: 0
        }, 1500, () => {
            this.flag = true;
        });

        //判断轮播图的下标    
        index++;
        if (index == bannerArr.size() - 1) {
            index = 0;
            return index;
        } else {
            return index;
        }

    },
    //逆向轮播
    toImg_: function (bannerArr, index) {
        this.flag = false;
        bannerArr.eq(index == (bannerArr.size() - 1) ? 0 : index).css("left", "0").animate({
            left: 1000
        }, 1500).end().eq((index - 1) < 0 ? (bannerArr.size() - 1) : (index - 1)).css("left", -950).stop(true).animate({
            left: 0
        }, 1500, () => {
            this.flag = true;
        });
        index--;
        if (index < 0) {
            index = bannerArr.size() - 1;
        }
        return index;
    },
    //鼠标移入，停止定时器
    enter: function () {
        $(this).on("mouseenter", function () {
            clearInterval(this.timer);
        }.bind(this))
        return this;
    },
    //鼠标离开，开始定时器
    leave: function (bannerArr) {
        $(this).on("mouseleave", function () {
            this.autoPlay(bannerArr, this.index);
        }.bind(this))
        return this;
    },
    //点击左右按钮，切换轮播图
    onBtn: function (btnArr, bannerArr) {
        btnArr.eq(0).on("click", function () {
            if (this.flag) {
                if (this.index < 1) {
                    this.index = bannerArr.size() - 1;
                }
                this.toImg_(bannerArr, this.index);
                this.index--;
            }
        }.bind(this))
        btnArr.eq(1).on("click", function () {
            if (this.flag) {
                this.toImg(bannerArr, this.index);
                this.index++;
                if (this.index >= bannerArr.size() - 1) {
                    this.index = 0;
                }
            }
        }.bind(this));
        return this;
    }
})
$(".mslide_banners").autoPlay($(".mslide_banner")).onBtn($(".mslide_toggle_btn"), $(".mslide_banner")).enter().leave($(".mslide_banner"));







