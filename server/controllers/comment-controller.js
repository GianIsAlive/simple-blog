const mongoose = require('mongoose');

const commentModel = require('../models/comment-model');

 mongoose.connect('mongodb://GianIsAlive:hello@ds213338.mlab.com:13338/simple-blog');

const commentController = {
  getComments (req, res, next) {
    commentModel.find({ title: req.params.title }, (err, response) => {
      if (err) return res.status(400).end('Couldn\'t get comments');
      req.locals = response;
      next();
    });
  },
  postComment (req, res, next) {
    commentModel.create(req.body, (err, response) => {
      if (err) return res.status(400).end('failed to post comment');
      req.locals = response;
      next();
    });
  }
};

module.exports = commentController;
