const config =require('config-lite')(__dirname)
const mongoose = require('mongoose')
const moment = require('moment')
const objectidToTimestamp = require('objectid-to-timestamp')
// const mongoosee = new Mongolass()
mongoose.connect(config.mongodb)
const Schema = mongoose.Schema
var userSchema=new Schema({
    nickName: { type: String, required: true,index:true},
    gender: { type: Number, },
    city: { type: String,  },
    country: { type: String,  },
    province: { type: String, },
    avatarUrl: { type: String,},
    phone:{type:String},
    password:{type:String},
    openId: { type: String, required: true,unique: true },
})
var adminuserSchema=new Schema({
    name: { type: String, required: true,index:true,unique: true },
    createTime: { type: Date, required: true },
    grade: { type: String , required: true },
    treeId:{type: String }
})
var menuSchema = new Schema({
    name:{ type: String, required: true,index:true,unique: true },
    createTime:{ type: Date, required: true },
    router:{ type: String, required: true,index:true,unique: true },
    attachId:{ type: String },
    showId:{ type: String }
})
var goodsSchema = new Schema({
    name:{type: String, required: true},
    createTime:{ type: Date, required: true },
    imgList:{type:String},
    price:{type:Number},
    balance:{type:Number},
    goodsInfo:{type:String},
    goodsClassId:{type:String},
    goodsAttrId:{type:String},


})
var attrSchema = new Schema({
    name:{type:String,required:true},
    attrName:{type:String},
    attachId:{type:String},
})
var skuSchema = new Schema({
    goodsId:{type:String,required:true},
    stock:{type:Number},
    img:{type:Number,},
    price:{type:Number,required:true},
    sku:{type:String},

})
exports.User = mongoose.model('User',userSchema )
exports.Adminuser = mongoose.model('adminuser',adminuserSchema )
exports.Menu = mongoose.model('Menu',menuSchema )
exports.Goods = mongoose.model('Goods',goodsSchema )
exports.attr = mongoose.model('attr',attrSchema )
exports.sku = mongoose.model('sku',skuSchema )

// exports.User.index({ phone: 1 }, { unique: true }).exec()
