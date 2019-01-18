//Dependencies
const axios = require("axios");
const cheerio = require("cheerio");

//Require data models
const db = require("../models");

module.exports = function(app) {

  //PUT route to update saved status on "save" button click
  app.put("/api/save/:id", function(req, res) {
    //Find article by id and update saved status
    db.Article.update({ _id : req.params.id }, {$set: {saved: true}})
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
  });

  //DELETE route to delete article on "delete" button click
  app.delete("/api/delete/:id", function(req, res) {
    //Find article by id and update saved status
    db.Article.remove({ _id : req.params.id })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  //Get Article by id, populate with Note
  app.get("/api/article/:id", function(req, res) {
    //Find note by id
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then(function(dbArticle) {
        //Make data object for handlebars
        var hbsObject = {
          articles: dbArticle
        };
        //log new data object to server console
        console.log(hbsObject);
        //render view with data
        res.render("notes", hbsObject);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

};