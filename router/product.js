const express=require('express');
const conn =require('../dao/conn');
const router=express.Router();

router.route('/getProducts')
.get((req,res,next)=>{
    let sql='select * from product';
    conn.query(sql,(err,result)=>{
        if(err)console.log(err);      
        res.json(result);
    })
  

});

router.route('/getItem')
.get((req,res,next)=>{
    
  
    console.log(req.query)
    let sql= `select * from product where id=${req.query.id}`;
    conn.query(sql,(err,result)=>{
        if(err) console.log(err);
        res.json(result);
       
    })

});
router.route('/getItems')
.get((req,res,next)=>{
    let sql=`select *from product where id in (${req.query.idList})`;
    conn.query(sql,(err,result)=>{
        if(err) console.log(err);
        res.json(result)
    })


})


module.exports=router;
