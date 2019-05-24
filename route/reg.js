const express = require('express')
const router = express.Router()
const UserModel = require('../models/user')
const md5 = require('md5')
router.post('/',function(req,res){
    console.log(req.body)
    let data=req.body
    const reg = /^[1][3-9][0-9]{9}$/;
    try {
        if (!(data.name.length >= 1 && data.name.length <= 10)) {
            res.send({
                code:9,
                msg:'名字请限制在 1-10 个字符'
            })
        }
        if (!(data.password.length >= 6 && data.password.length <= 15)) {
            res.send({
                code:9,
                msg:'密码请限制在6-15个字符'
            })
        }
        if (data.password !== data.repassword) {
            res.send({
                code:9,
                msg:'两次密码输入不一致'
            })
        }
        if(!reg.test(data.phone)){
            res.send({
                code:9,
                msg:'请输入正确的手机号码'
            })
        }
    } catch (e) {
        res.send(e)
        return false
    }
    console.log(data.password)
    data.password = md5(data.password)
    data.createTime = new Date().getTime()
    UserModel.create(data).then(resdata=>{
        // data = resdata.ops[0]

        console.log(data)
        delete data.password
        delete data.repassword
        var relust ={
            code:1,
            msg:'注册成功',
            data:data
        }
        res.send(relust)
    }).catch((e)=>{
        console.log(e)
        if(e.name=='BulkWriteError'){
            res.send({
                code:9,
                msg:'手机号码已被占用'
            })
        }else{
            res.send({
                code:9,
                msg:'系统繁忙，请联系管理员'
            })
        }

        // if (e.message.match('duplicate key')) {
        // }
    })
})
module.exports = router
