const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const md5 = require('md5')
router.get('/',function(req,res){
    res.send({
        code:1,
        msg:'请求成功'
    })
    console.log(req.query)
})
router.get('/byPhone',function(req,res){
    var phone=req.query.phone

    UserModel.getUserPhone(phone).then(resdata=>{
        console.log(resdata)
        var relust ={
            code:1,
            msg:'查询成功',
            data:resdata
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
    UserModel.getUserById(data,function (data) {
        console.log(data)
        var relust ={
            code:1,
            msg:'查询成功',
            data:data
        }
        res.send(relust)
    })
})
module.exports = router
