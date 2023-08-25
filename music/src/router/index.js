import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "@/views/HomeView.vue"
import AboutView from "@/views/AboutView.vue"
import ManageView from "@/views/ManageView.vue"

const routes = [
  {
    path: "/", // example.com/
    component: HomeView,
  },
  {
    path: "/about", // example.com/about
    component: AboutView,
  },
  {
    path: "/manage",
    component: ManageView,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
