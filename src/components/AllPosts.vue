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
        <span class="posts-text-divider"></span>
        <h3 class="name">{{post.name}}</h3>
        <p class="date">{{post.date}}</p>
        <router-link :to="`post/${post.name.replace(/\s/g, '-')}/${post.title.replace(/\s/g, '-')}`">Read Story</router-link>
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
import six from '../assets/six.jpg';
import seven from '../assets/seven.jpg';

let data = {
  posts: [],
  image: [one, two, three, four, five, six, seven]
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
            return Object.assign(post, { image: Math.floor(Math.random() * 6) });
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
    padding: 30px 0;
  }
  .posts-container {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    border: 1px solid #D1D1D1;
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
    padding: 20px 100px 20px 20px;
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
  .posts-text .posts-text-divider {
    display: block;
    width: 100%;
    height: 1px;
    border-bottom: 1px solid #D1D1D1;
  }
  .posts-text .name {
    font-size: 1.0rem;
    margin-bottom: 5px;
  }
  .posts-text .date {
    font-size: 0.8rem;
  }
  .posts-text a {
    padding: 15px 25px;
    height: 45px;
    line-height: 45px;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: #454545;
    border: 1px solid #D1D1D1;
  }
  .posts-text a:hover {
    border: 1px solid #909090;
  }
</style>

