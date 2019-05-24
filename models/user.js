const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function create (user) {
        return User.create(user)
    },
    updatePostById: function updatePostById (postId, data) {
        return User.update({ _id: postId }, { $set: data }).exec()
    },
   // 通过用户名获取用户信息
    getUserById: function getUserById (data,cb) {
        if(data.id){
            User.find({ _id: data.id },{password: 0 }).exec().then(res=>{cb(res)})
        }else if(data.rows&&data.pages){
            User.find({},{password:0}).limit(data.rows).skip((data.pages-1)*data.rows).exec(function (err,data) {
                if(err) cb(err)
                else{
                    User.count().exec().then(count=>{
                        var rowData={
                            rows:data,
                            total:count
                        }
                        cb(rowData)
                    })
                }
            })
        }else{
            User.find({},{password:0}).exec(function (err,data) {
                if(err) cb(err)
                else{
                    User.count().exec().then(count=>{
                        var rowData={
                            rows:data,
                            total:count
                        }
                        cb(rowData)
                    })
                }
            })
        }
    },
    getUserPhone: function getUserPhone (phone) {
        if(phone){
            return User
                .findOne({ phone: phone })
                .exec()
        }else{
            return User
                .find()
                .exec()
        }
    }
}
