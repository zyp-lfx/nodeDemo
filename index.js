const express =require('express')
const path = require('path')
const config =require('config-lite')(__dirname)
const UserModel =require('./models/user')
// const routes = require('./route')
const router = express.Router()

var app =express()
app.set('views', path.join(__dirname, 'views'))
app.engine( '.html', require('ejs').renderFile );  // 注册html模板引擎
app.set('view engine', 'html');  // 将模板引擎换成html
// app.set('view engine', 'html')
app.get('/', function (req, res) {
    console.log(res)
    ///
    res.render('index');


    // res.send('hello, express')
    // res.redirect('index')
})
// router.get('/',  function (req, res, next) {
//     res.send('hello, express')
//     res.render('index');
// })
// routes(app)
// router.get('/', function (req, res) {
//     res.send('hello, express')
// })


app.listen(config.port, function () {
    // let user = {
    //     name: 'zhansan',
    //     password: '123456',
    //     gender: 1,
    //     phone:'13135755330',
    //     age:16,
    //     createTime:new Date().getTime()
    // }
    // UserModel.create(user).then(res=>{
    //     console.log(res)
    // }).catch(err=>{
    //     console.log(err)
    // })
    console.log(`listening on port ${config.port}`)
    console.log(config.mongodb)
})
