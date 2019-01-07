const Adminuser = require('../lib/mongo').Adminuser
module.exports = {
    // 注册一个用户
    create: function create (adminuser) {
        return Adminuser.create(adminuser)
    },
    updatePostById: function updatePostById (postId, data) {
        return Post.update({ _id: postId }, { $set: data }).exec()
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
            Adminuser.find({ _id: data.id },{password: 0 }).exec().then(res=>{cb(res)})
        }else if(data.rows&&data.pages){
            Adminuser.find({}).limit(data.rows).skip((data.pages-1)*data.rows).exec(function (err,data) {
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
            Adminuser.find({}).exec(function (err,data) {
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
