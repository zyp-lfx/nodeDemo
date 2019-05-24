var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
        var str = file.originalname.split('.')
        cb(null, Date.now() + '.' + str[1])
    }
})
var createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

var uploadFolder = './upload';
createFolder(uploadFolder);
var upload = multer({storage: storage})
router.post('/', upload.array('file', 20), function (req, res, next) {
    console.log(req.files)
    res.send({
        msg:'上传成功',
        filename:req.files[0].filename,
        code:1
    })
})
module.exports = router

