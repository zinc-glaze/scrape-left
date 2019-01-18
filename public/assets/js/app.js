$(function() {

  //Initialize Materialize side-nav
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });

  //Initialize Materialize modals
  $(document).ready(function(){
    $('.modal').modal();
  });

  //Scrape new articles on button click
  $(document).on("click", ".scrape-new", function(event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "scrape/"
    }).then(function() {
      console.log("Scrape Completed");
      location.reload();
    });
  });

  //Clear scraped (but unsaved) articles from db
  $(document).on("click", ".clear-scraped", function(event) {
    event.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "clear/"
    }).then(function() {
      console.log("Cleared Scraped Articles");
      location.reload();
    });
  });

  //Clear all saved articles from db
  $(document).on("click", ".clear-saved", function(event) {
    event.preventDefault();
    $.ajax({
      method: "DELETE",
      url: "clear-saved/"
    }).then(function() {
      console.log("Cleared Saved Articles");
      location.reload();
    });
  });

  //Save article on button click
  $(document).on("click", ".save-article", function() {
    let articleId = $(this).attr("data-id");

    $.ajax("api/save/" + articleId, {
      type: "PUT",
      data: articleId
    }).then(function() {
      console.log("Article" + articleId + "saved");
      location.reload();
    });
  });

  //Delete saved article on button click
  $(document).on("click", ".delete-article", function() {
    let articleId = $(this).attr("data-id");

    $.ajax("api/delete/" + articleId, {
      type: "DELETE",
      data: articleId
    }).then(function() {
      console.log("Article" + articleId + "deleted");
      location.reload();
    });
  });

  //Get saved article and populate notes on button click
  $(document).on("click", ".view-notes", function() {
    let articleId = $(this).attr("data-id");

    $.ajax("api/articles/" + articleId, {
      type: "GET",
      data: articleId
    }).then(function() {
      console.log("Article" + articleId + " Notes Viewed");
    });
  });

});