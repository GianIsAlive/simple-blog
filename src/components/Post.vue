<template>
  <section class="post">
    <section class="post-container" v-if="post !== null">
      <h2 class="title">{{post.title}}</h2>
      <p class="name">{{post.name}}</p>
      <p class="date">{{post.date}}</p>
      <p class="content">{{post.content}}</p>
    </section>
    <form class="post-comment">
      <button class="add-comment-button" v-if="commentActive === false" v-on:click="activateComment">Add Comments</button>
      <section class="post-comment-active" v-if="commentActive === true">
        <input type="text" placeholder="Your Name" v-model="comment.name" />
        <textarea class="comment" placeholder="What do you think about this post?" v-model="comment.content"></textarea>
        <button class="post-comment-button" v-on:click="postComment">Publish</button>
      </section>
    </form>
    <section class="comments">
      <h2 class="comments-title">Comments:</h2>
      <section class="comments-container" v-for="comment in comments" :key="comment.id" v-if="comments !== null">
        <h3 class="name">{{comment.name}}</h3>
        <p class="date">{{comment.date}}</p>
        <p class="content">{{comment.content}}</p>
      </section>
    </section>
  </section>
</template>

<script>
import axios from 'axios';

import { loadState, saveState } from '../util/localStorage';

const date = new Date();

let data = {
  post: null,
  comment: {
    name: '',
    date: date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }),
    content: '',
  },
  comments: [],
  commentActive: false
}

export default {
  name: 'post',
  data () {
    return data;
  },

  // Get post from RedisDB
  methods: {
    getPost (name, title) {
      return new Promise((resolve, reject) => {
        axios.get(`/post/${name}/${title}`)
          .then(response => {
            data.post = response.data;
            resolve(data.post);
          })
          .catch(() => { reject('failed to get post') });
      });
    },

    // Toggle comment form boolean value
    activateComment(e) {
      e.preventDefault();
      data.commentActive = true;
    },

    // Save comment to MongoDB
    // TODO: 
    // 1. Rerender comment section after comments are successfully posted
    // 2. Clear input fields after comment is successfully posted
    // 3. Persist information in local storage, so it's not effected by browser refresh
    // 4. Sanitize input data
    postComment(e) {
      e.preventDefault();
      if (data.comment.name === null || data.comment.content === null) return;
      axios.post('/post-comment', Object.assign(data.comment, {
        title: this.$route.params.title.replace(/-/g, ' ')
      })).then((response) => data.comments.push(response));
      // Hide inpur fields after submit
      // TODO: 
      // 1. Add notification if comments are not successfully posted
      // 2, Move to comment offset when successfully posted
      data.commentActive = false;
    },

    // Get post from MongoDB
    // TODO:
    // 1. Display top 10 most recent comment
    // 2. Load More comment when user scroll to the bottom
    // 3. Sanitize input data
    getComment(title) {
      return new Promise((resolve, reject) => {
        axios.get(`/get-comments/${title}`)
          .then(response => {
            data.comments = response.data;
            resolve(data.comments);
          })
          .catch(() => { reject('failed to get comment') });;
      });
    }
  },
  mounted () {
    let name = this.$route.params.name.replace(/-/g, ' ');
    let title = this.$route.params.title.replace(/-/g, ' ');
    this.getPost(name, title);
    this.getComment(title);
  }
}
</script>

<style>
  .post {
    position: relative;
    width: 100%;
    margin-top: 30px;
  }
  .post-container,
  .post-comment,
  .comments {
    position: relative;
    width: 70%;
    padding: 30px;
    margin-bottom: 30px;
    border-left: 4px solid #D1D1D1;
  }
  .post-container * {
    margin-bottom: 15px;
  }
  .post-container .title,
  .comments .comments-title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .post-container .content {
    font-size: 1.0rem;
  }
  .post-container .name {
    font-size: 1.0rem;
    margin-bottom: 5px;
  }
  .post-container .date {
    font-size: 0.8rem;
  }
  .post-comment input,
  .post-comment textarea,
  .post-comment button {
    display: block;
    margin-bottom: 15px;
    background-color: transparent;
  }
  .post-comment input {
    width: 100%;
    height: 40px;
    font-size: 1.0rem;
    border-bottom: 1px solid #D1D1D1;
  }
  .post-comment textarea {
    width: 100%;
    height: 150px;
    font-size: 1.0rem;
    border: 1px solid #D1D1D1;
  }
  .post-comment button {
    padding: 15px 25px;
    height: 45px;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: #454545;
    border: 1px solid #D1D1D1;
  }
  .post-comment button:hover {
    cursor: pointer;
    border: 1px solid #909090;
  }
  .comments .comments-title {
    margin-bottom: 30px;
  }
  .comments .comments-container {
    margin-bottom: 30px;
  }
  .comments .comments-container .name {
    font-size: 1.0rem;
  }
  .comments .comments-container .date {
    font-size: 0.8rem;
    margin-bottom: 5px;
  }
  .comments .comments-container .content {
    font-size: 0.9rem;
  }
</style>

