const Goods = require('../lib/mongo').Goods
module.exports={
    create: function create (goods) {
        return Goods.create(goods)
    },
    getGoods: function getGoods (data,cb) {
        var req={
        }
        if(data.name){
            req.name=data.name
        }
        if(data.type){
            req.type=data.type
        }
        var page=data.page||1;
        var pageSize =data.pageSize||10
        return Goods.find({}).limit(pageSize).skip((page-1)*pageSize).exec(function (err,data) {
                if(err) cb(err)
                else{
                    Goods.count().exec().then(count=>{

                        var rowData={
                            rows:data,
                            total:count
                        }
                        cb(rowData)
                    })
                }
            })
    },
}
