const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const md5 = require('md5')

router.get('/',function(req,res){
    var phone=req.query.tel
    UserModel.getUserPhone(phone).then(resdata=>{
        console.log(resdata)
        var relust ={
            code:1,
            msg:'请求成功',
            data:resdata
        }
        res.send(relust)
    })
})
router.post('/',function(req,res){
    var phone=req.body.phone
    var password=req.body.password
    UserModel.getUserPhone(phone).then(resdata=>{
        var relust={}
        if(!resdata){
            relust ={
                code:9,
                msg:'不存在此用户',
            }
        }else{
            console.log(md5(password))
            console.log(password)
            console.log(resdata.password)
            if(md5(password)!==resdata.password){
                relust ={
                    code:9,
                    msg:'手机号或密码错误',
                }
            }else{
                delete resdata.password
                relust ={
                    code:1,
                    msg:'登陆成功',
                    data:resdata
                }
            }
        }
        res.send(relust)
    })
})
module.exports = router
