import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { AUTH_ROUTES } from './router/router-config'

// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

createApp(App).use(store).use(router).mount("#app");


router.beforeEach((to, from, next) => {
  const isLogin = store.state.isLogin
  if (!isLogin && AUTH_ROUTES.includes(to.path)) {
    next({ name: "Home"})
    
  }
  else next()
})
