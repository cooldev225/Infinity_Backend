require('dotenv').config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const upload = multer();

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
//app.use(express.json());  /* bodyParser.json() is deprecated */
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

// parse multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

const db = require("./app/models");

db.sequelize.sync();

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/api/test", (req, res) => {
  res.json({ message: "Welcome to Infinity backend." });
});

require("./app/routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 2083;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
