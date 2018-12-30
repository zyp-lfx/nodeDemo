const express = require('express')
const router = express.Router()
router.get('/',function(req,res){
    res.send({
        code:1,
        msg:'登录成功'
    })
    // console.log(res)
})
module.exports = router
