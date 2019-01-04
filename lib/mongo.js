const config =require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const moment = require('moment')
const objectidToTimestamp = require('objectid-to-timestamp')
const mongolass = new Mongolass()
mongolass.connect(config.mongodb)
exports.User = mongolass.model('User', {
    name: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    createTime: { type: Date, required: true },
    adminId: { type: String },
})
exports.User.index({ phone: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一
exports.Login = mongolass.model('Login', {
    password: { type: String, required: true },
    phone: { type: String, required: true },
})
// exports.User.index({ phone: 1 }, { unique: true }).exec()
