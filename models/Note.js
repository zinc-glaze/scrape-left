const mongoose = require("mongoose");

//Reference to Schema constructor
const Schema = mongoose.Schema;

//Create Note schema
var NoteSchema = new Schema({
  body: {
    type: String,
    required: true
  }
});

//Create model from Note schema
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;



