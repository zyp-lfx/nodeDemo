const express = require('express')
const router = express.Router()
const http = require('http')
const UserModel = require('../models/user')
const md5 = require('md5')
const common = require('../common')
router.get('/',function(req,res){
    var phone=req.query.phone
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
        console.log(resdata)
        if(!resdata){
            relust ={
                code:9,
                msg:'不存在此用户',
            }
        }else{
            console.log(md5(password))
            console.log(password)
            console.log(resdata.password)
            if(md5(password)!=resdata.password){
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
router.post('/wxLogin',  function (req, res) {
    let userkey = common.getUser(req.body.code).then(resuser=>{
        var wxdata = new common.WXBizDataCrypt(resuser.session_key)
        var redata = wxdata.decryptData(req.body.encryptedData , req.body.iv)
        UserModel.getUser(redata,(data)=>{
            if(data&&data.length){
                UserModel.updateUser(redata).then(resupdate=>{
                    if(resupdate.ok){
                        UserModel.getUser(redata,data=>{
                            res.send({
                                code:1,
                                msg:'登录成功',
                                data:data[0]
                            })
                        })
                    }
                })
            }else{
                UserModel.create(redata).then(rescreate=>{
                    if(rescreate.ok){
                        UserModel.getUser(redata,data=>{
                            res.send({
                                code:1,
                                msg:'登录成功',
                                data:data[0]
                            })
                        })
                    }
                })
            }
        })
    })
})

module.exports = router
