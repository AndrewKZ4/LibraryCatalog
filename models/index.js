const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({

    dialect: dbConfig.dialect,
    storage: dbConfig.storage
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.authors = require("./author.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.books = require("./book.model.js")(sequelize, Sequelize);
db.users = require("./user.model.js")(sequelize, Sequelize);

db.authors.hasMany(db.books, {as:'books', foreignKey: 'authorId'})
db.categories.hasMany(db.books,{as: 'books'})
db.books.belongsTo(db.authors, {as: 'author'})
db.books.belongsTo(db.categories, {as: 'category'})
module.exports = db;