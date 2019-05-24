const Goods = require('../lib/mongo').Goods
module.exports={
    create: function create (goods) {
        return Goods.create(goods)
    },
}
