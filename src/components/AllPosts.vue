<template>
  <section class="all-posts">
    <section
      class="posts-container"
      v-for="post in posts"
      :key="post.id"
    >
      <section class="posts-image">
        <img :src="image[post.image]" alt="random image">
      </section>
      <section class="posts-text">
        <h2 class="title">{{post.title}}</h2>
        <p class="content">{{post.content}}</p>
        <h3 class="name">{{post.name}}</h3>
        <p class="date">{{post.date}}</p>
        <router-link :to="`post/${post.name}/${post.title}`">Read Complete Story</router-link>
      </section>
    </section>
  </section>
</template>
<script>
import axios from 'axios';

import one from '../assets/one.jpg';
import two from '../assets/two.jpg';
import three from '../assets/three.jpg';
import four from '../assets/four.jpg';
import five from '../assets/five.jpg';

const data = {
  posts: [],
  image: [one, two, three, four, five]
};

export default {
  name: 'new-posts',
  data () {
    return data;
  },
  methods: {
    getPosts () {
      axios.get('/all-posts')
        .then((response) => {
          data.posts = response.data;
          data.posts = data.posts.map((post) => {
            return Object.assign(post, { image: Math.floor(Math.random() * 4) });
          });
        });
    }
  },
  mounted () {
    this.getPosts();
  }
}
</script>

<style>
  .all-posts {
    position: relative;
    width: 100%;
    padding: 30px;
  }
  .posts-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    background-color: #FFFFFF;
  }
  .posts-container:last-of-type {
    margin-bottom: 0;
  }
  .posts-image {
    width: 30%;
  }
  .posts-image img {
    width: 100%;
  }
  .posts-text {
    width: 70%;
    padding: 20px;
  }
  .posts-text * {
    margin-bottom: 15px;
  }
  .posts-text .title {
    font-size: 1.5rem;
    font-weight: 700;
  }
  .posts-text .content {
    font-size: 1.0rem;
  }
  .posts-text .name {
    font-size: 1.0rem;
  }
  .posts-text .date {
    font-size: 1.0rem;
  }
</style>

