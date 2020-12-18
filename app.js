const express=require('express');
const path=require('path');
const app=express();
const cookieParser=require('cookie-parser');
const usersRouter=require('./router/user');
const productRouter=require('./router/product');


let conf={
    port:8888,
    host:'10.31.161.11'
};

app.use(express.static(path.join(__dirname,'public')));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser()); // 读取和设置cookie的中间件

app.use(cookieParser()); 
app.use('/users',usersRouter);
app.use('/product',productRouter);

app.listen(conf.port,conf.host,()=>{
    console.log(`server is running on http://${conf.host}:${conf.port}`);
  
})
