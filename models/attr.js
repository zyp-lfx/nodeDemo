const attr = require('../lib/mongo').attr
module.exports = {
    create: function create (menu) {
        return attr.create(menu)
    },
    createMany: function createMany (menu) {
        return attr.insertMany(menu)
    },
    getAttr: function getAttr(data,cb){
        attr.find(data).exec(function (err,res) {
            if(err)cb(err)
            else cb(res)
        })
    }
}
