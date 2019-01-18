//Dependencies
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = 3013;

//Initialize express
const app = express();

//Handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Serve static content from "public" directory
app.use(express.static("public"));

//Middleware
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Connect to Mongo DB
mongoose.connect("mongodb://localhost/scrapeLeftDB", { useNewUrlParser: true, useCreateIndex: true });

//Point to Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//Start server
app.listen(PORT, function() {
  console.log("App listening on port " + PORT);
});





