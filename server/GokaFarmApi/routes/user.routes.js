

module.exports = app => {
    const user = require('../controllers/user.controller');

    var router = require("express").Router();

    router.post('/', user.create);

    router.get('/', user.findAll);

    router.post('/user', user.find);

    app.use('/api/users', router);
}