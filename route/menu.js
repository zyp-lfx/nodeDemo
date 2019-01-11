const express = require('express')
const router = express.Router()
const MenuModel = require('../models/menu')
router.get('/',function(req,res){
    res.send({
        code:1,
        msg:'请求成功'
    })
    console.log(req.query)
})
router.post('/addMenu',function (req,res) {
    var data = req.body
    data.createTime = new Date().getTime()
    MenuModel.create(data).then(result=>{
        res.send({
            code:1,
            msg:'新增成功'
        })
    })
})
function TreeData(data,addAttr){
    for (var i in data){
        this[i]=i
    }
    for (var i in addAttr){
        this[i]=i
    }
}
function toTree(data,to,from,attr){
    var result =data
    console.log(attr)
    result.forEach(res=>{
        if(attr){
            if(res.showId&&res.showId.indexOf(attr)>-1){
                res.show=true
            }else{
                res.show=false
            }
        }
        if(res[to]){
            result.forEach(item=>{
                if(res[to]==item[from]){
                    if(!item.children){
                        item.children=[]
                    }
                    item.children.push(res)
                }
            })
        }
    })
    result=result.filter(ele => !ele[to])
    return result
}
router.get('/getMenu',function (req,res) {
    MenuModel.getMenu({},function (data) {
        var datas = JSON.parse(JSON.stringify(data))
        // var datas = data
        var reslut ={
            code:1,
            data:toTree(datas,'attachId','_id'),
            msg:'查询成功'
        }
        res.send(reslut)
    })
})
router.get('/getMenuById',function (req,res) {
    var showId= req.query.id
    MenuModel.getMenu({},function (data) {
        var datas = JSON.parse(JSON.stringify(data))
        // var datas = data
        var reslut ={
            code:1,
            data:toTree(datas,'attachId','_id',showId),
            msg:'查询成功'
        }
        res.send(reslut)
    })
})
module.exports = router
