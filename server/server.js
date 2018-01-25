const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const validator = require('validator');
const history = require('connect-history-api-fallback');
const cluster = require('cluster');
const redis = require('redis');
const mongoose = require('mongoose');
const commentModel = require('./comment-model');

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
    console.log(`Worker: ${worker.id} died..`);
    cluster.fork();
  });
// Code to run if we're in a worker process
} else {
  const app = express();
  app.use(history({ index: '/' }));

  // Redis
  const redisClient = redis.createClient('15586', 'redis-15586.c14.us-east-1-3.ec2.cloud.redislabs.com');
  redisClient.on('connect', () => {
    console.log('Connected to post client RedisDB');
  });

  // Mongo
  mongoose.connect('mongodb://GianIsAlive:hello@ds213338.mlab.com:13338/simple-blog');
  mongoose.connection.on('open', () => {
    console.log('Connected to mongoDB!');
  });

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.get('/all-posts', (req, res) => {
    (function getKeys() {
      // Get all the keys from RedisDB
      return new Promise((resolve, reject) => {
        redisClient.keys('*', (err, response) => {
          if (err) reject('failed to get data');
          resolve(response);
        });
      });
    })().then(response => {
      const multi = redisClient.multi();
      response.forEach(post => {
        multi.hgetall(post);
      });
      multi.exec((err, posts) => {
        if (err) return res.status(400).end('failed to get data');
        const postAbbreviate = posts.map((post) => {
          return {
            title: post.title,
            content: post.content.split(' ').slice(0, 100).join(' ') + '...',
            name: post.name,
            date: post.date
          };
        });
        res.status(200).send(postAbbreviate);
      });
    }).catch(err => res.status(400).end(err));
  });

  app.post('/new-post', (req, res) => {
    redisClient.hmset(req.body.name, {
      name: req.body.name,
      title: req.body.title,
      date: req.body.date,
      content: req.body.content
    });
    res.end();
  });

  app.get('/post/:name/:content', (req, res) => {
    redisClient.hgetall(req.params.name, (err, response) => {
      if (err) res.status(400).end('Sorry could\'t get data')
      res.status(200).send(response);
    });
  });

  app.post('/post-comment', (req, res) => {
    commentModel.create(req.body, (err) => {
      if (err) res.status(400).end('failed to post comment');
      console.log('successsfully saved!');
    });
    res.status(200).end('success');
  });

  app.get('/get-comments/:title', (req, res) => {
    commentModel.find({ title: req.params.title }, (err, response) => {
      if (err) res.status(400).end('Couldn\'t get comments');
      res.status(200).send(response);
    });
  });

  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  app.use('/post/*/dist', express.static(path.join(__dirname, '../dist')));
  app.use('/img', express.static(path.join(__dirname, '../dist/img')));

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`You are listening on ${port}`);
  });
}
