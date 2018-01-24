import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';

import reset from './style/reset.css';
import style from './style/style.scss';

Vue.use(VueRouter);

const vm = new Vue({
  el: '#app-container',
  render: h => h(App)
});