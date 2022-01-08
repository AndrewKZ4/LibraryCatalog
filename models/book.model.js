module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("book", {
        title: {
            type: Sequelize.STRING
        },
        pages_count: {
            type: Sequelize.INTEGER
        },
        description:{
            type: Sequelize.TEXT
        },



    });

    return Book;
};