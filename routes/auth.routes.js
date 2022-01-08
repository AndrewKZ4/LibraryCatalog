
module.exports = app => {
    const user = require("../controllers/auth.controller.js");

    var router = require("express").Router();

    router.post('/register', user.register)
    router.post('/login', user.login)


    app.use('/api/auth', router);
};