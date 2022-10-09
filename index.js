var express = require('express');
var router = express.Router();
const multer=require('multer');
const fs=require('fs');
module.exports = router;

/* GET home page. */
router.get('/', 
function(req, res, next) 
{
  res.send({success:true})
});

router.post('/upload',multer({dest:'collection'}).single('file'),
(req,res)=>
{
  //console.log(req.file)
  //console.log(req.body.stuname)
  try
  {
  if(req.file==null)
  {
    var str='<body id="all"><p align="center">作业提交失败！</p><style>#all{background-color: rgb(63,63,63);font-size: 30px;color: red;}</style></body>'
    res.send(str)
    return
  }
  var time=new Date().getTime()
  var stuname=req.body.stuname
  var stunum=req.body.stunum
  var exname=".NO_EXTEND_NAME"
  try 
  {
    exname = req.file.originalname.slice(req.file.originalname.lastIndexOf("."))
  }
  catch (error){}
  
  fs.rename(req.file.path,req.file.destination+'\\'+stuname+"_"+stunum+"_"+time+"_"+exname,function(){})
  var str='<body id="all"><p align="center">您已经成功提交作业！</p><style>#all{background-color: rgb(63,63,63);font-size: 30px;color: white;}</style></body>'
  res.send(str)
  }
  catch(error){}
  
})


