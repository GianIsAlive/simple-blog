<template>
  <section class="post">
    <section class="post-container" v-if="post !== null">
      <h2 class="title">{{post.title}}</h2>
      <p class="name">{{post.name}}</p>
      <p class="date">{{post.date}}</p>
      <p class="content">{{post.content}}</p>
    </section>
    <form class="post-comments">
      <input type="text" placeholder="Your Name" v-model="comment.name" />
      <textarea id="comment" cols="30" rows="10" v-model="comment.content"></textarea>
      <button v-on:click="postComment">Publish</button>
    </form>
    <h2 class="comments">Comments:</h2>
    <section class="comments-container" v-for="comment in comments" :key="comment.id" v-if="comments !== null">
      <h3 class="name">{{comment.name}}</h3>
      <p class="name">{{comment.date}}</p>
      <p class="content">{{comment.content}}</p>
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
  comments: null
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

    // Save comment to MongoDB
    // TODO: 
    // 1. Rerender comment section after comments are successfully posted
    // 2. Clear input fields after comment is successfully posted
    // 3. Persist information in local storage, so it's not effected by browser refresh
    // 4. Sanitize input data
    postComment(e) {
      e.preventDefault();
      if (data.post === null) return;
      axios.post('/post-comment', Object.assign(data.comment, {
        title: this.$route.params.title.replace(/-/g, ' ')
      }));
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
    padding: 30px;
  }
  .post-container {
    width: 70%;
  }
  .post-container * {
    margin-bottom: 15px;
  }
  .post-container .title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .post-container .content,
  .comments-container .content {
    font-size: 1.0rem;
  }
  .post-container .name,
  .comments-container .name {
    font-size: 1.0rem;
  }
  .post-container .date,
  .comments-container .date {
    font-size: 1.0rem;
  }
  .post-comments,
  .comments-container {
    width: 70%;
  }
  .post-container,
  .post-comments,
  .post-comments input,
  .post-comments textarea,
  .post-comments button,
  .comments-container,
  .comments {
    display: block;
    margin-bottom: 15px;
  }
  .post-comments textarea {
    width: 100%;
    height: 150px;
  }
</style>

