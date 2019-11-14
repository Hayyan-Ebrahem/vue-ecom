import Vue from "vue";
import Router from "vue-router";
import Login from "./components/auth/Login";
// import Register from "./auth/Register";
import Profile from "./components/auth/Profile";

import store from "./store/store";
Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [

    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        guest: true
      }
    },

    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        secure: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.secure)) {
    // if no token
    if (!store.state.loggedIn) {
      //console.log("no token");
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!store.state.loggedIn) {
      next();
    } else {
      //console.log("no token");
      next({
        path: "/profile"
      });
    }
  } else {
    next();
  }
});

export default router;
