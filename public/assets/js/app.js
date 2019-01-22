$(function() {

  //Initialize Materialize side-nav
  $(document).ready(function(){
    $('.sidenav').sidenav();
  });

  //Initialize Materialize modals
  $(document).ready(function(){
    $('.modal').modal({
      onCloseEnd: function() { location.reload(); }
    });
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

    $.ajax("api/save/article/" + articleId, {
      method: "PUT",
      data: articleId
    }).then(function() {
      console.log("Article" + articleId + "saved");
      location.reload();
    });
  });

  //Save note on button click
  $(".save-note").on("click", function() {
    let noteId = $(this).attr("data-id");

    $.ajax("api/save/note/" + noteId, {
      method: "POST",
      data: {
        body: $("*[note-id="+noteId+"]").val().trim()
      }
    }).then(function() {
      console.log("Note " + noteId + " saved");
      $("*[note-id="+noteId+"]").empty;
    });
  });

  //Delete saved article on button click
  $(document).on("click", ".delete-article", function() {
    let articleId = $(this).attr("data-id");

    $.ajax("api/delete/" + articleId, {
      method: "DELETE",
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
      method: "GET",
    }).then(function(result) {
      console.log(result);
      for (i in result.notes) {
        let cardDiv = $("<div>");
        cardDiv.addClass("card-panel");
        let cardText = $("<span>" + result.notes[i].body + "</span>");
        cardDiv.append(cardText); 
        $("*[note-area-id="+articleId+"]").append(cardDiv);
      }
    });
  });
});