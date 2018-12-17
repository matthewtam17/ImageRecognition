import Vue from 'vue';
import Vuex from 'vuex';
import { firebaseMutations } from 'vuexfire';

import auth from './auth';
import capture from './capture';
import quests from './quests';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: firebaseMutations,
  modules: {
    auth,
    capture,
    quests,
  },
});
