const express = require('express')
const router = express.Router()
router.get('/',function(req,res){
    res.send({
        code:1,
        msg:'请求成功'
    })
    console.log(req.query)
})
module.exports = router
