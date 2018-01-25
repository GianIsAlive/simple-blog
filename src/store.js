import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
  posts: []
};

const actions = {
  getAllPosts() {
    return new Promise((resolve, reject) => {
      axios.get('/all-posts')
        .then((response) => {
          state.posts.posts = response.data;
          state.posts.posts = data.posts.map((post) => {
            return Object.assign(post, { image: Math.floor(Math.random() * 6) });
          });
          resolve(state.posts);
        })
        .catch(() => reject('Could not get post.'));
    });
  }
};

const store = new Vuex.Store({
  state,
  actions
});

export default store;
