const request = require('request');
const APPID='wxef8e562473ffc8e8'
const SECRET='3c12b73ddbc2dcb8630246296a560392'
const WXBizDataCrypt =require('./WXBizDataCrypt')
module.exports={
    getUser(code){
        var p = new Promise((resolve, reject)=>{
            let options = {
                method: 'POST',
                url: 'https://api.weixin.qq.com/sns/jscode2session?',
                formData: {
                    appid: APPID,
                    secret: SECRET,
                    js_code: code,
                    grant_type: 'authorization_code'
                }
            };
            request(options, (error, response, body) => {
                if(error){
                    reject(error)
                }else{
                    let _data = JSON.parse(body);
                    console.log(_data)
                    resolve(_data)
                }
            })
        })
        return p
    },
    WXBizDataCrypt:WXBizDataCrypt
}
