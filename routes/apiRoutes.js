//Dependencies
const axios = require("axios");
const cheerio = require("cheerio");

//Require data models
const db = require("../models");

module.exports = function(app) {

  //Scrape articles and save to database
  app.post("/scrape", function(req, res) {
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
      res.send("Scrape Complete");
    });
  });

  //Clear scraped (but unsaved) articles from db
  app.delete("/clear", function(req, res) {
    //Find article by id and update saved status
    db.Article.remove({ saved : false })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  //Clear saved articles from db
  app.delete("/clear-saved", function(req, res) {
    //Find article by id and update saved status
    db.Article.remove({ saved : true })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  //PUT route to update saved status on "save" button click
  app.put("/api/save/article/:id", function(req, res) {
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

  //POST route to save new note
  app.post("/api/save/note/:id", function(req, res) {
    //Save note with id
    db.Note.create(req.body)
    .then(function(dbNote) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { notes: dbNote._id } }, { new: true });
    })
    .then(function(dbArticle){
      res.json(dbArticle);
      console.log(dbArticle);
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

  //GET Article by id, populate with Note
  app.get("/api/articles/:id", function(req, res) {
    //Find note by id
    db.Article.findOne({ _id: req.params.id })
      .populate("notes")
      .then(function(dbArticle) {
        //Make data object for handlebars
        var hbsObject = {
          articles: dbArticle
        };
        //log new data object to server console
        console.log(dbArticle);
        //render view with data
        res.render("partials/notes", hbsObject);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

};