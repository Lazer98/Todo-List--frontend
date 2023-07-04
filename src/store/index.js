

import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: null,
    loginToken: null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setLoginToken: (state, token) => {
      state.loginToken = token;
    },
  },
  actions: {
    updateLoginToken: ({ commit }, token) => {
      console.log("NEW TOKEN FOUND "+token);
      commit('setLoginToken', token);
    },
  },
  getters: {
    getLoginToken: state => state.loginToken,
  },
});

export default store;
