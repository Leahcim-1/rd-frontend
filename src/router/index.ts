import { createRouter, createWebHistory } from "vue-router";
import routes from "./router-config";

// Blog Detail is not a hidden route
// Trigger by click a blog
// Secretly push /blog/:id route
routes.push({
  path: "/blog/:id",
  component: () =>
    import(/* webpackChunkName: "/blog/:id" */ "../views/BlogDetail.vue"),
});

routes.push({
  path: "/postBlog",
  name: "PostBlog",
  component: () =>
    import(/* webpackChunkName: "about" */ "../views/CreateBlog.vue"),
});

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
