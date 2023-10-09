import { createRouter, createWebHistory } from 'vue-router';
import useUserStore from "@/stores/user";
// Dynamic Route Imports
const HomeView = () => import("@/views/HomeView.vue");
const AboutView = () => import("@/views/AboutView.vue");
const ManageView = () => import("@/views/ManageView.vue");
const SongView = () => import("@/views/SongView.vue");

const routes = [
  {
    name: 'home',
    path: '/', // example.com/
    component: HomeView,
  },
  {
    name: 'about',
    path: '/about', // example.com/about
    component: AboutView,
  },
  {
    name: 'manage',
    // alias: '/manage', // same as next object but without redirect
    path: '/manage-music',
    component: ManageView,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard');
      next();
    },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }, // better for search engines
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongView,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  // console.log(to.meta);

  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  const store = useUserStore();

  if (store.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }

});

export default router;
