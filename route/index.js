module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('hollow')
    })

    app.use('/user', require('./user'))
    app.use('/adminUser', require('./adminUser'))
    app.use('/login', require('./login'))
    app.use('/reg', require('./reg'))
    app.use('/menu', require('./menu'))
    app.use('/goods', require('./goods'))
    app.use('/imgUpload', require('./imgUpload'))
}
