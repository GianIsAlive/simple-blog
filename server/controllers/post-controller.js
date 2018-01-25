const redis = require('redis');

const client = redis.createClient('15586', 'redis-15586.c14.us-east-1-3.ec2.cloud.redislabs.com');

const postController = {
  getAllPost (req, res, next) {
    (function getKeys() {
      // Get all the keys from RedisDB
      return new Promise((resolve, reject) => {
        client.keys('*', (err, response) => {
          if (err) reject('failed to get data');
          resolve(response);
        });
      });
    })().then(response => {
      const multi = client.multi();
      // Get key's full hash value
      response.forEach(post => {
        multi.hgetall(post);
      });
      multi.exec((err, posts) => {
        if (err) return res.status(400).end('failed to get data');
        // Abbreviate post content
        req.locals = posts.map((post) => {
          return {
            title: post.title,
            content: post.content.split(' ').slice(0, 100).join(' ') + '...',
            name: post.name,
            date: post.date
          };
        });
        next();
      });
    }).catch(err => res.status(400).end(err));
  },
  getOnePost (req, res, next) {
    client.hgetall(req.params.name, (err, response) => {
      if (err) return res.status(400).end('Sorry could\'t get data');
      req.locals = response;
      next();
    });
  },
  createNewPost (req, res, next) {
    const postObj = {
      name: req.body.name,
      title: req.body.title,
      date: req.body.date,
      content: req.body.content
    };
    client.hmset(postObj.name, postObj, (err) => {
      if (err) return res.status(400).end('Sorry could\'t get data');
      next();
    });
  }
};

module.exports = postController;
