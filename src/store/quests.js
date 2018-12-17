import { firebaseAction } from 'vuexfire';
import db from '@/db';
import router from '@/router';

const state = {
  quests: [],
};

const actions = {
  init: firebaseAction(({ bindFirebaseRef }) => {
    bindFirebaseRef('quests', db.collection('quests'));
  }),
};

export default {
  namespaced: true,
  state,
  actions,
};
