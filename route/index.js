module.exports = function (app) {
    app.get('/', function (req, res) {
        res.send('hollow')
    })

    app.use('/user', require('./user'))
    app.use('/login', require('./login'))
    app.use('/reg', require('./reg'))
}
