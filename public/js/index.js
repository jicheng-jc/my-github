import './jquery.js';
import './jquery.lazyload.js';
import './swiper.js';
// import './config.js'



$(function() {
  $("img.lazy").lazyload();
});

var mySwiper = new Swiper ('.div-r>.swiper-container', {
  
  autoplay:true,
  loop:true,
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
  },
  
  //前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
  
 

});

(function(){
 

       if (localStorage.getItem('u-name')) {
          $('.li-a2').show();
          $('.li-a1').hide();
          $('.li-a2 .i-h').html(localStorage.getItem('u-name'));
      }

      //退出登录，删除存储
      $('.li-a2 .i-tui').on('click', function() {
          $('.li-a2').hide();
          $('.li-a1').show();
          localStorage.removeItem('u-name');
      });
     

          
   
 

})();


