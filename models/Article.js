const mongoose = require("mongoose");

//Reference to Schema constructor
const Schema = mongoose.Schema;

//Create Article schema
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  summary: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    required: true,
    default: false
  },
  //ref to Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//Create model from Article schema
var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;

