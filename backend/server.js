const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');

const app = express();

const db = require("./app/models");

db.sequelize.sync();

//  If existing tables need to dropped and the database resynced, enter force: true as the following code :
/*
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/images', express.static(path.join(__dirname, 'app/images')));
require("./app/routes/user.routes")(app);
require("./app/routes/post.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});