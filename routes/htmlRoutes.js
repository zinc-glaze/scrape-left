//Dependencies
const axios = require("axios");
const cheerio = require("cheerio");

//Require data models
const db = require("../models");

module.exports = function(app) {

  //Find scraped (but unsaved) articles and render to "index" template
  app.get("/", function(req, res) {
    db.Article.find({ saved: false }).sort({ _id:-1 })
    .then(function(dbArticle) {
      //Make data object for handlebars
      var hbsObject = {
        articles: dbArticle
      };
      //log new data object to server console
      console.log(hbsObject);
      //render view with data
      res.render("index", hbsObject);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });

  //Find saved articles and render to "saved" template
  app.get("/saved", function(req, res) {
    db.Article.find({ saved: true }).sort({ _id:-1 })
    .then(function(dbArticle) {
      //Make data object for handlebars
      var hbsObject = {
        articles: dbArticle
      };
      //log new data object to server console
      console.log(hbsObject);
      //render view with data
      res.render("saved", hbsObject);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });
};