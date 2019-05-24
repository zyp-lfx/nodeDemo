module.exports = {
    port: 3000,
    root:process.cwd(),
    mongodb: 'mongodb://localhost:27017/zypdemo',
    session: {
        secret: 'zyp',
        key: 'zyp',
        maxAge: 2592000000
    }
}
