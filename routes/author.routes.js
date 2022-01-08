const passport = require("passport");
module.exports = app => {
    const author = require("../controllers/author.controller.js");
    const passport = require('passport')

    var router = require("express").Router();


    router.post("/",passport.authenticate('jwt', {session:false}), author.create);

    // Retrieve all Tutorials
    router.get("/", author.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", author.findOne);

    router.get("/:id/books", author.getBooks);


    router.put("/:id",passport.authenticate('jwt', {session:false}), author.update);


    router.delete("/:id",passport.authenticate('jwt', {session:false}), author.delete);


    app.use('/api/author', router);
};