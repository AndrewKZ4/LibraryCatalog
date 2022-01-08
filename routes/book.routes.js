const book = require("../controllers/book.controller.js");
module.exports = app => {
    const category = require("../controllers/book.controller.js");
    const passport = require('passport')

    var router = require("express").Router();

    router.post("/",passport.authenticate('jwt', {session:false}), book.create);

    router.get("/", book.findAll);

    router.get("/:id", book.findOne);

    router.put("/:id",passport.authenticate('jwt', {session:false}), book.update);

    router.delete("/:id",passport.authenticate('jwt', {session:false}), book.delete);

    app.use('/api/book', router);
};