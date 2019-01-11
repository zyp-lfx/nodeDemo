const express = require('express')
const router = express.Router()
const AdminModel = require('../models/admin')
router.get('/',function(req,res){
    res.send({
        code:1,
        msg:'请求成功'
    })
    console.log(req.query)
})
router.post('/add',function(req,res){
    let data=req.body
    data.createTime = new Date().getTime()
    AdminModel.create(data).then(resdata=>{
        var relust ={
            code:1,
            msg:'创建成功',
        }
        res.send(relust)
    })
})
router.get('/byId',function(req,res){
    var id=req.query.id
    var pages=req.query.pageSize
    var rows=req.query.rows
    let data={
        id:id,
        rows:rows,
        pages:pages
    }
    AdminModel.getAdminuserId(data,function (data) {
        var relust ={
            code:1,
            msg:'查询成功',
            data:data
        }
        res.send(relust)
    })
})
module.exports = router

