import './jquery.js'
import './jquery.md5.js';
import {baseUrl} from './config.js';


$('#submit').on('click', function() { 
  
    
    
   
   
    let password = $.md5($('.input2').val());
   
    $.ajax({
        type: "get",
        url: `${baseUrl}/users/login`,
        data: {
            username: $('.input1').val(),
            password: password,
            phone:$('.input3').val()
            
        },
        dataType: "json",
        success: function(res) {
          
         
         

           
        if (res.msg=='登录成功') {
            alert(res.msg);

            localStorage.setItem('u-name', $('.input1').val());
            location.href = `${baseUrl}`; 
          
           
        };
       if(res.msg=='用户名或密码错误') {
            alert(res.msg);
            
            $('.input2').val(''); //密码清空
            $('.input3').val(''); //清空电话号
        };

          
           
        }  
    });
});



