const express = require('express')
const router = express.Router()
router.get('/',function(req,res){
    res.send('hollow user')
    // console.log(res)
})
module.exports = router
