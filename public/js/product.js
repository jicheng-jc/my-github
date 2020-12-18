import './jquery.js';
import './swiper.js';
import cookie from './cookie.js';
import './jquery.lazyload.js';
import './Z.js';
import './tabs.js';
import {baseUrl} from './config.js';





(function(){
   
    let id=location.search.slice(1).split('=')[1]  //获得商品id  获得传递过来的ID
   
   

    $.ajax({
        type: "get",
        url:`${baseUrl}/product/getItem`,
        data: {id:id},
        dataType: "json",
        success: function (res) {
         
            res=res[0];// 变成对象
            console.log(res);
            let picture=JSON.parse(res.picture);
            let template=`  <div class="box-t-l">
            <div class="tabs tabs11">
             
                <div data-type="tabs-div" avo="ag" class="show" >
                    <img src="../${picture[0].src}" alt="small-1" style="height: 498px;width:498px;">
                </div>
              
                <div data-type="tabs-div" >
                    <img src="../${picture[1].src}" alt="small-2" style="height: 498px;width:498px;">
                </div>
                <div data-type="tabs-div" >
                    <img src="../${picture[2].src}" alt="small-3" style="height: 498px;width:498px;">
                 </div>
                 <div data-type="tabs-div" >
                    <img src="../${picture[3].src}" alt="small-4" style="height: 498px;width:498px;">
                 </div>
                <ul data-type="tabs-btn">
                    <li class="active"><img src="../${picture[0].src}" alt="small-1" style="height: 78px;width: 78px;"></li>
                    <li><img src="../${picture[1].src}" alt="details-2" style="height: 78px;width: 78px;"></li>
                    <li><img src="../${picture[2].src}" alt="details-3" style="height: 78px;width: 78px;"></li>
                    <li><img src="../${picture[3].src}" alt="details-4" style="height: 78px;width: 78px;"></li>
                  
                </ul>
            </div>
        </div>
        <div class="box-t-r">
          <h2>${res.title}</h2>
          <span>￥ ${res.price}</span>
          <i>数量</i>
          
          <input type="text" id="num">
          <input type="button" value="加入购物车" id="additem"> 
        </div>`;


        $('.box-t').append(template).find('#additem').on('click',function(){
       
         
          addItem(res.id,$('#num').val())
            
        });
        (function() {
            let btn = $$('.tabs11>[data-type="tabs-btn"]>li');
            console.log($$('.tabs11'));
          
            btn.on('click', function() {
               
               
              
                $$(this).addClass('active').siblings().removeClass('active');
                let index = btn.index(this);
                console.log($$('.tabs11>[data-type="tabs-div"]'));
                $$('.tabs11>[data-type="tabs-div"]').eq(index).addClass('show').siblings().removeClass('show');
            });
        })();
            
        } 
    });



    function addItem(id,num){
        let shop=cookie.get('shop');
        let product={
            id:id,
            num:num
        }
        if(shop){
            shop=JSON.parse(shop); //把取出的cookie数据转成对象

        if(shop.some(elm=>elm.id==id)){
            shop.forEach(el=>{
                el.id===id?el.num=num:null;
            })
        }else{shop.push(product);}


        }else{
            shop=[];
            shop.push(product);
        }
        cookie.set('shop',JSON.stringify(shop),1)

    };


    // $$(function() {
    //     let btn = $('.tabs>[data-type="tabs-btn"]>li');
      
    //     btn.on('click', function() {
           
          
    //         $$(this).addClass('active').siblings().removeClass('active');
    //         let index = btn.index(this);
    //         $$('.tabs>[data-type="tabs-div"]').eq(index).addClass('show').siblings().removeClass('show');
    //     });
    // });
   
   

})()
