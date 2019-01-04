const User = require('../lib/mongo').User

module.exports = {
    // 注册一个用户
    create: function create (user) {
        return User.create(user).exec()
    },
    updatePostById: function updatePostById (postId, data) {
        return Post.update({ _id: postId }, { $set: data }).exec()
    },
   // 通过用户名获取用户信息
    getUserPhone: function getUserPhone (phone) {
        return User
            .findOne({ phone: phone })
            .exec()
    }
}
