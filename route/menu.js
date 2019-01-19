const express = require('express')
const router = express.Router()
const MenuModel = require('../models/menu')
const AdminModel = require('../models/admin')
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
router.get('/getMenuByAdminId',function (req,res) {
    var showId= req.query.id
    MenuModel.getMenu({},function (data) {
        AdminModel.getAdminuserId({id:showId},function (resdata) {
            var datas = JSON.parse(JSON.stringify(data))
            // var datas = data
            var reslut ={
                code:1,
                data:toTree(datas,'attachId','_id',resdata.treeId),
                msg:'查询成功'
            }
            res.send(reslut)
            // res.send(relust)
        })

    })
})
module.exports = router
