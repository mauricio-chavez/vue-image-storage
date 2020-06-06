import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import App from "./components/App";
import AuthHandler from "./components/AuthHandler";
import ImageList from "./components/ImageList";
import UploadForm from "./components/UploadForm";

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: ImageList },
    { path: "/upload", component: UploadForm, meta: { requiresAuth: true } },
    { path: "/oauth2/callback", component: AuthHandler }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
