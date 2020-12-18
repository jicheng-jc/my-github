const express=require('express');
const conn=require('../dao/conn');
const crypto=require('crypto')
const router=express.Router();


// router.route('/')  //测试测试
//  .get((req,res,next)=>{
//     //  res.json({'method':'get'})
//      console.log(req.query)
//  })
//   .post((req,res,next)=>{
//       res.json({'method':'post'}) 
//   });



router.route('/reg')  //相当于 取值 /reg时，执行如下代码
.get((req, res, next) => {
    // 判断用户名是否存在

    let searchUser = `select * from users where user_name='${req.query.username}'`;
    conn.query(searchUser, (err, results) => {   //  执行查询数据库 sql语句
        console.log(results);

        if (err) console.log(err);
        if (results.length) {
            res.json({ msg: '用户名已存在'});
        }
         else {
            let md5 = crypto.createHash('md5'); // 创建一个哈希加密
            let passResult = md5.update(req.query.password).digest('hex'); // 加密内容获得16进制结果

            let sql = `insert into users(user_name, user_password,user_phone) 
    values('${req.query.username}','${passResult}',${req.query.phone})`;


            conn.query(sql, (err, result) => { 
                if (err) console.log(err);
                if (result.insertId) { //判断是否有写入的数据的ID
                  
                    res.cookie('username', req.query.username); //后端给到的cookie数据 设置到浏览器。。
                    res.cookie('isLogined', true);
                    res.json({
                        msg: "注册成功",
                        username: req.query.username,
                        error: 0
                    });
                }
            });
        }
    });
});




// 登录
router.route('/login')
.get((req, res, next) => {
  
  

    let md5 = crypto.createHash('md5'); 
    let passResult = md5.update(req.query.password).digest('hex'); 
    
   
   
    let searchUser = `select * from users where user_name='${req.query.username}' and user_password='${passResult}' and user_phone='${req.query.phone}'`;
  
    conn.query(searchUser, (err, results) => { 
       
   

     
        if (results.length) {
            res.json({ msg: '登录成功'});
            //登录成功
          
           
        }
         else {
             res.json({msg:'用户名或密码错误'})
     
        };


        // conn.query(sql, (err, result) => { 
        //     if (err) console.log(err);
        //     if (result.insertId) {
        //         res.cookie('username', req.query.username);
        //         res.cookie('isLogined', true);
        //         res.json({
        //             msg: "注册成功",
        //             username: req.query.username,
        //             error: 0
        //         });
        //     }
        // });
    });
});









       
    // 登陆的流程
    // 1. 接收表单数据
    // 2. 在数据库中查找和账号密码匹配的数据
    // 3. 返回结果

    // $username = $_REQUEST['username'];
    // $password = $_REQUEST['password'];

    // $sql = "select * from users where username='$username' and password='$password'";

    // // 执行查询
    // $result = $mysqli->query($sql);

    // $mysqli->close();

    // if($result->num_rows>0){
    //     echo '<script>alert("登陆成功");</script>';
    //     echo '<script>location.href="../index.html";</script>';
    // }else{
    //     echo '<script>alert("用户名或密码错误");</script>';
    //     echo '<script>location.href="../eg04.login.html";</script>';
    // }




module.exports=router;