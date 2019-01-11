const Menu = require('../lib/mongo').Menu
module.exports = {
    create: function create (menu) {
        return Menu.create(menu)
    },
    getMenu: function getMenu(data,cb){
        Menu.find(data).exec(function (err,res) {
            if(err)cb(err)
            else cb(res)
        })
    }
}
