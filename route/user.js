const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const AdminModel = require('../models/admin')
const md5 = require('md5')
function ShowUserAdmin(data,id){
    var res = JSON.parse(JSON.stringify(data))
    console.log(res)
    res.map(item=>{
        item.checked =false
        if(item._id ==id){
            item.checked=true
        }
    })
    return res
}
router.get('/',function(req,res){
    res.send({
        code:1,
        msg:'请求成功'
    })
    console.log(req.query)
})
router.get('/getAdminByUserId',function (req,res) {
    var id=req.query.id
    let data={
        id:id,
    }
    UserModel.getUserById(data,function (resUser) {
        console.log(resUser)
        AdminModel.getAdminuserId({},function (data) {
            var relust ={
                code:1,
                msg:'查询成功',
                data:new ShowUserAdmin(data.rows,resUser.adminId)
            }
            res.send(relust)
        })
    })
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
    let data={
        id:id,
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
