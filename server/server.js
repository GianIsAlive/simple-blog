const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const validator = require('validator');
const history = require('connect-history-api-fallback');
const cluster = require('cluster');

// Database Schemas
const commentModel = require('./models/comment-model');

// Database Controllers
const {
  getComments,
  postComment
} = require('./controllers/comment-controller');
const {
  getAllPost,
  getOnePost,
  createNewPost
} = require('./controllers/post-controller');

// Count the machine's CPUs
const cpuCount = require('os').cpus().length;
// Code to run if we're in the master process
if (cluster.isMaster) {
  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  // Listen for terminating workers
  cluster.on('exit', (worker) => {
    // Replace the terminated workers
    cluster.fork();
  });
// Code to run if we're in a worker process
} else {
  const app = express();
  app.use(history({ index: '/' }));

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  // Retrieve all the post from Redis
  app.get('/all-posts', getAllPost, (req, res) => {
    res.status(200).send(req.locals);
  });

  // Save post in Redis
  app.post('/new-post', createNewPost, (req, res) => {
    res.status(200).end('successfully saved to database.');
  });

  // Retrieve specific post from database
  app.get('/post/:name/:content', getOnePost, (req, res) => {
    res.status(200).send(req.locals);
  });

  app.post('/post-comment', postComment, (req, res) => {
    res.status(200).send(req.locals);
  });

  app.get('/get-comments/:title', getComments, (req, res) => {
    res.status(200).send(req.locals);
  });

  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.use('/post/*/dist', express.static(path.join(__dirname, '../dist')));
  app.use('/img', express.static(path.join(__dirname, '../dist/img')));

  const port = process.env.PORT || 3000;

  app.listen(port);
}
