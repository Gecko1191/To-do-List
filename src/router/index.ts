import { createRouter, createWebHistory } from "vue-router";
import ToDosView from "../views/ToDosView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ToDos",
      component: () => import("../views/ToDosView.vue"),
    },
    {
      path: "/important",
      name: "important",
      component: () => import("../views/ToDosImportantView.vue"),
    },
    {
      path: "/archive",
      name: "archive",
      component: () => import("../views/ToDosArchiveView.vue"),
    },
  ],
});

export default router;
