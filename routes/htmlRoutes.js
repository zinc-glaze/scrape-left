//Dependencies
const axios = require("axios");
const cheerio = require("cheerio");

//Require data models
const db = require("../models");

module.exports = function(app) {

  //GET route for scraping Truthout website and rendering index page
  app.get("/", function(req, res) {
    //Grab html body
    axios.get("https://www.truthout.org/latest/").then(function(response) {
      //Load into cheerio
      var $ = cheerio.load(response.data);
      //Grab every h3 within an article tag
      $("div.archive-text").each(function(i, element) {
        //create empty result object
        var scrapeResults = {};
        //add title, summary, and href of every link to object
        scrapeResults.title = $(element)
          .find("h3.entry-title")
          .find("a")
          .text();
        scrapeResults.summary = $(element)
          .children("div.entry-summary")
          .text()
          .slice(2, -2);
        scrapeResults.link = $(element)
          .find("h3.entry-title")
          .find("a")
          .attr("href");
        // Create new Article using scrapeResults object
        db.Article.create(scrapeResults)
        .then(function(dbArticle) {
          console.log(dbArticle);
        })
        .catch(function(err) {
          console.log(err);
        });
      });
    })
    .then(function() {
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
        res.json(err);
      });
    });
  });

  //GET html route to find and render saved articles
  app.get("/saved", function(req, res) {
    //Get all articles and render to index view
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