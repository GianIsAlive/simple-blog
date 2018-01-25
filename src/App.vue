<template>
  <main class="app">
    <header class="main-header">
      <router-link class="app-name" to="/"><h1>Simple Blog</h1></router-link>
      <router-link class="app-new-post" to="/new-post" v-if="this.$route.fullPath !== '/new-post'">New Post</router-link>
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
  }
  .app .main-header {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px 30px;
    border: 1px solid #D1D1D1;
  }
  .app .main-header h1 {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 45px;
  }
  .app .main-header a {
    line-height: 45px;
  }
  .app .main-header .app-name,
  .app .main-header .app-new-post {
    color: #454545;
    letter-spacing: 2px;
  }
  .app .main-header .app-new-post {
    width: 150px;
    line-height: 45px;
    border-radius: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    text-align: center;
    border: 1px solid #D1D1D1;
  }
  .app .main-header .app-new-post:hover {
    border: 1px solid #909090;
  }
</style>

