const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title: String,
  name: String,
  date: String,
  content: String,
  replies: Array
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;