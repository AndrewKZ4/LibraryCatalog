const db = require("../models");
const Author = db.authors;
const Book = db.books;
const Category = db.categories



exports.create = (req, res) => {

    if (!req.body.firstName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!req.body.lastName) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const author = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,

    };


    Author.create(author)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Author."
            });
        });
};

exports.findAll = (req, res) => {


    Author.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving authors."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Author.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Author with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Author with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Author.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Author was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Author with id=${id}. Maybe Author was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Author with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Author.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Author was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Author with id=${id}. Maybe Author was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Author with id=" + id
            });
        });
};

exports.getBooks = (req, res) => {
    const id = req.params.id;

    Author.findByPk(id,{include: {model:Book, as:'books', include: [{model:Author, as:'author'},{model:Category, as:'category'}] }})
        .then(data => {
            if (data.books) {
                res.send(data.books);
            } else {
                res.status(404).send({
                    message: `Cannot find Author with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Author with id=" + id
            });
        });
};

