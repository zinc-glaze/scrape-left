$(function() {

  //Initialize Materialize modals
  $(document).ready(function(){
    $('.modal').modal();
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

  //Delete article on button click
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

  //Get article and populate notes on button click
  $(document).on("click", ".view-notes", function() {
    let articleId = $(this).attr("data-id");

    $.ajax("api/article/" + articleId, {
      type: "GET",
      data: articleId
    }).then(function() {
      console.log("Article" + articleId + " Notes Viewed");
    });
  });

});