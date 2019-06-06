const express = require('express')
const router = express.Router()
const Attr = require('../models/attr')
router.post('/add',function(req,res){
    let data=req.body
    let fData= {
        name:data.name,

    }
    fData.createTime = new Date().getTime()
    console.log(data)
    Attr.create(fData).then(resdata=>{
        console.log(resdata)
        data.attrList.map(item=>{
            item.attachId= resdata.id
        })
        Attr.createMany(data.attrList).then(resC=>{
            var relust ={
                code:1,
                msg:'创建成功',
            }
            res.send(relust)
        })
    })
})
router.get('/getAttr',function(req,res){
    var query=req.query
    Attr.getAttr(query,function (resData) {
        var data = JSON.parse(JSON.stringify(resData))
        res.send({
            code:1,
            data:Totree(data)
        })
    })
})
function Totree(data){
    data.map(item=>{
        item.children=[]
        data.map(res=>{
            if(res.attachId==item._id){
                var treeNode = Object.assign({},res)
                delete treeNode.children
                item.children.push(treeNode)
            }
        })
    })
    var result=data.filter(ele => !ele.attachId)
    return result
}
module.exports = router

