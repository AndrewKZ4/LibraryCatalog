const db = require("../models");
const Category = db.categories;
const Author = db.authors;
const Book = db.books;



exports.create = (req, res) => {

    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!req.body.pages_count) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!req.body.authorId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    if (!req.body.categoryId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }


    const book = {
        title: req.body.title,
        pages_count: req.body.pages_count,
        description:req.body.description,
        authorId: req.body.authorId,
        categoryId: req.body.categoryId

    };


    Book.create(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Book."
            });
        });
};

exports.findAll = (req, res) => {

    Book.findAll( {include: [
            {model:Author, as: 'author'},{model:Category, as: 'category' }]})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Books."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Book.findByPk(id,{include: [
            {model:Author, as: 'author'},{model:Category, as: 'category' }]})
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Book with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Book with id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Book.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Book.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Book was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};



