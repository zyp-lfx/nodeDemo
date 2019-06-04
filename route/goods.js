const express = require('express')
const router = express.Router()
const Goods = require('../models/goods')
router.post('/addGoods',function (req,res) {
    var data = req.body
    data.createTime = new Date().getTime()
    console.log(data.imgList)

    // data.imgList=data.imgList.join(' ');
    console.log(data)
    Goods.create(data).then(result=>{
        console.log(result)
        res.send({
            code:1,
            msg:'新增成功'
        })
    })
})
router.post('/getGoodsList',function (req,res) {
    var data = req.body
    // data.createTime = new Date().getTime()
    // console.log(data.imgList)

    // data.imgList=data.imgList.join(' ');
    console.log(data)
    Goods.getGoods(data,function(result){
        var relustData ={
            code:1,
            msg:'查询成功',
            data:result
        }
        res.send(relustData)
    })
})
module.exports = router

