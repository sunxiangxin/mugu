function Scroll(){

}
Scroll.prototype = {
    init: function(){
        var sT = $(document).scrollTop();
        if( sT >100 ){
           $("#J_sticky_container").addClass("lets-rock");
           $("#J_sticky_container").addClass("sticky-search-container");
           console.log()
        }else{
           $("#J_sticky_container").removeClass("lets-rock");
        }
       

    }
}
$(document).ready(function(){ 
    　$(window).scroll(function(){
        new Scroll().init();
    })
}); 
