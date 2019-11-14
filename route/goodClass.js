const express = require('express')
const router = express.Router()
const goodClass = require('../models/goodClass')
router.post('/add',function (req,res) {
    var data = req.body
    data.createTime = new Date().getTime()
    goodClass.create(data).then(result=>{
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
    var result ={
    }
    result.tree=data
    if(attr){
        result.checkTree=[]
    }
    console.log(attr)
    result.tree.forEach(res=>{
        if(attr){
            if(attr.toString().indexOf(res[from])>-1){
                var treeNode = Object.assign({},res)
                delete treeNode.children
                result.checkTree.push(treeNode)
                res.show=true
            }else{
                res.show=false
            }
        }
        if(res[to]){
            result.tree.forEach(item=>{
                if(res[to]==item[from]){
                    if(!item.children){
                        item.children=[]
                    }
                    item.children.push(res)
                }
            })
        }
    })
    result.tree=result.tree.filter(ele => !ele[to])
    return result
}
router.get('/get',function (req,res) {
    var data = req.query
    console.log(data)
    goodClass.getGoodClass(data,function (resdata) {
        // var datas = data
        var reslut ={
            code:1,
            data:resdata,
            msg:'查询成功'
        }
        res.send(reslut)
    })
})
module.exports = router
