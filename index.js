const express = require("express");
const passport = require('passport')
const cors = require("cors");

const app = express();
app.use(passport.initialize())
require('./middleware/passport')(passport)

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});*/

require("./routes/category.routes")(app);
require("./routes/author.routes")(app);
require("./routes/book.routes")(app);
require("./routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});