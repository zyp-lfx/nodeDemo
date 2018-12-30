module.exports = function (app) {
    app.get('/', function (req, res) {
        // res.render('index')
        // console.log(res.query)
        res.send('hollow,world')
        // console.log(res)
    })
    // app.use('/signup', require('./signup'))
    // app.use('/signin', require('./signin'))
    // app.use('/signout', require('./signout'))
    // app.use('/posts', require('./posts'))
    app.use('/user', require('./user'))
    app.use('/login', require('./login'))
}
