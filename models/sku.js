const sku = require('../lib/mongo').sku
module.exports = {
    create: function create (data) {
        return sku.create(data)
    },
    createMany: function createMany (data) {
        return sku.insertMany(data)
    },
    getSku: function getSku(data,cb){
        sku.find(data).exec(function (err,res) {
            if(err)cb(err)
            else cb(res)
        })
    }
}
