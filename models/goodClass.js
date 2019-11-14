const goodClass = require('../lib/mongo').goodClass
module.exports={
    create(data){
        return goodClass.create(data)
    },
    getGoodClass(data,cb){
        var pages=parseInt(data.pages)
        var rows=parseInt(data.rows)
        var query={
            attachId:""
        }
        if(!data.attachId){
            data.attachId=""
        }else{
            query.attachId=data.attachId
        }
        if(!data.name){
            delete data.name
        }else{
            query.name=data.name

        }
        console.log(query)
        goodClass.find(query).limit(rows).skip((pages-1)*rows).exec(function (err,resdata) {
            if(err) cb(err)
            else{
                goodClass.count({attachId:data.attachId}).exec().then(count=>{
                    var rowData={
                        rows:resdata,
                        total:count,
                    }
                    cb(rowData)
                })
            }
        })
    },
    update(data){
        return User.update({ _id: postId }, { $set: data }).exec()
    },
}
