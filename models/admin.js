const Adminuser = require('../lib/mongo').Adminuser
module.exports = {
    // 注册一个用户
    create: function create (adminuser) {
        return Adminuser.create(adminuser)
    },
    updatePostById: function updatePostById (postId, data) {
        console.log(data)
        return Adminuser.update({ _id: postId }, { $set: data }).exec()
    },
    // 通过用户名获取用户信息
    getAdminuserPhone: function getUserPhone (name) {
        return Adminuser
            .find({ name: name })
            .exec()
    },
    // 通过id获取用户信息
    getAdminuserId: function getAdminuserId (data,cb) {
        if(data.id){
            Adminuser.findOne({ _id: data.id }).exec().then(res=>{cb(res)})
        }else if(data.rows&&data.pages){
            // Adminuser.find({}).limit(data.rows).skip((data.pages-1)*data.rows)
            Adminuser.find({},{treeId:0}).exec(function (err,data) {
                if(err) cb(err)
                else{
                    Adminuser.count().exec().then(count=>{
                        var rowData={
                            rows:data,
                            total:count
                        }
                        cb(rowData)
                    })
                }
            })
        }else{
            Adminuser.find({},{treeId:0}).exec(function (err,data) {
                if(err) cb(err)
                else{
                    Adminuser.count().exec().then(count=>{
                        var rowData={
                            rows:data,
                            total:count
                        }
                        cb(rowData)
                    })
                }
            })
        }
    }
}
