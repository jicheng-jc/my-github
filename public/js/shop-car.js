import './jquery.js';
import cookie from './cookie.js';
import {baseUrl} from './config.js';
(function(){
    let shop=cookie.get('shop');//cookie传过来的id和数量
    console.log(shop);
    if(shop){
        shop=JSON.parse(shop); //字符串转对象 （数组）
       
        let idList=shop.map(elm=>elm.id).join();   //箭头函数不写大括号，才默认是返回值
        // 此时 idList 是字符串

        $.ajax({
            type: "get",
            url: `${baseUrl}/product/getItems`,
            data: {idList:idList},
            dataType: "json",
            success: function (res) {
            
                let template='';

                res.forEach((elm,i)=>{
                 
                    let arr=shop.filter(val=>
                      
                        val.id===elm.id
                    );
                
                    
                
                    let picture=JSON.parse(elm.picture);
                    template+=`
                 <div class="itemllist">
                 <div class="middle">
                 <div class="goods">
                    <div class="box11" style="display: inline-block;" >
                       <input type="checkbox" class="check" checked>
                       <a href="#"><img src="../${picture[0].src}" alt=""></a>
                    </div>
                    <div class="box12" style="display: inline-block;">
                      
                       <span>${elm.title}</span>
                    </div>
                    
                    <div class="box14" style="display: inline-block;">
                       <div style="display: inline-block; padding-left: 250px;">&yen;<span>${(elm.price).toFixed(2)}</span></div>
                    </div>
                    <div style="display: inline-block; padding-left: 250px;" class="box15">
                       <span class="min">-</span>
                        <input sid="${elm.id}" class="num" style="text-align:center;" data-price="${elm.price}"   type="text" value="${arr[0].num}" min="1" max="${elm.num}">
                        <span class="add">+</span>
                    </div>
                    <div style="display: inline-block; padding-left: 350px;" class="box16" style="text-align:center">
                       <div style="display: inline-block; padding-left: 100px;">&yen;<span class="subPrice" id="subPrice1">${(elm.price*arr[0].num).toFixed(2)}</span></div>
                    </div>
                    <div style="display: inline-block; padding-left: 80px;" class="box17">
                       <a class="del" href="#">删除</a>
                    </div>
                 </div>
                 <div class=" clear"></div>
              
                 </div>
                 </div> `;

                });


                $('.banxin-car').append(template);


                let arr = JSON.parse(cookie.get('shop'));
                console.log(arr);
                 $(function(){
                     //++ 数量增加
                    $(".add").on('click',function(){
                       let that= $(this);
                    var num=$(this).parent().find('.num');
                    num.val(parseInt(num.val())+1);
                    //重新计算单行价格
                    let a=$(this).parent().prev().find('span').html();
                    let b=$(this).prev().val();
                    $(this).parent().next().find('span').html(parseFloat(a*b));
                    allNum();
                    allPrice();

                   //改变cookie
                   
                    arr.forEach(function(elm){
                     
                        if(elm.id==that.prev().attr('sid') ){
                            console.log(elm.id);
                            elm.num=that.prev().val()

                        }

                    });
                  
                    cookie.set('shop', JSON.stringify(arr), 5)
                   
                   
                    });
                    //-- 数量减少
                    $(".min").on('click',function(){
                      
                    var t=$(this).parent().find('.num');

                    t.val(parseInt(t.val())-1)
                    if(parseInt(t.val())<1){
                    t.val(1);};
                    let a=$(this).parent().prev().find('span').html();
                    let b=$(this).next().val();
                 
                    $(this).parent().next().find('span').html(parseFloat(a*b));
                    allNum();
                    allPrice();
                
                    });


                

                

                   
                })


                //计算总价的函数
                function allPrice(){
                    var sum=0;
                  
                    $('.check').each(function(){
                     
                        if(this.checked==true){
                           var a=parseFloat($(this).parent().next().next().next().next().find('span').html());    //单类商品数量
                           
                           sum+=a;
                
                        }
                    });
                   
                    $(".allPrice1").html(sum);
                };
                allPrice();

                //计算总数量的函数
                function allNum(){
                    var num=0;
                    
                    $(".check").each(function(){
                        if(this.checked==true){
                            var b=parseInt($(this).parent().next().next().next().find('input').val());
                        
                            num+=b;
                        }
                    });
                  
                    $(".fontColor1").html(num);
                };
                allNum();
                
                //设置选择框 下面单个框控制总框
                $('.check').on('click',function(){
                    var x=$(".check").length;
                    var y=$(".check:checked").length;
                    if(x==y){
                        $(".allSelect").prop("checked",true);
                    }else{
                        $(".allSelect").prop("checked",false);
                    }
                    allPrice();
                    allNum();
                });
                
                
                //设置总框 控制单个框
                $(".allSelect").on('click',function(){
                    if(this.checked==true){
                        $(".check").prop("checked",true);
                    }else{
                        $(".check").prop("checked",false);
                    };
                    allPrice();
                    allNum();
                   
                });

                //输入框 输入事件
                $('.num').on('input',function(){
                    let reg = /^\d+$/g; //只能输入数字
                    
                   
                    
                    let a=$(this).parent().prev().find('span').html();
                    if (!(reg.test($(this).val()))) { //不是数字
                        $(this).val(1);
                      
                    };

                    let b = $(this).val();
                 
                    $(this).parent().next().find('span').html(parseFloat(a*b));

                    allPrice();
                    allNum();
                    

                });

                //删除cookie
                $('.del').on('click',function(){
                   
                  var th=$(this);
                  th.parent().parent().parent().parent().remove();

                   let a= th.parent().prev().prev().find('input').attr('sid');
                   arr.forEach(function(elm){
                       if(elm.id==a){
                           let a=arr.indexOf(elm);
                           arr.splice(a,1)
                       }

                   });
                   
                   cookie.set('shop', JSON.stringify(arr), 5);

                   allPrice();
                   allNum();
                   
                    
                })



            }
        });
    }








  

})();


