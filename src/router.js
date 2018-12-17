import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Camera from './views/Camera.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/q/:quest_id',
      name: 'camera',
      component: Camera,
    },
  ],
});
