import './jquery.js'
import './jquery.md5.js';
import {baseUrl} from './config.js';


let reg = {
    username: /^\w{5,10}$/,
    password: /^.{5,10}$/,
    iphone: /^1\d{10}$/,
   
};
let arr=[false,false,false];
$('input').on('blur',function(){
    
    if($(this).attr('class')==='input1'){
       
        let flag=reg['username'].test($(this).val());
        if(!flag){
            $(this).next().css('color', 'red').html('你的输入账号不符合规则');
            arr[0] = false;
           
        }else{
            $(this).next().css('color', 'green').html('验证通过');
            arr[0] = true;
        }
    }
});
$('input').on('blur',function(){
    
    if($(this).attr('class')==='input2'){
       
        let flag=reg['password'].test($(this).val());
        if(!flag){
            $(this).next().css('color', 'red').html('你的输入账号不符合规则');
            arr[1] = false;
           
        }else{
            $(this).next().css('color', 'green').html('验证通过');
            arr[1] = true;
        }
    }
});
$('input').on('blur',function(){
    
    if($(this).attr('class')==='input3'){
       
        let flag=reg['iphone'].test($(this).val());
        if(!flag){
            $(this).next().css('color', 'red').html('你的输入账号不符合规则');
            arr[2] = false;
          
        }else{
            $(this).next().css('color', 'green').html('验证通过');
            arr[2] = true;
        }
    }
})


$('#submit').on('click', function() { 
    console.log('s');
    console.log(arr)
    if(arr.every(elm => elm)){
        console.log(999)
        let password = $.md5($('.input2').val());
   
        $.ajax({
            type: "get",
            url: `${baseUrl}/users/reg`,
            data: {
                username: $('.input1').val(),
                password: password,
                phone: $('.input3').val(),
                
            },
            dataType: "json",
            success: function(res) {
               
                if (res.msg=='用户名已存在') {
                    alert(res.msg);
                    $('.input2').val(''); //密码清空
                    $('.input3').val(''); //清空电话号
                    $('.input1').val(''); 
                  
                   
                };
               if(res.msg=='注册成功') {
                    alert(res.msg);
                    location.href = `${baseUrl}/html/login.html`; 
                   
                };
               
            }  
        });
    }else{
        $(this).next().css('color', 'red').html('请填写完整的注册信息');
    }
   
    
   
   
 
});