const category = require("../controllers/category.controller.js");
module.exports = app => {
    const category = require("../controllers/category.controller.js");
    const passport = require('passport')

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", passport.authenticate('jwt', {session:false}), category.create);

    // Retrieve all Tutorials
    router.get("/", category.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", category.findOne);

    router.get("/:id/books", category.getBooks);


    router.put("/:id",passport.authenticate('jwt', {session:false}), category.update);


    router.delete("/:id",passport.authenticate('jwt', {session:false}), category.delete);

    app.use('/api/category', router);
};