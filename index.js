const express =require('express')
const path = require('path')
const config =require('config-lite')(__dirname)
const UserModel =require('./models/user')
const session = require('express-session')

const routes = require('./route')
const router = express.Router()
const bodyParser = require('body-parser');
var app =express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.set('views', path.join(__dirname, 'views'))
app.engine( '.html', require('ejs').renderFile );  // 注册html模板引擎
app.set('view engine', 'html');  // 将模板引擎换成html
// app.set('view engine', 'html')
routes(app)
app.use(session({
    name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
    secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
    }

}))
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.listen(config.port, function () {
    console.log(`listening on port ${config.port}`)
    console.log(config.mongodb)
})

