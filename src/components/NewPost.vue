<template>
  <section class="new-post">
    <form class="new-post-form">
      <input type="text" id="title" placeholder="Title" v-model="title" />
      <input type="text" id="name" placeholder="Name" v-model="name" />
      <textarea type="text" id="content" placeholder="Your Story" v-model="content" />
      <button v-on:click="saveNewPost">Publish</button>
    </form>
  </section>
</template>
<script>
import axios from 'axios';

const date = new Date();

const data = {
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
      const post = Object.assign({}, {
        title: data.title,
        name: data.name,
        date: date.toLocaleDateString('en-US', {
          year: 'numeric', month: 'long', day: 'numeric'
        }),
        content: data.content
      });
      axios.post('new-post', post);
    }
  }
}
</script>
<style>
  .new-post {
    position: relative;
    width: 100%;
    padding: 30px;
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
  }
  .new-post-form textarea {
    height: 120px;
  }
</style>
