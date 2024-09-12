import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: { title: 'Home' },
  },
  {
    path: '/weather/:id/:city/:state?/:country?',
    name: 'city',
    component: () => import('@/pages/City.vue'),
    meta: { title: 'City' },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ? savedPosition : { top: 0, behavior: 'smooth' };
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Default title';
  next();
});

export default router;
