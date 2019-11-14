import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

Vue.use(Vuex);
import axios from "axios";

export default new Vuex.Store({
  state: {
    loggedIn: false,
    user: null,
    token: null
  },
  plugins: [new VuexPersistence().plugin],
  mutations: {
    SET_user(state, payload) {
      state.user = payload;
    },
    SET_token(state, payload) {
      state.token = payload;
    },
    SET_loggedIn(state, payload) {
      state.loggedIn = payload;
    }
  },
  actions: {
    performLoginAction({ commit }, payload) {

      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/v1/login", {
            email: payload.email,
            password: payload.password,
            // form_params : {
              // grant_type : 'client_credentials',
              // client_id :9,
              // client_secret :'24cQ6pQpIs4X5QQAr6HopnQDeQyZw1mikaRm9jcc',
              // 'scope' :'your-scope',
      // }
          } )
          .then(res => {
                        // eslint-disable-next-line no-console
                        console.log(res);
            commit("SET_token", res.data.access_token);

            commit("SET_loggedIn", true);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    performRegisterAction({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/auth/register", {
            name: payload.name,
            email: payload.email,
            password: payload.password
          })
          .then(res => {
            commit("SET_token", res.data.access_token);
            commit("SET_user", res.data.user);
            commit("SET_loggedIn", true);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    performLogoutAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        axios
          .post("http://localhost:8000/api/auth/logout", {
            token: state.access_token
          })

          .then(res => {
            commit("SET_token", null);

            commit("SET_loggedIn", false);
            commit("SET_user", null);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },

    updateUserProfileAction({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .patch("http://localhost:8000/api/auth/update", {
            name: payload.name,
            email: payload.email,
            token: state.token
          })
          .then(res => {
            commit("SET_user", res.data.user);

            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  getters: {
    get_loggedIn(state) {
      return state.loggedIn;
    },
    get_user(state) {
      return state.user;
    }
  }
});
