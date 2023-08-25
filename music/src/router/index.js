import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageView from '@/views/ManageView.vue'

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
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }, // better for search engines
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
  console.log("Global Guard");

  next();
});

export default router;
