$(function() {
  //Save article on button click
  $(".save-article").on("click", function(event) {
    let articleId = $(this).attr("data-id");

    $.ajax("api/saved/" + articleId, {
      type: "PUT",
      data: articleId
    }).then(function() {
      console.log("Article" + articleId + "saved");
      location.reload();
    });
  });
});