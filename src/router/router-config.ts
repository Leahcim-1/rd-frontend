import { RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const AUTH_ROUTES = [
  "/postBlog",
  "/admin",
]

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blog/:id",
    component: () =>
      import(/* webpackChunkName: "/blog/:id" */ "../views/BlogDetail.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/postBlog",
    name: "Post Blog",
    component: () =>
      import(/* webpackChunkName: "postBlog" */ "../views/CreateBlog.vue"),
  },
  {
    path: "/admin",
    name: "Manage Your Stuffs",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
  }
];

export default routes;

export {
  AUTH_ROUTES
}