var express = require('express');
var router = express.Router();
var mongodb = require("mongodb-curd");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//添加
router.post("/insert",function(req,res,next){
  var data = req.body,
      name = data.name,
      age = data.age,
      phone = data.phone,
      address = data.address,
      card = data.card,
      id = data.id;
  if(!name || !age|| !phone || !address || !card){
    res.json({code:0,message:"输入内容不能为空，请完善信息"})
  }else{
    findOne()
  }
  
  function findOne(){
    if(id){
      delete data.id;
      mongodb.update("xiaoji","mengmeng",[{_id:id},data],function(result){
        console.log(result)
        if(result){
          res.send({code:0,message:"修改成功"})
        } else {
          res.send({code:1,message:"修改失败"})
        }
      })
    }else{
    mongodb.find("xiaoji","mengmeng",({card:card}),function(result){
      if(result.length > 0){
        res.json({code:1,message:"该用户已存在"})
      }else{
        insert()
      }
    })
  }
  }
  function insert(){
    mongodb.insert("xiaoji","mengmeng",data,function(result){
      if(result){
        res.json({code:2,message:"用户信息添加成功"})
      }else{
        resizeBy.json({code:3,message:"用户信息添加失败"})
      }
    })
  }
})

//查看全部
router.post("/list",function(req,res,next){
  mongodb.find("xiaoji","mengmeng",{},function(result){
    if(result.length >0){
      res.send({code:0,message:"数据查找成功"})
    }else{
      res.send({code:1,message:"数据查找失败"})
    }
  })
})

//查找
router.get("/find",function(req,res,next){
  var params = req.query,
      id = params.id;
  mongodb.find("xiaoji","mengmeng",{_id:id},function(result){
    if(result.length > 0){
      res.json({code:0,message:result})
    } else {
      res.json({code:1,message:"查找失败"})
    }
  })
})

//删除
router.post("/del",function(req,res,next){
  var id = req.body.id;
  mongodb.remove("xiaoji","mengmeng",{_id:id},function(result){
    if(result.deletedCount == 1){
      res.send({code:0,message:"删除成功"})
    }else{
      res.send({code:1,message:"删除失败"})
    }
  })
})

//修改
// router.post("/updata",function(req,res,next){
//   var params = req.body;
//   var id = req.body.id;
  
// })

module.exports = router;
