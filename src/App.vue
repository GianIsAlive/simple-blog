<template>
  <main class="app">
    <header class="main-header">
      <router-link to="/"><h1>Simple Blog</h1></router-link>
      <router-link to="/new-post">New Post</router-link>
    </header>
    <section class="main-container">
      <router-view></router-view>
    </section>
  </main>
</template>

<script>
  import VueRouter from 'vue-router';

  import AllPosts from './components/AllPosts.vue';
  import NewPost from './components/NewPost.vue';
  import Post from './components/Post.vue';

  const routes = [
    { path: '/', component: AllPosts },
    { path: '/new-post', component: NewPost },
    { path: '/post/:name/:title', component: Post }
  ];

  const router = new VueRouter({ mode: 'history', routes });

  export default {
    name: 'app',
    router,
    components: {
      AllPosts,
      NewPost
    }
  }
</script>

<style>
  .app {
    position: relative;
    width: 95%;
    max-width: 1440px;
    margin: 0 auto;
    background: rgb(197, 197, 197);
  }
  .app .main-header {
    display: flex;
    height: 80px;
    padding: 0 30px;
    background-color: grey;
  }
  .app .main-header h1 {
    margin-right: 20px;
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 80px;
  }
  .app .main-header a {
    line-height: 80px;
  }
</style>

