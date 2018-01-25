<template>
  <section class="new-post">
    <form class="new-post-form">
      <input type="text" class="title" placeholder="Title" v-model="title" />
      <input type="text" class="name" placeholder="Author Name" v-model="name" />
      <textarea type="text" class="content" placeholder="Your Story" v-model="content" />
      <button to="/" v-on:click="saveNewPost">Publish</button>
    </form>
  </section>
</template>
<script>
import axios from 'axios';

const date = new Date();

let data = {
  title: '',
  name: '',
  content: ''
};

export default {
  name: 'new-posts',
  data () {
    return data;
  },
  // TODO:
  // 1. Redirect to Post view when article is successfully posted
  // 2. Sanitize input data
  methods: {
    saveNewPost(e) {
      e.preventDefault();
      if (data.title === '' || data.name === '' || data.content === '') {
        return false;
      }
      const post = Object.assign({}, {
        title: data.title,
        name: data.name,
        date: date.toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),
        content: data.content
      });
      // TODO: 
      // 1. Post failure message if post couldn't get saved
      axios.post('new-post', post)
        .then(() => { this.$router.push('/') });
    }
  }
}
</script>
<style>
  .new-post {
    position: relative;
    width: 100%;
    padding: 30px;
    margin-top: 30px;
    border-left: 4px solid #D1D1D1;
  }
  .new-post-form input,
  .new-post-form textarea,
  .new-post-form button {
    display: block;
  }
  .new-post-form input,
  .new-post-form textarea {
    width: 67%;
    min-width: 400px;
    margin-bottom: 20px;
  }
  .new-post-form input {
    height: 40px;
    border-bottom: 1px solid #D1D1D1;
  }
  .new-post-form textarea {
    height: 250px;
    border: 1px solid #D1D1D1;
  }
  .new-post-form .title,
  .new-post-form .name,
  .new-post-form .content {
    letter-spacing: 0.8px;
    color: #454545;
  }
  .new-post-form .title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .new-post-form .name {
    font-size: 1.0rem;
  }
  .new-post-form .content {
    font-size: 1.0rem;
  }
  .new-post-form button {
    padding: 15px 25px;
    height: 45px;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: #454545;
    border: 1px solid #D1D1D1;
  }
  .new-post-form button:hover {
    border: 1px solid #909090;
  }
</style>
