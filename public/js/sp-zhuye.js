import './jquery.js';
import './jquery.lazyload.js';
import './swiper.js';
import { baseUrl } from './config.js';
(function () {
    $.ajax({
        type: "get",
        url: baseUrl + '/product/getProducts',
        dataType: "json",
        success: function (res) {

            let tempLi = '';
            res.forEach((elm, i) => {
                console.log(elm);
                let picture = JSON.parse(elm.picture);

                //把id在地址栏里传递出去
                //在所有商品主页 渲染商品列表

                tempLi += `<li>
            <a href="../html/product-details.html?id=${elm.id}"> 
           
              <img src="../${picture[0].src}"  alt="#" style="width: 240px; height: 240px;" >
            
              <span class="span-t1"  style="color: red;">￥ ${elm.price}</span>
             
           
            </a>
          </li>`

            })

            $('.ul-ff').append(tempLi);

            if (localStorage.getItem('u-name')) {
                $('.li-a2').show();
                $('.li-a1').hide();
                $('.li-a2 .i-h').html(localStorage.getItem('u-name'));
            }





        }
    });

})();